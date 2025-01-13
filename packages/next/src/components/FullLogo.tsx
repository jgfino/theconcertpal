import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";

interface FullLogoProps {
  className?: string;
}

export function FullLogo({ className }: FullLogoProps) {
  return (
    <Link href="/">
      <h1
        className={`text-2xl hidden lg:block lg:text-4xl font-black text-primary text-nowrap ${className || ""}`}
      >
        The Logo
      </h1>
      <Image
        width={48}
        height={48}
        src={logo}
        alt="The ConcertPal Logo"
        className={`lg:hidden font-black text-primary text-nowrap ${className || ""}`}
      />
    </Link>
  );
}
