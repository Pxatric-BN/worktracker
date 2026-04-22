"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader, PlusIcon } from "lucide-react";
import { useCreateTaskModal } from "../hooks/useCreateTaskModal";
import { useGetTasks } from "../hooks/useGetTask";
import { useWorkspaceId } from "@/feature/workspaces/hooks/useWorkspaceId";
import { useQueryState } from "nuqs";
import { DataFilters } from "./dataFilter";
import { useTaskFilters } from "../hooks/useTaskFilter";
import { DataTable } from "./dataTable";
import { useParams } from "next/navigation";
import { columns } from "./columns";

export const TaskViewSwitcher = () => {
  const params = useParams();
  const currentProjectId = params.projectId as string;
  const [{ status, assigneeId, projectId, dueDate }] = useTaskFilters();
  const finalProjectId = projectId ?? currentProjectId;
  const [view, setView] = useQueryState("task-view", {
    defaultValue: "table",
  });
  const workspaceId = useWorkspaceId();
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
    projectId: finalProjectId,
    assigneeId,
    status,
    dueDate,
  });
  const { open } = useCreateTaskModal();

  return (
    <Tabs
      defaultValue={view}
      onValueChange={setView}
      className="flex-1 w-full bg-white border border-gray-200 rounded-lg shadow-sm"
    >
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className=" flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
              Table
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
              Kanban
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
              calendar
            </TabsTrigger>
          </TabsList>
          <Button
            onClick={open}
            size="sm"
            className="w-full lg:w-auto bg-teal-700 hover:bg-teal-900 text-white"
          >
            <PlusIcon className="size-4 " />
            New Task
          </Button>
        </div>
        <Separator className="my-4" />
        <DataFilters />
        <Separator className="my-4" />
        {isLoadingTasks ? (
          <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
            <Loader className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <DataTable columns={columns} data={tasks?.documents ?? []} />
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              {JSON.stringify(tasks)}
            </TabsContent>
            <TabsContent value="calendar" className="mt-0">
              {JSON.stringify(tasks)}
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
};
