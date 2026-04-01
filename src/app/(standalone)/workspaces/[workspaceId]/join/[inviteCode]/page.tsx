import { getCurrent } from "@/feature/auth/action";
import { JoinWorkspaceForm } from "@/feature/workspaces/components/joinWorkspaceForm";
import { getWorkspaceInfo } from "@/feature/workspaces/queries";
import { redirect } from "next/navigation";

interface WorkspaceIdJoinPageProps {
  params: {
    workspaceId: string;
  };
}
const WorkspaceIdJoinPage = async ({ params }: WorkspaceIdJoinPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const initialIValues = await getWorkspaceInfo({
    workspaceId: params.workspaceId,
  });

  if (!initialIValues) redirect("/");

  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceForm initialIValues={initialIValues} />
    </div>
  );
};

export default WorkspaceIdJoinPage;
