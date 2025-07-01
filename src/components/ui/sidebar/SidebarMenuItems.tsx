import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  icon: JSX.Element;
  name: string;
  path: string;
}

export const SidebarMenuItems = ({ icon, name, path }: Props) => {
  const currentPath = usePathname();
  const currentSection = currentPath.split("/")[2];

  const isMatched =
    `/dashboard/${currentSection}` === path || currentSection === path;

  return (
    <Link
      href={path}
      className={`flex w-full justify-center md:justify-start items-center gap-3 py-2 px-4
            ${
              isMatched
                ? "border-[0.005px] border-[var(--secondary-light)] bg-transparent"
                : "hover:bg-[#64646418] duration-300"
            } 
              rounded-lg mb-3`}
      style={{
        boxShadow: isMatched ? "0 0px 30px 10px var(--hover-bg)" : "none",
      }}
    >
      <div className={`p-[2px] invert`} aria-label={name}>
        {icon}
      </div>
      <span
        className={`text-[var(--text-primary)] font-normal select-none whitespace-nowrap overflow-hidden text-ellipsis hidden md:block`}
      >
        {name}
      </span>
    </Link>
  );
};
