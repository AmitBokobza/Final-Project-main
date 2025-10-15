import { FunctionComponent, useContext } from "react";
import { ThemeContext } from "../../Provider/ThemeProvider";
import { Link } from "react-router-dom";

interface NoAccessProps {
    
}
 
const NoAccess: FunctionComponent<NoAccessProps> = () => {
    const {theme} = useContext(ThemeContext);
    return ( 
        <>
        <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
      <div 
        className={`
          text-center 
          p-8 
          rounded-lg 
          ${theme === "dark" ? "bg-gray-800" : "bg-white"} 
          shadow-lg 
          relative 
          max-w-md 
          w-full
        `}
      >
        <div
          className="absolute top-0 left-0 w-full h-1 gradient-background"
        />
        <svg
          className={`
            w-16 
            h-16 
            ${theme === "dark" ? "text-gray-500" : "text-gray-400"} 
            mx-auto 
            mb-4
          `}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          ></path>
        </svg>
        <h3
          className={`
            text-2xl 
            font-semibold 
            ${theme === "dark" ? "text-gray-300" : "text-gray-700"}
          `}
        >
          Page Restricted!
        </h3>
        <p
          className={`
            ${theme === "dark" ? "text-gray-400" : "text-gray-500"} 
            mt-2
            mb-6
          `}
        >
          You do not have access to this page!
        </p>
        <Link 
          to={"/"}
          className={`
            inline-flex 
            items-center 
            px-6 
            py-2 
            rounded-lg 
            transition-all 
            duration-300 
            ${theme === 'dark' 
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
          `}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" 
              clipRule="evenodd" 
            />
          </svg>
          Return Home
        </Link>
      </div>
    </div>
        </>
     );
}
 
export default NoAccess;