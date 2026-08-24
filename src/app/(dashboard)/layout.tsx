import { Navbar } from "@/components/layout/navbar-home";
import { Sidebar } from "@/components/layout/sidebar";
import { CreateProjectModal } from "@/feature/projects/components/createProjectModal";
import { CreateTaskModal } from "@/feature/tasks/components/createTaskModal";
import { EditTaskModal } from "@/feature/tasks/components/editTaskModal";
import { CreateWorkspaceModal } from "@/feature/workspaces/components/createWorkspaceModal";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-dvh bg-[#f0f4f7]">
      <CreateWorkspaceModal />
      <CreateProjectModal />
      <CreateTaskModal />
      <EditTaskModal />
      <div className="flex w-full min-h-dvh">
        <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
          <Sidebar />
        </div>
        <div className="lg:pl-[264px] w-full">
          <div className="mx-auto max-w-screen-2xl min-h-dvh">
            <Navbar />
            <main className="h-full py-8 px-6 flex flex-col">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
