import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@/feature/auth/component/user-button";

export const StandaloneNavbar = () => {
  return (
    <nav className="flex justify-between items-center h-[73px]">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.svg" alt="logo" width={52} height={52} />
        <span className="text-neutral-700 font-extrabold">WORK TRACKER</span>
      </Link>
      <UserButton />
    </nav>
  );
};
