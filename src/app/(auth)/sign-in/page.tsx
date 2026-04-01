import { getCurrent } from "@/feature/auth/queries";
import { SignInCard } from "@/feature/auth/component/sign-in-card";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const user = await getCurrent();

  if (user) redirect("/");

  return <SignInCard />;
};

export default SignInPage;
