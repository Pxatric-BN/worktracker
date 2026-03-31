import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createWorkspacesSchema } from "../hooks/useworkspaceSchema";
import { sessionMiddleware } from "@/lib/session-midleware";
import {
  DATABASE_ID,
  IMAGES_BUCKET_ID,
  MEMBER_ID,
  WORKSPACE_ID,
} from "@/config";
import { ID, Query } from "node-appwrite";
import { MemberRole } from "@/feature/members/types";
import { genereteInviteCode } from "@/lib/utils";

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const user = c.get("user");
    const databases = c.get("databases");

    const members = await databases.listDocuments(DATABASE_ID, MEMBER_ID, [
      Query.equal("userId", user.$id),
    ]);
    if (members.total === 0) {
      return c.json({ data: { documents: [] }, total: 0 });
    }
    const workspaceIds = members.documents.map((member) => member.workspaceId);
    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACE_ID,
      [Query.orderDesc("$createdAt"), Query.contains("$id", workspaceIds)],
    );
    return c.json({ data: workspaces, total: workspaces.total });
  })
  .post(
    "/",
    zValidator("form", createWorkspacesSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      const storage = c.get("storage");
      const user = c.get("user");
      const { name, image } = c.req.valid("form");
      let imageFileId: string | undefined;
      if (image instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          image,
        );
        imageFileId = file.$id;
      }
      const workspaces = await databases.createDocument(
        DATABASE_ID,
        WORKSPACE_ID,
        ID.unique(),
        {
          name,
          userId: user.$id,
          imageUrl: imageFileId,
          inviteCode: genereteInviteCode(6),
        },
      );
      await databases.createDocument(DATABASE_ID, MEMBER_ID, ID.unique(), {
        userId: user.$id,
        workspaceId: workspaces.$id,
        role: MemberRole.ADMIN,
      });
      return c.json({ data: workspaces });
    },
  );

export default app;
