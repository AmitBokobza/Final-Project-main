import { FunctionComponent, useContext } from "react";
import { ThemeContext } from "../../Provider/ThemeProvider";
import { Link } from "react-router-dom";

interface PageNotFoundProps {}

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div
        className={`flex items-center justify-center min-h-screen ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-50"
        } p-4`}
      >
        <div
          className={`
          text-center 
          ${theme === "dark" ? "bg-gray-800" : "bg-white"} 
          rounded-xl 
          shadow-lg 
          p-10 
          max-w-md 
          w-full 
          relative 
          overflow-hidden
        `}
        >
          <div className="absolute top-0 left-0 w-full h-1 gradient-background" />

          <div className="mb-6">
            <h1
              className={`
              text-6xl 
              font-bold 
              mb-4 
              ${theme === "dark" ? "text-gray-200" : "text-gray-800"}
            `}
            >
              404
            </h1>
            <h2
              className={`
              text-2xl 
              font-semibold 
              mb-4 
              ${theme === "dark" ? "text-gray-300" : "text-gray-700"}
            `}
            >
              Page Not Found
            </h2>
            <p
              className={`
              mb-6 
              ${theme === "dark" ? "text-gray-400" : "text-gray-600"}
            `}
            >
              The page you are looking for might have been removed or doesn't
              exist.
            </p>
          </div>

          <Link
            to="/"
            className={`
            inline-block 
            px-6 
            py-3 
            rounded-lg 
            transition-all 
            duration-300 
            ${
              theme === "dark"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }
          `}
          >
            Go to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
