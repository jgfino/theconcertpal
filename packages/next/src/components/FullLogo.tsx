import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";

interface FullLogoProps {
  className?: string;
}

export function FullLogo({ className }: FullLogoProps) {
  return (
    <Link href="/">
      <span
        className={`text-2xl hidden lg:block lg:text-5xl font-black text-primary text-nowrap ${className || ""}`}
      >
        The ConcertPal
      </span>
      <Image
        width={36}
        height={36}
        src={logo}
        alt="The ConcertPal Logo"
        className={`lg:hidden font-black text-primary text-nowrap ${className || ""}`}
      />
    </Link>
  );
}
