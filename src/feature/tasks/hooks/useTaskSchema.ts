import z from "zod";
import { TaskStatus } from "../type";

const taskStatusValues = Object.values(TaskStatus) as [string, ...string[]];

export const createTaskSchema = z.object({
  name: z.string().min(1, "Required"),
  status: z.enum(taskStatusValues).default(TaskStatus.TODO),
  workspaceId: z.string().trim().min(1, "Required"),
  projectId: z.string().trim().min(1, "Required"),
  dueDate: z.coerce.date(),
  assigneeId: z.string().trim().min(1, "Required"),
  description: z.string().optional(),
});
