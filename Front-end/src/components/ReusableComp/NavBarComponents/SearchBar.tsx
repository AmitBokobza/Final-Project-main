import { FunctionComponent, useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { searchContext } from "../../../App";

interface SearchBarProps {
  isSideBar?: boolean;
}

const SearchBar: FunctionComponent<SearchBarProps> = ({ isSideBar }) => {
  const { setSearch } = useContext(searchContext);
  return (
    <>
      <div
        className={`${
          isSideBar ? "flex w-full px-4 my-4" : "hidden md:flex"
        } items-center`}
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-white/80 backdrop-blur-sm text-black py-2 pl-3 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors">
            <CiSearch className="text-xl" />
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
