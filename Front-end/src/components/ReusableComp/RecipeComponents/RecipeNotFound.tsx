import { FunctionComponent } from "react";

interface RecipeNotFoundProps {
  theme: string;
}

const RecipeNotFound: FunctionComponent<RecipeNotFoundProps> = ({
  theme,
}) => {
  return (
    <>
      <div
        className={`text-center p-8 rounded-lg 
    ${theme === "dark" ? "bg-gray-800" : "bg-white"} 
    shadow-lg relative`}
      >
        <div
          className="absolute top-0 left-0 w-full h-1 gradient-background"
        />
        <svg
          className={`w-16 h-16 ${
            theme === "dark" ? "text-gray-500" : "text-gray-400"
          } mx-auto mb-4`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <h3
          className={`text-2xl font-semibold ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          No Recipes Found
        </h3>
        <p
          className={`${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          } mt-2`}
        >
          We couldn't find any recipes. Try adjusting your search or create a new recipe!
        </p>
      </div>
    </>
  );
};

export default RecipeNotFound;