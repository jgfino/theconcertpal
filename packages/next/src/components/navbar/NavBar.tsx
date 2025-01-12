import { DesktopTopBar } from "./DesktopNavBar";
import { MobileNavMenu } from "./MobileNavMenu";
import MobileNavWrapper from "./MobileNavWrapper";

export function NavBar() {
  return (
    <>
      <DesktopTopBar />
      <MobileNavWrapper>
        <MobileNavMenu />
      </MobileNavWrapper>
    </>
  );
}
