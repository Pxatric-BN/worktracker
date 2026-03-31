import { getCurrent } from "@/feature/auth/action";
import { CreateWorkspaceForm } from "@/feature/workspaces/components/createWorkspaceForm";

import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return (
    <div className="bg-neutral-500 p-4 h-full">
      <CreateWorkspaceForm />
    </div>
  );
}
