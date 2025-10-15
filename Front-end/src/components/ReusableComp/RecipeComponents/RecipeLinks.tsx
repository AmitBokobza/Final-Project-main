import { FunctionComponent, useContext, useState } from "react";
import { FaRegTrashAlt, FaBookOpen } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { userContext } from "../../../services/userContext";
import toastEmitter from "../../../emitter/toastEmitter";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Recipe from "../../../interfaces/Recipe/Recipe";
import { deleteRecipe, likeRecipe } from "../../../services/cardsApiServices";

interface RecipeLinksProps {
  myRecipeComponent?: boolean;
  recipe?: Recipe;
  deleteRecipeFromList?: (deleteRecipeId: string) => void;
}

const RecipeLinks: FunctionComponent<RecipeLinksProps> = ({
  myRecipeComponent,
  recipe,
  deleteRecipeFromList,
}) => {
  const { user } = useContext(userContext);
  const userId = String(user?._id);
  const navigate = useNavigate();
  const token: string = localStorage.getItem("token") || "";

  const [likeColor, setLikeColor] = useState<boolean>(() => {
    return recipe?.likes?.includes(userId) ?? false;
  });

  if (!user) {
    return (
      <button 
        onClick={() => navigate(`/recipes/${recipe?._id}`)}
        className="accent mt-1"
        title="View Recipe"
      >
        <FaBookOpen />
      </button>
    );
  }

  if (user.isAdmin) {
    return (
      <>
        <button 
          onClick={() => navigate(`/recipes/${recipe?._id}`)}
          className="accent mt-1"
          title="View Recipe"
        >
          <FaBookOpen />
        </button>
        <button className="accent cursor-pointer" title="Like Recipe">
          <CiHeart
            onClick={() => {
              likeRecipe(recipe?._id as string, token)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
              setLikeColor(!likeColor);
            }}
            className={`text-2xl ${likeColor ? `text-red-700` : `accent`}`}
          />
        </button>
        <button
          className="accent cursor-pointer"
          title="Delete Recipe"
          onClick={() => {
            deleteRecipe(recipe?._id as string, token)
              .then(() => {
                toastEmitter.success("Recipe Deleted!");
                if (deleteRecipeFromList) {
                  deleteRecipeFromList(recipe?._id as string);
                }
              })
              .catch(() => {
                toastEmitter.error("Error deleting recipe!");
              });
          }}
        >
          <FaRegTrashAlt className="text-xl" />
        </button>
        <button
          className="accent cursor-pointer"
          title="Edit Recipe"
          onClick={() => navigate(`../edit-recipe/${recipe?._id}`)}
        >
          <FaEdit className="text-xl" />
        </button>
      </>
    );
  }

  if (user.isCook) {
    return (
      <>
        <button 
          onClick={() => navigate(`/recipes/${recipe?._id}`)}
          className="accent mt-1"
          title="View Recipe"
        >
          <FaBookOpen />
        </button>
        <button className="accent cursor-pointer" title="Like Recipe">
          <CiHeart
            onClick={() => {
              likeRecipe(recipe?._id as string, token)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
              setLikeColor(!likeColor);
            }}
            className={`text-2xl ${likeColor ? `text-red-700` : `accent`}`}
          />
        </button>
        {myRecipeComponent && (
          <>
            <button
              className="accent cursor-pointer"
              title="Delete Recipe"
              onClick={() => {
                deleteRecipe(recipe?._id as string, token)
                  .then(() => {
                    toastEmitter.success("Recipe Deleted!");
                    if (deleteRecipeFromList) {
                      deleteRecipeFromList(recipe?._id as string);
                    }
                  })
                  .catch(() => {
                    toastEmitter.error("Error deleting recipe!");
                  });
              }}
            >
              <FaRegTrashAlt className="text-xl" />
            </button>
            <button
              className="accent cursor-pointer"
              title="Edit Recipe"
              onClick={() => navigate(`../edit-recipe/${recipe?._id}`)}
            >
              <FaEdit className="text-xl" />
            </button>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <button 
        onClick={() => navigate(`/recipes/${recipe?._id}`)}
        className="accent mt-1"
        title="View Recipe"
      >
        <FaBookOpen />
      </button>
      <button className="accent cursor-pointer" title="Like Recipe">
        <CiHeart
          onClick={() => {
            likeRecipe(recipe?._id as string, token)
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
            setLikeColor(!likeColor);
          }}
          className={`text-2xl ${likeColor ? `text-red-700` : `accent`}`}
        />
      </button>
    </>
  );
};

export default RecipeLinks;