import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["join"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[":workspaceId"]["join"]["$post"]
>;

export const useJoinWorkspace = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.workspaces[":workspaceId"]["join"][
        "$post"
      ]({
        param,
        json,
      });

      if (!response.ok) {
        throw new Error("Failed to Join workspace ");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Successfully joined workspace");
      queryClient.invalidateQueries({ queryKey: ["workspaces", data.$id] });
    },
    onError: () => {
      toast.error("Failed to join workspace");
    },
  });

  return mutation;
};
