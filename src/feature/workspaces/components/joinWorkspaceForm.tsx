"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { useJoinWorkspace } from "../hooks/useJoinWorkspaces";
import { useInviteCode } from "../hooks/useInviteCode";
import { useWorkspaceId } from "../hooks/useWorkspaceId";
import { useRouter } from "next/navigation";

interface JoinWorkspaceFormProps {
  initialIValues: {
    name: string;
  };
}

export const JoinWorkspaceForm = ({
  initialIValues,
}: JoinWorkspaceFormProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const inviteCode = useInviteCode();
  const { mutate, isPending } = useJoinWorkspace();

  const onSubmit = () => {
    mutate(
      {
        param: {
          workspaceId,
        },
        json: {
          code: inviteCode,
        },
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaces/${data.$id}`);
        },
      },
    );
  };
  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">
          Join a workspace
          <CardDescription>
            You&apos;ve been invite to join{" "}
            <strong>{initialIValues.name}</strong> workspace
          </CardDescription>
        </CardTitle>
      </CardHeader>
      <div className="px-7">
        <Separator className="p-7" />
      </div>
      <CardContent className="flex flex-col gap-y-2 gap-x-2 lg:flex-row items-center justify-between">
        <Button
          variant="destructive"
          type="button"
          asChild
          className="w-full lg:w-fit"
          disabled={isPending}
        >
          <Link href="/">Cancel</Link>
        </Button>
        <Button
          className="w-full lg:w-fit"
          size="lg"
          type="button"
          onClick={onSubmit}
          disabled={isPending}
        >
          Join Workspace
        </Button>
      </CardContent>
    </Card>
  );
};
