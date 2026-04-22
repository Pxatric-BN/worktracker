import { getCurrent } from "@/feature/auth/queries";
import { EditProjectForm } from "@/feature/projects/components/editProjectForm";
import { getProject } from "@/feature/projects/quries";
import { redirect } from "next/navigation";

interface ProjectIdSettingPageProps {
  params: {
    projectId: string;
  };
}
const ProjectIdSettingPage = async ({ params }: ProjectIdSettingPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const initialValues = await getProject({
    projectId: params.projectId,
  });

  return (
    <div className="w-full lg:max-w-xl">
      <EditProjectForm initialValues={initialValues} />
    </div>
  );
};
export default ProjectIdSettingPage;
