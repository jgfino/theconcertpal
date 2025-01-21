import "../globals.css";
import { NavBar } from "@/components/navbar/NavBar";
import { Footer } from "@/components/navbar/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-full w-full p-8 md:pt-16 gap-8">
      <header>
        <NavBar />
      </header>
      <div className="flex flex-1">{children}</div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
