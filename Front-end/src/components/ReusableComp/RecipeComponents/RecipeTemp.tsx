import { FunctionComponent, ReactNode, useContext } from "react";
import Recipe from "../../../interfaces/Recipe/Recipe";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../Provider/ThemeProvider";

interface RecipeCardProps {
  recipe: Recipe;
  children?: ReactNode;
}

const RecipeCard: FunctionComponent<RecipeCardProps> = ({ recipe, children }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div
        key={recipe._id}
        className={`
            rounded-xl 
            overflow-hidden 
            border 
            transition-all 
            duration-300 
            hover:-translate-y-2 
            ${
              theme === "light"
                ? "bg-white shadow-lg hover:shadow-xl border-gray-200"
                : "bg-slate-800 shadow-md hover:shadow-lg border-slate-700"
            }
          `}
      >
        <Link to={`../recipes/${recipe._id}`} className="block overflow-hidden">
          <div className="relative overflow-hidden">
            <img
              className="w-full h-48 object-cover transition-all duration-300 transform hover:scale-110"
              src={recipe.image.url}
              alt={recipe.image.alt}
              loading="lazy"
            />
          </div>
        </Link>

        <div className="p-5">
          <Link to={`../recipes/${recipe._id}`}>
            <h3
              className={`
                font-bold 
                text-xl 
                mb-3 
                transition-colors 
                duration-200 
                ${
                  theme === "light"
                    ? "text-slate-900 hover:text-orange-600"
                    : "text-white hover:text-orange-400"
                }
              `}
            >
              {recipe.title}
            </h3>
          </Link>

          <p
            className={`
              mb-4 
              text-sm 
              ${theme === "light" ? "text-gray-600" : "text-gray-300"}
            `}
          >
            {recipe.description}
          </p>
          {children}
        </div>
      </div>
    </>
  );
};

export default RecipeCard;