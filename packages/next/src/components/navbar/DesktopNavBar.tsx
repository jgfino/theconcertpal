import { FullLogo } from "../FullLogo";
import { NavItem } from "./NavItem";
import { logout } from "@/app/(auth)/actions";

interface DesktopNavBarProps {
  className?: string;
}

export default async function DesktopNavBar({ className }: DesktopNavBarProps) {
  const logoutWithPath = logout.bind(null);

  return (
    <div
      className={`hidden md:flex flex-row justify-center items-center gap-12 ${className || ""}`}
    >
      <div className="flex flex-row w-full items-center justify-center gap-8 text-xl">
        <NavItem text="My Shows" href="/my-shows" />
        <NavItem text="Journal" href="/journal" />
        <NavItem text="Explore" href="/explore" />
        <FullLogo />
        <NavItem text="Reviews & Photos" href="/live-reviews-photos" />
        <NavItem text="News" href="/music-news" />
        <NavItem text="About" onClick={logoutWithPath} />
      </div>
    </div>
  );
}
