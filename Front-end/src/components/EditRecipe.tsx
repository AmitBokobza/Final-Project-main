import { FunctionComponent, useContext, useEffect, useState } from "react";
import Recipe from "../interfaces/Recipe/Recipe";
import { useNavigate, useParams } from "react-router-dom";
import { userContext } from "../services/userContext";
import { FormikValues, useFormik } from "formik";
import * as yup from "yup";
import { normalizeRecipe } from "../util/Normalize";
import toastEmitter from "../emitter/toastEmitter";
import NoAccess from "./ReusableComp/Misc/NoAccess";
import { getRecipeById, updateRecipe } from "../services/cardsApiServices";
import RecipeForm from "./ReusableComp/RecipeComponents/RecipeForm";

interface EditRecipeProps {}

const EditRecipe: FunctionComponent<EditRecipeProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const { user } = useContext(userContext);
  const token: string = localStorage.getItem("token") || "";

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response: any = await getRecipeById(id as string);
        setRecipe(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipe();
  }, [id]);

  const formik: FormikValues = useFormik<FormikValues>({
    initialValues: {
      title: recipe?.title,
      subtitle: recipe?.subtitle,
      description: recipe?.description,
      email: recipe?.email,
      web: recipe?.web,
      url: recipe?.image.url,
      alt: recipe?.image.alt
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      title: yup.string().min(2).max(256).required("Title is required!"),
      subtitle: yup.string().min(2).max(256).required("Subtitle is required!"),
      description: yup
        .string()
        .min(2)
        .max(1024)
        .required("Description is required!"),
      web: yup.string().min(14).url("Must be a valid URL"),
      url: yup.string().min(14).url("Must be a valid URL"),
      alt: yup.string().min(2).max(256),
    }),
    onSubmit: (values, { resetForm }) => {
      const normalizedRecipe = normalizeRecipe(values);
      updateRecipe(id as string, normalizedRecipe, token)
        .then(() => {
          toastEmitter.success("Recipe Updated!");
          navigate("/my-recipes");
        })
        .catch((err) => {
          toastEmitter.error("Failed Updating Recipe");
          console.log(err);
        });
      resetForm();
    },
  });

  if (!user) {
    return <NoAccess />;
  }
  if (String(user?._id) === recipe?.user_id || user?.isAdmin) {
    return (
      <>
        <div className="text-center">
          <h1 className="text-3xl my-5">Edit Recipe</h1>
        </div>
        <RecipeForm formik={formik} />
      </>
    );
  }

  return <NoAccess />;
};

export default EditRecipe;