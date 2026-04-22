"use client";

import { useGetProjects } from "@/feature/projects/hook/useGetProjects";
import { useWorkspaceId } from "@/feature/workspaces/hooks/useWorkspaceId";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { RiAddCircleFill } from "react-icons/ri";
import { useCreateProjectsModal } from "@/feature/projects/hook/useCreateProjectsModal";
import { cn } from "@/lib/utils";
import { ProjectAvatar } from "@/feature/projects/components/projectAvatar";

export const Projects = () => {
  const workspaceId = useWorkspaceId();
  const { open } = useCreateProjectsModal();
  const pathname = usePathname();
  const { data } = useGetProjects({
    workspaceId,
  });
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Projects</p>
        <RiAddCircleFill
          onClick={open}
          className="size-5 text-teal-700 cursor-pointer hover:opacity-75 transition"
        />
      </div>
      {data?.documents.map((project) => {
        const href = `/workspaces/${workspaceId}/projects/${project.$id}`;
        const isActive = pathname === href;

        return (
          <Link href={href} key={project.$id}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md hover:oparcity-75 transition cursor-pointer text-neutral-500",
                isActive && "bg-white shadow-md hover:opacity-100 text-primary",
              )}
            >
              <ProjectAvatar name={project.name} image={project.imageUrl} />
              <span className="truncate">{project.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
