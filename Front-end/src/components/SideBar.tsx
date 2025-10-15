import { FunctionComponent, useContext } from "react";
import NavLinks from "./ReusableComp/NavBarComponents/NavLinks";
import NavUser from "./ReusableComp/NavBarComponents/NavUser";
import { IoMdClose } from "react-icons/io";
import { ThemeContext } from "./Provider/ThemeProvider";
import SearchBar from "./ReusableComp/NavBarComponents/SearchBar";

interface SideBarProps {
  isOpen?: boolean;
  handleOpen: () => void;
}

const SideBar: FunctionComponent<SideBarProps> = ({ isOpen, handleOpen }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleOpen}
        aria-hidden="true"
      />

      <div
        className={`z-50 fixed top-0 bottom-0 right-0 w-[300px] sm:w-[350px] h-full shadow-xl navbar transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col bg-${theme} border-l border-gray-200 dark:border-gray-700`}
      >
        <div
          className={`flex justify-between items-center p-4 border-b ${
            theme === "light" ? "border-gray-200" : "border-gray-700"
          } `}
        >
          <h2 className="font-bold text-xl">Menu</h2>
          <button
            onClick={handleOpen}
            className="p-2 rounded-full hover:bg-gray-200/30 transition-colors"
            aria-label="Close sidebar"
          >
            <IoMdClose className="text-2xl" />
          </button>
        </div>

        <div>
          <SearchBar isSideBar={true} />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center py-8 overflow-y-auto">
          <NavLinks isSideBar={true} />
        </div>

        <div
          className={`p-4 border-t ${
            theme === "light" ? "border-gray-200" : "border-gray-700"
          } `}
        >
          <NavUser />
        </div>
      </div>
    </>
  );
};

export default SideBar;
