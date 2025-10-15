import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Recipe from "../../../interfaces/Recipe/Recipe";
import { ThemeContext } from "../../Provider/ThemeProvider";
import Spinner from "../Misc/Spinner";
import RecipeNotFound from "./RecipeNotFound";
import { getRecipeById } from "../../../services/cardsApiServices";


interface RecipeLandingProps {}

const RecipeLanding: FunctionComponent<RecipeLandingProps> = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response: any = await getRecipeById(id as string);
        setRecipe(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center my-20">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div
        className={`flex justify-center items-center min-h-screen bg-${theme} p-4 md:p-6 relative`}
      >
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-10">
          <div
            className="absolute top-1/4 -left-1/4 w-full h-96 rounded-full"
            style={{
              background: "linear-gradient(to right, #f97316, #dc2626)",
              filter: "blur(120px)",
              transform: "rotate(-15deg)",
            }}
          />
          <div
            className="absolute bottom-1/4 -right-1/4 w-full h-96 rounded-full"
            style={{
              background: "linear-gradient(to right, #f97316, #dc2626)",
              filter: "blur(120px)",
              transform: "rotate(15deg)",
            }}
          />
        </div>

        {recipe ? (
          <div
            className={`max-w-3xl w-full rounded-xl shadow-xl overflow-hidden bg-${theme} card text-${
              theme === "dark" ? "white" : "gray-800"
            } border border-gray-200 dark:border-gray-700 relative`}
            style={{
              boxShadow:
                theme === "dark"
                  ? "0 10px 25px rgba(249, 115, 22, 0.1)"
                  : "0 10px 25px rgba(220, 38, 38, 0.1)",
            }}
          >
            <div 
              className="absolute top-0 left-0 w-full h-1" 
              style={{
                background: "linear-gradient(to right, #f97316, #dc2626)"
              }}
            />

            <div className="p-6 md:p-8">
              <h1 className="text-center text-3xl md:text-4xl font-bold mb-2 break-words">
                {recipe.title}
              </h1>
              <h2 className="text-center text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6">
                {recipe.subtitle}
              </h2>

              {recipe.image?.url && (
                <div className="relative overflow-hidden rounded-lg shadow-md mb-8">
                  <img
                    src={recipe.image.url}
                    alt={recipe.image.alt || "Recipe image"}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                  <div 
                    className="absolute bottom-0 left-0 w-full h-1" 
                    style={{
                      background: "linear-gradient(to right, #f97316, #dc2626)"
                    }}
                  />
                </div>
              )}

              <div className="prose dark:prose-invert max-w-none mb-8">
                <p className="text-lg leading-relaxed">{recipe.description}</p>
              </div>

              <div
                className={`p-5 rounded-lg ${
                  theme === "dark" ? "bg-gray-800" : "bg-gray-50"
                } mb-6 relative`}
              >
                <div 
                  className="absolute top-0 left-0 w-1 h-full" 
                  style={{
                    background: "linear-gradient(to bottom, #f97316, #dc2626)"
                  }}
                />
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                  Recipe Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="font-semibold w-32">Author:</span>
                    <span>{recipe.email}</span>
                  </div>
                  {recipe.web && (
                    <div className="flex items-start">
                      <span className="font-semibold w-32">Source:</span>
                      <a>
                        href={recipe.web}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300 transition-colors break-words max-w-[calc(100%-8rem)] truncate"
                      
                        {recipe.web}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <RecipeNotFound theme={theme} />
        )}
      </div>
    </>
  );
};

export default RecipeLanding;