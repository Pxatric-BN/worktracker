import { Query, type Databases } from "node-appwrite";
import { DATABASE_ID, MEMBER_ID } from "@/config";

interface GetMemberProps {
  databases: Databases;
  userId: string;
  workspaceId: string;
}

export const getMember = async ({
  databases,
  userId,
  workspaceId,
}: GetMemberProps) => {
  const members = await databases.listDocuments(DATABASE_ID, MEMBER_ID, [
    Query.equal("userId", userId),
    Query.equal("workspaceId", workspaceId),
  ]);
  if (members.total === 0) {
    return null;
  }
  return members.documents[0];
};
