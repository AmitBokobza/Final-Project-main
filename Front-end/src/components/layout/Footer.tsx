import { FunctionComponent, useContext } from "react";
import { ThemeContext } from "../Provider/ThemeProvider";
import NavLinks from "../ReusableComp/NavBarComponents/NavLinks";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div
        className={`flex justify-between items-end h-[80px] bg-${theme} navbar border-t-2`}
      >
        <div>Amit Bokobza - 2025</div>
        <div>
          <NavLinks />
        </div>
        <div>All rights reserved</div>
      </div>
    </>
  );
};

export default Footer;
