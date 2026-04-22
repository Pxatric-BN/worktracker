import { Hono } from "hono";
import { handle } from "hono/vercel";
import auth from "@/feature/auth/server/route";
import workspaces from "@/feature/workspaces/server/route";
import members from "@/feature/members/server/route";
import projects from "@/feature/projects/server/route";
import tasks from "@/feature/tasks/server/route";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/auth", auth)
  .route("/workspaces", workspaces)
  .route("/members", members)
  .route("/projects", projects)
  .route("/tasks", tasks);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
