import { FunctionComponent, useContext, useEffect, useState } from "react";
import { userContext } from "../services/userContext";
import Recipe from "../interfaces/Recipe/Recipe";
import { searchContext } from "../App";
import { ThemeContext } from "./Provider/ThemeProvider";
import RecipeLinks from "./ReusableComp/RecipeComponents/RecipeLinks";
import Spinner from "./ReusableComp/Misc/Spinner";
import RecipeNotFound from "./ReusableComp/RecipeComponents/RecipeNotFound";
import NoAccess from "./ReusableComp/Misc/NoAccess";
import { getAllMyRecipes } from "../services/cardsApiServices";
import RecipeCard from "./ReusableComp/RecipeComponents/RecipeTemp";

interface MyRecipesProps {}

const MyRecipes: FunctionComponent<MyRecipesProps> = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(userContext);
  const { search } = useContext(searchContext);
  const token: string = localStorage.getItem("token") || "";
  const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);
  const filteredRecipes = myRecipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  const deleteRecipeFromList = (deletedRecipeId: string) => {
    setMyRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe._id !== deletedRecipeId)
    );
  };

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const response: any = await getAllMyRecipes(token);
        setMyRecipes(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyRecipes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center my-20">
        <Spinner />
      </div>
    );
  }
  if (user?.isCook || user?.isAdmin) {
    return (
      <>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="inline-block bg-orange-100 dark:bg-orange-900/30 px-4 py-2 rounded-full mb-4">
              <span
                className={`text-sm font-medium ${
                  theme === "light" ? "text-orange-700" : "text-orange-300"
                }`}
              >
                Your Recipe Collection
              </span>
            </div>

            <h1
              className={`text-4xl md:text-5xl lg:text-7xl font-bold ${
                theme === "light" ? "text-slate-900" : "text-white"
              }`}
            >
              My Recipes
            </h1>
          </div>

          {filteredRecipes.length === 0 ? (
            <RecipeNotFound theme={theme} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRecipes.map((recipe: Recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe}>
                  <div className="flex space-x-2 mt-2">
                    <RecipeLinks
                      myRecipeComponent={true}
                      recipe={recipe}
                      deleteRecipeFromList={deleteRecipeFromList}
                    />
                  </div>
                </RecipeCard>
              ))}
            </div>
          )}
        </div>
      </>
    );
  } else {
    return <NoAccess />;
  }
};

export default MyRecipes;
