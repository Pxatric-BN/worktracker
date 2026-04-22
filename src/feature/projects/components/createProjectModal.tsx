"use client";

import { ResponsiveModal } from "@/components/layout/responsive-modal";
import { CreateProjectForm } from "./createProjectForm";
import { useCreateProjectsModal } from "../hook/useCreateProjectsModal";

export const CreateProjectModal = () => {
  const { isOpen, setIsOpen, close } = useCreateProjectsModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateProjectForm onCancel={close} />
    </ResponsiveModal>
  );
};
