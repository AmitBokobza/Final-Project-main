import { FunctionComponent, useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../../services/userContext";

interface NavLinksProps {
  isSideBar?: boolean;
}

const NavLinks: FunctionComponent<NavLinksProps> = ({ isSideBar }) => {
  const { user } = useContext(userContext);
  if (user) {
    if (user.isAdmin) {
      return (
        <>
          <div
            className={`${
              isSideBar ? "flex flex-col" : "hidden lg:flex flex-row"
            } justify-center items-center`}
          >
            <Link
              className={`ml-5 ${
                isSideBar && "my-5 text-2xl"
              } p-1 rounded-full hover:bg-gray-200/30 transition-colors`}
              to="/about"
            >
              ABOUT
            </Link>
            <Link
              className={`ml-5 ${
                isSideBar && "my-5 text-2xl"
              } p-1 rounded-full hover:bg-gray-200/30 transition-colors`}
              to="/liked-recipes"
            >
              Liked Recipes
            </Link>
            <Link
              to="/my-recipes"
              className={`ml-5 ${
                isSideBar && "my-5 text-2xl"
              } p-1 rounded-full hover:bg-gray-200/30 transition-colors`}
            >
              My Recipes
            </Link>
            <Link
              className={`ml-5 ${
                isSideBar && "my-5 text-2xl"
              } p-1 rounded-full hover:bg-gray-200/30 transition-colors`}
              to="/admin"
            >
              SANDBOX
            </Link>
          </div>
        </>
      );
    }
  }

  if (!user) {
    return (
      <>
        <div
          className={`${
            isSideBar ? "flex flex-col" : "hidden lg:flex flex-row"
          } justify-center items-center`}
        >
          <Link
            className={`ml-5 ${
              isSideBar && "my-5 text-2xl"
            } p-1 rounded-full hover:bg-gray-200/30 transition-colors`}
            to="/about"
          >
            ABOUT
          </Link>
        </div>
      </>
    );
  }

  if (!user.isCook) {
    return (
      <>
        <div
          className={`${
            isSideBar ? "flex flex-col" : "hidden lg:flex flex-row"
          } justify-center items-center`}
        >
          <Link
            className={`ml-5 ${
              isSideBar && "my-5 text-2xl"
            } p-1 rounded-full hover:bg-gray-200/30 transition-colors`}
            to="/about"
          >
            ABOUT
          </Link>
          <Link
            className={`ml-5 ${
              isSideBar && "my-5 text-2xl"
            } p-1 rounded-full hover:bg-gray-200/30 transition-colors`}
            to="/liked-recipes"
          >
            LIKED RECIPES
          </Link>
        </div>
      </>
    );
  }

  if (user.isCook) {
    return (
      <>
        <div
          className={`${
            isSideBar ? "flex flex-col" : "hidden lg:flex flex-row"
          } justify-center items-center`}
        >
          <Link
            className={`ml-5 ${
              isSideBar && "my-5 text-2xl"
            } p-1 rounded-full hover:bg-gray-200/30 transition-colors`}
            to="/about"
          >
            ABOUT
          </Link>
          <Link
            className={`ml-5 ${
              isSideBar && "my-5 text-2xl"
            } p-1 rounded-full hover:bg-gray-200/30 transition-colors`}
            to="/liked-recipes"
          >
            LIKED RECIPES
          </Link>
          <Link
            to="/my-recipes"
            className={`ml-5 ${
              isSideBar && "my-5 text-2xl"
            } p-1 rounded-full hover:bg-gray-200/30 transition-colors`}
          >
            MY RECIPES
          </Link>
        </div>
      </>
    );
  }
};

export default NavLinks;
