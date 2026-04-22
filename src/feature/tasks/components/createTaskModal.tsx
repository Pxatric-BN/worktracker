"use client";

import { ResponsiveModal } from "@/components/layout/responsive-modal";
import { useCreateTaskModal } from "../hooks/useCreateTaskModal";
import { CreateTaskFormWrapper } from "./createTaskFormWrapper";

export const CreateTaskModal = () => {
  const { isOpen, setIsOpen, close } = useCreateTaskModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateTaskFormWrapper onCancel={close} />
    </ResponsiveModal>
  );
};
