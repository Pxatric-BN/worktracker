import { getCurrent } from "@/feature/auth/action";
import { SignUpCard } from "@/feature/auth/component/sign-up-card";
import { redirect } from "next/navigation";

const SignUpPage = async () => {
  const user = await getCurrent();

  if (user) redirect("/");
  return <SignUpCard />;
};

export default SignUpPage;
