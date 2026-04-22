import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useGetMembers } from "@/feature/members/hook/useGetMember";
import { ListCheckIcon, UserIcon } from "lucide-react";
import { TaskStatus } from "../type";
import { useWorkspaceId } from "@/feature/workspaces/hooks/useWorkspaceId";
import { useTaskFilters } from "../hooks/useTaskFilter";
import { DatePicker } from "@/components/ui/date-picker";

export const DataFilters = () => {
  const workspaceId = useWorkspaceId();

  const { data: members, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId,
  });

  const isLoading = isLoadingMembers;

  const memberOptions = members?.documents.map((member) => ({
    value: member.$id,
    label: member.name,
  }));

  const [{ status, assigneeId, dueDate }, setFilters] = useTaskFilters();

  const onStatusChange = (value: string) => {
    if (value === "all") {
      setFilters({ status: null });
    } else {
      setFilters({ status: value as TaskStatus });
    }
  };

  const onAssigneeChange = (value: string) => {
    setFilters({ assigneeId: value === "all" ? null : value });
  };

  if (isLoading) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <Select defaultValue={status ?? undefined} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center pr-2">
            <ListCheckIcon className="size-4 mr-2" />
            <SelectValue placeholder="All status" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">ALL Status</SelectItem>
          <Separator />
          <SelectItem value={TaskStatus.BACKLOG}>Backlog</SelectItem>
          <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
          <SelectItem value={TaskStatus.IN_PROGRESS}>In Progress</SelectItem>
          <SelectItem value={TaskStatus.IN_REVIEW}>In Review</SelectItem>
          <SelectItem value={TaskStatus.TODO}>Todo</SelectItem>
        </SelectContent>
      </Select>

      <Select
        defaultValue={assigneeId ?? undefined}
        onValueChange={onAssigneeChange}
      >
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center pr-2">
            <UserIcon className="size-4 mr-2" />
            <SelectValue placeholder="All assignees" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">ALL Assignees</SelectItem>
          <Separator />
          {memberOptions?.map((member) => (
            <SelectItem key={member.value} value={member.value}>
              {member.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DatePicker
        placeholder="Due Date"
        className="h-8 w-full lg:w-auto"
        value={dueDate ? new Date(dueDate) : undefined}
        onChange={(date) => {
          setFilters({
            dueDate: date ? date.toISOString() : null,
          });
        }}
      />
    </div>
  );
};
