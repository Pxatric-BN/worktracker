"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from "lucide-react";
import { useCreateTaskModal } from "../hooks/useCreateTaskModal";

export const TaskViewSwitcher = () => {
  const { open } = useCreateTaskModal();

  return (
    <Tabs className="flex-1 w-full bg-white border border-gray-200 rounded-lg shadow-sm">
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
        Data Filter
        <Separator className="my-4" />
        <>
          <TabsContent value="table" className="mt-0">
            Data table
          </TabsContent>
          <TabsContent value="kanban" className="mt-0">
            Data kanban
          </TabsContent>
          <TabsContent value="calendar" className="mt-0">
            Data calendar
          </TabsContent>
        </>
      </div>
    </Tabs>
  );
};
