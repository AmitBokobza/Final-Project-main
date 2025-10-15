import { FunctionComponent, useContext, useEffect, useState } from "react";
import Recipe from "../interfaces/Recipe/Recipe";
import { userContext } from "../services/userContext";
import RecipeLinks from "./ReusableComp/RecipeComponents/RecipeLinks";
import { ThemeContext } from "./Provider/ThemeProvider";
import { searchContext } from "../App";
import Spinner from "./ReusableComp/Misc/Spinner";
import RecipeNotFound from "./ReusableComp/RecipeComponents/RecipeNotFound";
import { getAllRecipes } from "../services/cardsApiServices";
import RecipeCard from "./ReusableComp/RecipeComponents/RecipeTemp";

interface FavRecipesProps {}

const FavRecipes: FunctionComponent<FavRecipesProps> = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useContext(userContext);
  const { theme } = useContext(ThemeContext);
  const { search } = useContext(searchContext);
  const userId = String(user?._id);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const favRecipes = recipes.filter((recipe) => recipe.likes?.includes(userId));
  const filteredFav = favRecipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );
  
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await getAllRecipes();
        setRecipes(response?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  if (!user) {
    return (
      <div className="text-center">
        <h1 className="my-10 text-3xl">Must be Registered!</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center my-20">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-block bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-full mb-4">
            <span
              className={`text-sm font-medium ${
                theme === "light" ? "text-red-700" : "text-red-300"
              }`}
            >
              Your Favorites
            </span>
          </div>
          <h1
            className={`text-4xl md:text-5xl lg:text-7xl font-extrabold ${
              theme === "light" ? "text-slate-900" : "text-white"
            }`}
          >
            Liked Recipes
          </h1>
        </div>

        {filteredFav.length === 0 ? (
          <RecipeNotFound theme={theme} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFav.map((recipe: Recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe}>
                <div className="flex space-x-2 mt-2">
                  <RecipeLinks myRecipeComponent={false} recipe={recipe} />
                </div>
              </RecipeCard>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FavRecipes;