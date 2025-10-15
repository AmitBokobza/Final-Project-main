import { FunctionComponent, useContext, useEffect, useState } from "react";
import Recipe from "../interfaces/Recipe/Recipe";
import { ThemeContext } from "./Provider/ThemeProvider";
import { searchContext } from "../App";
import Spinner from "./ReusableComp/Misc/Spinner";
import RecipeNotFound from "./ReusableComp/RecipeComponents/RecipeNotFound";
import RecipeLinks from "./ReusableComp/RecipeComponents/RecipeLinks";
import { getAllRecipes } from "../services/cardsApiServices";
import RecipeCard from "./ReusableComp/RecipeComponents/RecipeTemp";

interface RecipesProps {}

const ITEMS_PER_PAGE: number = 8;

const Recipes: FunctionComponent<RecipesProps> = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { theme } = useContext(ThemeContext);
  const { search } = useContext(searchContext);
  const filteredRecipes = Array.isArray(recipes) 
  ? recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(search.toLowerCase())
    )
  : [];

  const deleteRecipeFromList = (deletedRecipeId: string) => {
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe._id !== deletedRecipeId)
    );
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE);
  const indexOfLastRecipe = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstRecipe = indexOfLastRecipe - ITEMS_PER_PAGE;
  const currentRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response: any = await getAllRecipes();
        setRecipes(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

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
        {currentRecipes.length === 0 && <RecipeNotFound theme={theme} />}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentRecipes.map((recipe: Recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe}>
              <div className="flex space-x-2 mt-2">
                <RecipeLinks
                  myRecipeComponent={false}
                  recipe={recipe}
                  deleteRecipeFromList={deleteRecipeFromList}
                />
              </div>
            </RecipeCard>
          ))}
        </div>

        <div className="flex justify-center my-4">
          <button
            className={`px-4 py-2 mx-2 border rounded ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : `hover:bg-${theme} card`
            }`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2">
            {currentPage} / {totalPages}
          </span>
          <button
            className={`px-4 py-2 mx-2 border rounded ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : `hover:bg-${theme} card`
            }`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Recipes;