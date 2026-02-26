import Image from "next/image"
import Link from "next/link"
import { Separator } from "../ui/separator"
import { Navigation } from "../ui/navigation"

export const Sidebar = () => {
    return (
        <aside className="h-screen bg-white p-4 w-full shadow-[2px_0_12px_rgba(0,0,0,0.12)]">
            <Link href="/" className="flex items-center gap-2">
                 <Image src="/logo.svg" alt="logo" width={52} height={56} />
                    <span className="text-neutral-700 font-extrabold">
                          WORK TRACKER
                    </span>
            </Link>
            <Separator className="my-4" />
            <Navigation />
        </aside>
    )
}