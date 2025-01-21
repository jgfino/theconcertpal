import { FullLogo } from "@/components/FullLogo";
import { Footer } from "@/components/navbar/Footer";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-full w-full p-8 gap-8">
      <header>
        <FullLogo />
      </header>
      <div className="flex flex-1">{children}</div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
