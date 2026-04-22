import { DATABASE_ID, IMAGES_BUCKET_ID, PROJECT_ID } from "@/config";
import { sessionMiddleware } from "@/lib/session-midleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { z } from "zod";
import { getMember } from "@/feature/members/utils";
import {
  createProjectsSchema,
  updateProjectsSchema,
} from "../hook/useProjectsSchema";
import { Project } from "../types";

const app = new Hono()
  .get(
    "/",
    sessionMiddleware,
    zValidator("query", z.object({ workspaceId: z.string() })),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");

      const { workspaceId } = c.req.valid("query");

      if (!workspaceId) {
        return c.json({ error: "workspaceId is required" }, 400);
      }

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const projects = await databases.listDocuments(DATABASE_ID, PROJECT_ID, [
        Query.equal("workspaceId", workspaceId),
        Query.orderDesc("$createdAt"),
      ]);

      return c.json({ data: projects });
    },
  )
  .post(
    "/",
    sessionMiddleware,
    zValidator("form", createProjectsSchema),
    async (c) => {
      const databases = c.get("databases");
      const storage = c.get("storage");
      const user = c.get("user");
      const { name, image, workspaceId } = c.req.valid("form");

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      let imageFileId: string | undefined;
      if (image instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          image,
        );
        imageFileId = file.$id;
      }
      const project = await databases.createDocument(
        DATABASE_ID,
        PROJECT_ID,
        ID.unique(),
        {
          name,
          imageUrl: imageFileId,
          workspaceId,
        },
      );

      return c.json({ data: project });
    },
  )
  .patch(
    "/:projectId",
    sessionMiddleware,
    zValidator("form", updateProjectsSchema),
    async (c) => {
      const databases = c.get("databases");
      const storage = c.get("storage");
      const user = c.get("user");

      const { projectId } = c.req.param();
      const { name, image } = c.req.valid("form");

      const existingProject = await databases.getDocument<Project>(
        DATABASE_ID,
        PROJECT_ID,
        projectId,
      );

      const member = await getMember({
        databases,
        userId: user.$id,
        workspaceId: existingProject.workspaceId,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      let imageFileId: string | undefined;
      if (image instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          image,
        );
        imageFileId = file.$id;
      }
      const project = await databases.updateDocument(
        DATABASE_ID,
        PROJECT_ID,
        projectId,
        {
          name,
          imageUrl: imageFileId,
        },
      );
      return c.json({ data: project });
    },
  )
  .delete("/:projectId", sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");

    const { projectId } = c.req.param();

    const existingProject = await databases.getDocument<Project>(
      DATABASE_ID,
      PROJECT_ID,
      projectId,
    );

    const member = await getMember({
      databases,
      userId: user.$id,
      workspaceId: existingProject.workspaceId,
    });
    if (!member) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    //TODO: delete members, projects, task

    await databases.deleteDocument(DATABASE_ID, PROJECT_ID, projectId);

    return c.json({ data: { $id: existingProject.$id } });
  });
export default app;
