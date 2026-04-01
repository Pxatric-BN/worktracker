import { createAdminClient } from "@/lib/appwrite";
import { sessionMiddleware } from "@/lib/session-midleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { getMember } from "../utils";
import { DATABASE_ID, MEMBER_ID } from "@/config";
import { Query } from "node-appwrite";
import { MemberRole } from "../types";

const app = new Hono()
  .get(
    "/",
    sessionMiddleware,
    zValidator(
      "query",
      z.object({
        workspaceId: z.string(),
      }),
    ),
    async (c) => {
      const { users } = await createAdminClient();
      const databases = c.get("databases");
      const user = c.get("user");
      const { workspaceId } = c.req.valid("query");

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json(
          {
            error: "You are not a member of this workspace",
          },
          401,
        );
      }
      const members = await databases.listDocuments(DATABASE_ID, MEMBER_ID, [
        Query.equal("workspaceId", workspaceId),
      ]);

      const populatedMembers = await Promise.all(
        members.documents.map(async (member) => {
          const user = await users.get(member.userId);
          return {
            ...member,
            name: user.name,
            email: user.email,
          };
        }),
      );
      return c.json({
        data: {
          ...members,
          documents: populatedMembers,
        },
      });
    },
  )
  .delete("/:memberId", sessionMiddleware, async (c) => {
    const { memberId } = c.req.param();
    const databases = c.get("databases");
    const user = c.get("user");

    const memberToDelete = await databases.getDocument(
      DATABASE_ID,
      MEMBER_ID,
      memberId,
    );

    const allMembersInWorkspace = await databases.listDocuments(
      DATABASE_ID,
      MEMBER_ID,
      [Query.equal("workspaceId", memberToDelete.workspaceId)],
    );

    const member = await getMember({
      databases,
      workspaceId: memberToDelete.workspaceId,
      userId: user.$id,
    });

    if (!member) {
      return c.json(
        {
          error: "You are not a member of this workspace",
        },
        401,
      );
    }
    if (member.$id !== memberToDelete.$id && member.role !== MemberRole.ADMIN) {
      return c.json(
        {
          error: "You are not authorized to delete this member",
        },
        401,
      );
    }

    if (allMembersInWorkspace.total === 1) {
      return c.json(
        {
          error: "You cannot delete the only member in the workspace",
        },
        400,
      );
    }

    await databases.deleteDocument(DATABASE_ID, MEMBER_ID, memberId);

    return c.json({ data: { $id: memberToDelete.$id } });
  })
  .patch(
    "/:memberId",
    sessionMiddleware,
    zValidator(
      "json",
      z.object({
        role: z.nativeEnum(MemberRole),
      }),
    ),
    async (c) => {
      const { memberId } = c.req.param();
      const { role } = c.req.valid("json");
      const databases = c.get("databases");
      const user = c.get("user");

      const memberToUpdate = await databases.getDocument(
        DATABASE_ID,
        MEMBER_ID,
        memberId,
      );

      const allMembersInWorkspace = await databases.listDocuments(
        DATABASE_ID,
        MEMBER_ID,
        [Query.equal("workspaceId", memberToUpdate.workspaceId)],
      );

      const member = await getMember({
        databases,
        workspaceId: memberToUpdate.workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json(
          {
            error: "You are not a member of this workspace",
          },
          401,
        );
      }
      if (
        member.$id !== memberToUpdate.$id &&
        member.role !== MemberRole.ADMIN
      ) {
        return c.json(
          {
            error: "You are not authorized to update this member",
          },
          401,
        );
      }

      if (allMembersInWorkspace.total === 1) {
        return c.json(
          {
            error: "You cannot downgrade the only member in the workspace",
          },
          400,
        );
      }

      await databases.updateDocument(DATABASE_ID, MEMBER_ID, memberId, {
        role,
      });

      return c.json({ data: { $id: memberToUpdate.$id } });
    },
  );

export default app;
