"use client";

import { ResponsiveModal } from "@/components/layout/responsive-modal";
import { useEditTaskModal } from "../hooks/useEditTaskModal";
import { EditTaskFormWrapper } from "./editTaskFormWrapper";

export const EditTaskModal = () => {
  const { taskId, close } = useEditTaskModal();

  return (
    <ResponsiveModal open={!!taskId} onOpenChange={close}>
      {taskId && <EditTaskFormWrapper id={taskId} onCancel={close} />}
    </ResponsiveModal>
  );
};
