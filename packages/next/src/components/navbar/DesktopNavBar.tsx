import { WidthContainer } from "../layouts/WidthContainer";
import { FullLogo } from "../FullLogo";
import { NavItem } from "./NavItem";

interface DesktopTopBarProps {
  className?: string;
}

export function DesktopTopBar({ className }: DesktopTopBarProps) {
  return (
    <div
      className={`hidden md:flex flex-row px-12 pt-12 justify-center items-center gap-12 ${className || ""}`}
    >
      <div className="flex flex-row w-full items-center justify-center gap-8">
        <NavItem text="My Shows" href="/my-shows" />
        <NavItem text="Journal" href="/journal" />
        <NavItem text="Explore" href="/explore" />
        <FullLogo />
        <NavItem text="Reviews & Photos" href="/live-reviews-photos" />
        <NavItem text="News" href="/music-news" />
        <NavItem text="About" href="/about" />
      </div>
    </div>
  );
}
