import { getCurrent } from "@/feature/auth/action";
import { redirect } from "next/navigation";

const WorkspaceIdPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return (
    <div>
      <h1>Workspace ID Page</h1>
    </div>
  );
};

export default WorkspaceIdPage;
