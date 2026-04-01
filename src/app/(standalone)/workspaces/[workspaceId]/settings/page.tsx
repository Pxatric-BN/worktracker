import { getCurrent } from "@/feature/auth/queries";
import { getWorkspaceById } from "@/feature/workspaces/queries";
import { EditWorkspaceForm } from "@/feature/workspaces/components/editWorkspaceForm";
import { redirect } from "next/navigation";

interface WorkspaceSettingsPageProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceSettingsPage = async ({
  params,
}: WorkspaceSettingsPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const initialValues = await getWorkspaceById({
    workspaceId: params.workspaceId,
  });
  if (!initialValues) redirect(`/workspaces/${params.workspaceId}`);
  return (
    <div className="w-full lg:max-w-xl">
      <EditWorkspaceForm initialValues={initialValues} />
    </div>
  );
};

export default WorkspaceSettingsPage;
