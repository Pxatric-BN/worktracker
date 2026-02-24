import Navbar from "@/components/layout/navbar";


interface AuthlayoutProps {
    children: React.ReactNode;
}


const Authlayout = ({ children}: AuthlayoutProps) => {

  return (
    <main className="bg-neutral-100 min-h-screen">
        <div className="mx-auto max-w-screen-2xl p-4">
            <Navbar />
            <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
                {children}
            </div>
        </div>  
    </main>
  )
}

export default Authlayout

