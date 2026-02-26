import { Navbar } from "@/components/layout/navbar-home";
import { Sidebar } from "@/components/layout/sidebar";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-neutral-100">
        <div className="flex w-full h-full">
            <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
                <Sidebar />
            </div>
            <div className="lg:pl-[264px] w-full">
                <div className="mx-auto max-w-screen-2xl h-full">
                    <Navbar />
                    <main className="h-full py-8 px-6 flex flex-col">
                        {children}
                    </main>
                </div>
            </div>
        </div>   
    </div>
  )
}

export default DashboardLayout