import { routes } from "@/routes";
import { FullLogo } from "../FullLogo";
import { NavItem } from "./NavItem";
import { logout } from "@/app/(auth)/actions";

interface DesktopNavBarProps {
  className?: string;
}

export default async function DesktopNavBar({ className }: DesktopNavBarProps) {
  return (
    <div
      className={`hidden md:flex flex-row justify-center items-center gap-12 ${className || ""}`}
    >
      <div className="flex flex-row w-full items-center justify-center gap-8 text-xl">
        <NavItem text="My Shows" href={routes.myShows()} />
        <NavItem text="Journal" href={routes.journal()} />
        <NavItem text="Explore" href={routes.explore()} />
        <FullLogo />
        <NavItem text="Reviews & Photos" href={routes.reviewsPhotos()} />
        <NavItem text="News" href={routes.news()} />
        <NavItem text="About" onClick={logout} />
      </div>
    </div>
  );
}
