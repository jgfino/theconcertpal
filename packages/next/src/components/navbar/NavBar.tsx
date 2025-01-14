import DesktopTopBar from "./DesktopNavBar";
import MobileNavMenu from "./MobileNavMenu";

export function NavBar() {
  return (
    <nav>
      <DesktopTopBar />
      <MobileNavMenu />
    </nav>
  );
}
