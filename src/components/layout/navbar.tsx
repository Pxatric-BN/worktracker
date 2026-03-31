"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const isSignIn = pathname === "/sign-in";
  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Image src="/logo.svg" alt="logo" width={52} height={56} />
        <span className="text-neutral-700 font-extrabold">WORK TRACKER</span>
      </div>

      <Button asChild variant="outline">
        <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
          {isSignIn ? "Sign Up" : "Login"}
        </Link>
      </Button>
    </nav>
  );
};

export default Navbar;
