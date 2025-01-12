import Link from "next/link";
import { NavItem } from "./NavItem";
import { IoLogoInstagram, IoMdMail } from "react-icons/io";

export function MobileNavMenu() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <NavItem small text="My Shows" href="/my-shows" />
      <NavItem small text="Explore" href="/explore" />
      <NavItem
        className="mt-4"
        small
        text="Reviews & Photos"
        href="/live-reviews-photos"
      />
      <NavItem small text="News" href="/music-news" />
      <NavItem small text="About" href="/about" />
      <Link
        className="text-fg-alt mt-4"
        target="_blank"
        href="https://www.instagram.com/theconcertpal"
      >
        <IoLogoInstagram className="w-6 h-6" />
      </Link>
      <Link className="text-fg-alt" href="mailto:info@theconcertpal.com">
        <IoMdMail className="w-6 h-6" />
      </Link>
      <NavItem
        className="text-fg-alt text-sm"
        small
        text="Privacy Policy"
        href="/privacy-policy"
      />
    </div>
  );
}
