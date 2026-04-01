import { Loader } from "lucide-react";

const DashboardLoading = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <Loader className="animate-spin size-6 text-neutral-500" />
    </div>
  );
};

export default DashboardLoading;
