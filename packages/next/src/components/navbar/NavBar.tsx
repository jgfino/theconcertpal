import { DesktopTopBar } from "./DesktopNavBar";
import { MobileNavMenu } from "./MobileNavMenu";
import MobileNavWrapper from "./MobileNavWrapper";

export function NavBar() {
  return (
    <nav>
      <DesktopTopBar />
      <MobileNavWrapper>
        <MobileNavMenu />
      </MobileNavWrapper>
    </nav>
  );
}
