"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { FullLogo } from "../FullLogo";
import { NavItem } from "./NavItem";
import Link from "next/link";
import { IoLogoInstagram, IoMdMail } from "react-icons/io";
import { useRouter } from "next/navigation";

const Hamburger = dynamic(() => import("./Hamburger"), { ssr: false });

export interface HamburgerProps {
  className?: string;
}

export default function MobileNavMenu({ className }: HamburgerProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [newUrl, setNewUrl] = useState<string>();

  useEffect(() => {
    if (!open && newUrl) {
      setTimeout(() => {
        router.push(newUrl);
      }, 200);
    }
  }, [newUrl, open, router]);

  useEffect(() => {
    if (window.location.pathname === newUrl) {
      setNewUrl(undefined);
    }
  }, [newUrl]);

  const handleNavItemPressed = useCallback((href: string) => {
    if (window.location.pathname !== href) {
      setNewUrl(href);
    }
    setOpen(false);
  }, []);

  return (
    <div className={`md:hidden ${className || ""}`}>
      <div
        className={`absolute left-0 right-0 top-0 bottom-0 duration-300 motion-reduce:duration-0 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-bg h-full flex flex-col items-center justify-center gap-4">
          <NavItem
            text="My Shows"
            onClick={() => handleNavItemPressed("/my-shows")}
          />
          <NavItem
            text="Journal"
            onClick={() => handleNavItemPressed("/journal")}
          />
          <NavItem
            text="Explore"
            onClick={() => handleNavItemPressed("/explore")}
          />
          <NavItem
            className="mt-4"
            text="Reviews & Photos"
            onClick={() => handleNavItemPressed("/live-reviews-photos")}
          />
          <NavItem text="News" href="/music-news" />
          <NavItem text="About" href="/about" />
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
            text="Privacy Policy"
            href="/privacy-policy"
          />
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <FullLogo />
        <Hamburger open={open} onClick={() => setOpen(!open)} />
      </div>
    </div>
  );
}
