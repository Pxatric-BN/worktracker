import { getCurrent } from "@/feature/auth/action";
import { UserButton } from "@/feature/auth/component/user-button";
import { redirect } from "next/navigation";


export default async function Home() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");
  return (
    <div>
       <UserButton />
    </div>
  )
}