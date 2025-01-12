import Link from "next/link";
import { IoLogoInstagram, IoMdMail } from "react-icons/io";

export function Footer() {
  return (
    <div className="hidden md:flex flex-row items-center w-full justify-center gap-4 pb-12">
      <Link className="text-fg-alt" href="/privacy-policy">
        Privacy Policy
      </Link>
      <Link
        className="text-fg-alt"
        target="_blank"
        href="https://www.instagram.com/theconcertpal"
      >
        <IoLogoInstagram className="w-8 h-8" />
      </Link>
      <Link className="text-fg-alt" href="mailto:info@theconcertpal.com">
        <IoMdMail className="w-8 h-8" />
      </Link>
      <Link className="text-fg-alt" href="mailto:info@theconcertpal.com">
        info@theconcertpal.com
      </Link>
    </div>
  );
}
