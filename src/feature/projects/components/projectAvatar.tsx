import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProjectAvatarProps {
  name: string;
  image?: string;
  className?: string;
}

export const ProjectAvatar = ({
  name,
  image,
  className,
}: ProjectAvatarProps) => {
  return (
    <div
      className={cn(
        "size-8 relative rounded-lg overflow-hidden flex items-center justify-center",
        className,
      )}
    >
      {image ? (
        <Image src={image} alt={name} fill className="object-cover" />
      ) : (
        <span className="w-full h-full flex items-center justify-center text-white bg-teal-700 font-semibold text-sm uppercase">
          {name[0]}
        </span>
      )}
    </div>
  );
};
