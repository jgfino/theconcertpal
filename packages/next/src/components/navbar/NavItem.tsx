import Link from "next/link";

interface DesktopNavItemProps {
  className?: string;
  text: string;
  href: string;
  small?: boolean;
}

export function NavItem({ className, text, href, small }: DesktopNavItemProps) {
  return (
    <div
      className={`font-medium ${small ? "" : "text-lg"} font-bold hover:text-primary text-nowrap ${className || ""}`}
    >
      <Link href={href}>{text}</Link>
    </div>
  );
}
