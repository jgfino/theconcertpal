import DesktopNavBar from "./DesktopNavBar";
import MobileNavMenu from "./MobileNavMenu";

export function NavBar() {
  return (
    <nav>
      <DesktopNavBar />
      <MobileNavMenu />
    </nav>
  );
}
