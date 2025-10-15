import { FunctionComponent, useContext, useState } from "react";
import NavLinks from "../ReusableComp/NavBarComponents/NavLinks";
import { MdDarkMode } from "react-icons/md";
import { ThemeContext } from "../Provider/ThemeProvider";
import NavUser from "../ReusableComp/NavBarComponents/NavUser";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiSun } from "react-icons/ci";
import SideBar from "../SideBar";
import SearchBar from "../ReusableComp/NavBarComponents/SearchBar";

interface NavBarProps {}

const NavBar: FunctionComponent<NavBarProps> = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`sticky top-0 z-50 bg-${theme} navbar shadow-sm`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-[80px]">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <h1 className="logo font-extrabold text-xl md:text-2xl">
                AmitRecipes
              </h1>
            </Link>

            <div className="hidden xl:ml-8 xl:flex">
              <NavLinks />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <SearchBar />

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200/30 transition-colors"
              aria-label={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
            >
              {theme === "light" ? (
                <MdDarkMode className="text-xl" />
              ) : (
                <CiSun className="text-xl" />
              )}
            </button>

            <button
              onClick={handleOpen}
              className="p-2 rounded-full xl:hidden hover:bg-gray-200/30 transition-colors"
              aria-label="Open mobile menu"
            >
              <GiHamburgerMenu className="text-xl" />
            </button>

            <div className="hidden xl:flex items-center ml-2">
              <NavUser />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <SideBar isOpen={isOpen} handleOpen={handleOpen} />
    </nav>
  );
};

export default NavBar;
