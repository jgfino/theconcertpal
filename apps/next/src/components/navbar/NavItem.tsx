import Link from "next/link";
import { HTMLAttributeAnchorTarget } from "react";

interface DesktopNavItemProps {
  className?: string;
  text: string;
  target?: HTMLAttributeAnchorTarget;
  href?: string;
  onClick?: () => void;
}

export function NavItem({
  className,
  text,
  target,
  href,
  onClick,
}: DesktopNavItemProps) {
  return (
    <div
      onClick={onClick}
      role="button"
      className={`font-semibold hover:text-primary text-nowrap ${className || ""}`}
    >
      {href ? (
        <Link href={href} target={target}>
          {text}
        </Link>
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
}
