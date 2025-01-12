"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { FullLogo } from "../FullLogo";

const Hamburger = dynamic(() => import("./Hamburger"), { ssr: false });

export interface HamburgerProps {
  className?: string;
  children: React.ReactNode;
}

export default function MobileNavWrapper({
  className,
  children,
}: HamburgerProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav className={`h-full w-full md:hidden ${className}`}>
      <div
        className={`h-full absolute left-0 right-0 duration-300 motion-reduce:duration-0 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        id="navbar-default"
      >
        {children}
      </div>
      <div className="absolute w-full p-4 flex flex-row justify-between items-center">
        <FullLogo />
        <Hamburger onClick={() => setOpen(!open)} />
      </div>
    </nav>
  );
}
