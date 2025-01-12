"use client";

import lottie, { AnimationItem } from "lottie-web";
import * as hamburgerAnimation from "@/animations/hamburger.json";
import * as hamburgerDarkAnimation from "@/animations/hamburger-dark.json";
import { useEffect, useRef, useState } from "react";

interface HamburgerProps {
  onClick: () => void;
}

export default function Hamburger({ onClick }: HamburgerProps) {
  const [open, setOpen] = useState(false);

  const hamburger = useRef<HTMLDivElement>(null);
  const animation = useRef<AnimationItem>(null);

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setIsDark(prefersDark.matches);

    prefersDark.addEventListener("change", handler);
    handler();

    return () => prefersDark.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (hamburger.current) {
      const darkNow = window.matchMedia("(prefers-color-scheme: dark)").matches;
      animation.current = lottie.loadAnimation({
        container: hamburger.current,
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData:
          darkNow || isDark ? hamburgerDarkAnimation : hamburgerAnimation,
      });

      return () => animation.current?.destroy();
    }
  }, [isDark]);

  useEffect(() => {
    animation.current?.playSegments(open ? [0, 11] : [12, 22], true);
  }, [open]);

  return (
    <div
      role="button"
      onClick={() => {
        setOpen((prev) => !prev);
        onClick();
      }}
      className="hamburger w-8 h-8"
      ref={hamburger}
    />
  );
}
