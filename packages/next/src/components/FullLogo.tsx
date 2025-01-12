import Image from "next/image";
import logo from "../../public/logo.png";

interface FullLogoProps {
  className?: string;
}

export function FullLogo({ className }: FullLogoProps) {
  return (
    <>
      <h1
        className={`text-2xl md:hidden lg:block lg:text-4xl font-black text-primary text-nowrap ${className}`}
      >
        The ConcertPal
      </h1>
      <Image
        width={48}
        height={48}
        src={logo}
        alt="The ConcertPal Logo"
        className={`hidden md:text-5xl md:block lg:hidden font-black text-primary text-nowrap ${className}`}
      />
    </>
  );
}
