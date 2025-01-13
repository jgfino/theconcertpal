import "../globals.css";
import { NavBar } from "@/components/navbar/NavBar";
import { Footer } from "@/components/navbar/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full w-screen">
      <header>
        <NavBar />
      </header>
      <div className="h-full">{children}</div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
