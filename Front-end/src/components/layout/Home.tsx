import { FunctionComponent, useContext } from "react";
import Cards from "../Recipes";
import { userContext } from "../../services/userContext";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Provider/ThemeProvider";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const { user } = useContext(userContext);
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div
        className={`px-5 py-12 md:py-16 ${
          theme === "light"
            ? "bg-gradient-to-br from-orange-50 to-amber-50"
            : "bg-gradient-to-br from-stone-900 to-neutral-900"
        }`}
      >
        <div className="container mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-10 space-y-4">
              <div className="inline-block px-4 py-2 rounded-full mb-4">
                <span
                  className={`text-sm font-medium ${
                    theme === "light" ? "text-orange-700" : "text-orange-400"
                  }`}
                >
                  Discover Delicious Recipes
                </span>
              </div>
  
              <h1
                className={`text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 ${
                  theme === "light" ? "text-slate-900" : "text-amber-50"
                }`}
              >
                Recipe Showcase
              </h1>
  
              <p
                className={`text-xl md:text-2xl max-w-3xl mx-auto ${
                  theme === "light" ? "text-slate-600" : "text-stone-300"
                }`}
              >
                Explore a curated collection of mouthwatering recipes from talented cooks.
              </p>
            </div>
  
            {(user?.isCook || user?.isAdmin) && (
              <div className="mt-8">
                <Link
                  to="/create-recipe"
                  className={`
                inline-flex items-center gap-3 
                px-7 py-3.5 
                rounded-xl 
                text-white 
                transform transition-all duration-300 
                hover:-translate-y-1 
                ${
                  theme === "light"
                    ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-xl hover:shadow-2xl shadow-orange-500/50 hover:shadow-red-500/50"
                    : "bg-gradient-to-r from-orange-600 to-red-700 hover:from-orange-700 hover:to-red-800 shadow-xl hover:shadow-2xl shadow-orange-600/30 hover:shadow-red-700/30"
                }
                focus:outline-none focus:ring-4 
                font-semibold 
                text-base 
                transition-all 
                group
              `}
                >
                  Create New Recipe
                </Link>
              </div>
            )}
          </div>
  
          <div className="w-full mt-12 md:mt-16">
            <Cards />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
