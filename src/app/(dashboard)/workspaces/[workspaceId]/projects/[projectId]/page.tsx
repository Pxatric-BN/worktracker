import { redirect } from "next/navigation";
import { getCurrent } from "@/feature/auth/queries";
import { getProject } from "@/feature/projects/quries";
import { ProjectAvatar } from "@/feature/projects/components/projectAvatar";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import { TaskViewSwitcher } from "@/feature/tasks/components/taskViewSwitcher";

interface ProjectIdPageProps {
  params: {
    projectId: string;
  };
}

const ProjectIdPage = async ({ params }: ProjectIdPageProps) => {
  const user = await getCurrent();
  if (!user) {
    redirect("/sign-in");
  }

  const initialValues = await getProject({
    projectId: params.projectId,
  });

  if (!initialValues) {
    throw new Error("Project not found");
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex item-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            name={initialValues?.name}
            image={initialValues?.imageUrl}
            className="size-8"
          />
          <p className="text-lg font-semibold">{initialValues.name}</p>
        </div>
        <div>
          <Button
            size="sm"
            asChild
            className="bg-white text-black hover:bg-gray-100 border border-gray-200 shadow-sm"
          >
            <Link
              href={`/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}/settings`}
            >
              <PencilIcon className="size-4 mr-2" />
              Edit Project
            </Link>
          </Button>
        </div>
      </div>
      <TaskViewSwitcher />
    </div>
  );
};

export default ProjectIdPage;
