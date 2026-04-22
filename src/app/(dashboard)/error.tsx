"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col gap-y-2 items-center justify-center">
      <AlertTriangle className="size-6 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">
        Something went wrong. Please try again later.
      </p>
      <Button variant="outline" size="sm">
        <Link href="/">Back to Homepage</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
