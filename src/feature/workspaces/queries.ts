"use server";

import { Query } from "node-appwrite";
import { DATABASE_ID, MEMBER_ID, WORKSPACE_ID } from "@/config";
import { Workspace } from "./types";
import { getMember } from "../members/utils";
import { createSessionClient } from "@/lib/appwrite";

export const getWorkspaces = async () => {
  const { databases, account } = await createSessionClient();
  const user = await account.get();

  const members = await databases.listDocuments(DATABASE_ID, MEMBER_ID, [
    Query.equal("userId", user.$id),
  ]);
  if (members.total === 0) {
    return { documents: [], total: 0 };
  }
  const workspaceIds = members.documents.map((member) => member.workspaceId);
  const workspaces = await databases.listDocuments(DATABASE_ID, WORKSPACE_ID, [
    Query.orderDesc("$createdAt"),
    Query.contains("$id", workspaceIds),
  ]);
  return workspaces;
};

interface GetWorkspaceProps {
  workspaceId: string;
}

export const getWorkspaceById = async ({
  workspaceId,
}: GetWorkspaceProps): Promise<Workspace | null> => {
  const { databases, account } = await createSessionClient();
  const user = await account.get();

  const member = await getMember({
    workspaceId,
    userId: user.$id,
    databases,
  });

  if (!member) {
    throw new Error("Unauthorized");
  }

  const workspace = await databases.getDocument<Workspace>(
    DATABASE_ID,
    WORKSPACE_ID,
    workspaceId,
  );

  return workspace;
};

interface getWorkspaceInfoProps {
  workspaceId: string;
}

export const getWorkspaceInfo = async ({
  workspaceId,
}: getWorkspaceInfoProps) => {
  const { databases } = await createSessionClient();

  const workspace = await databases.getDocument(
    DATABASE_ID,
    WORKSPACE_ID,
    workspaceId,
  );
  return { name: workspace.name };
};
