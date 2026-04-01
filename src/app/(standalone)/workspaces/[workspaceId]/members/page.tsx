import { getCurrent } from "@/feature/auth/queries";
import { MemberList } from "@/feature/workspaces/components/memberList";
import { redirect } from "next/navigation";
const WorkspaceIdMemberPage = async () => {
  const user = await getCurrent();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="w-full lg:max-w-xl">
      <MemberList />
    </div>
  );
};

export default WorkspaceIdMemberPage;
