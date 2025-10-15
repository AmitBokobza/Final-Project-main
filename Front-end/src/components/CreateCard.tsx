import { FormikValues, useFormik } from "formik";
import { FunctionComponent, useContext } from "react";
import * as yup from "yup";
import RecipeForm from "./ReusableComp/RecipeComponents/RecipeForm";
import { userContext } from "../services/userContext";
import { useNavigate } from "react-router-dom";
import toastEmitter from "../emitter/toastEmitter";
import NoAccess from "./ReusableComp/Misc/NoAccess";
import { normalizeRecipe } from "../util/Normalize";
import { createRecipe } from "../services/cardsApiServices";

interface CreateRecipeProps {}

const CreateRecipe: FunctionComponent<CreateRecipeProps> = () => {
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const token: string = localStorage.getItem("token") || "";

  const formik: FormikValues = useFormik<FormikValues>({
    initialValues: {
      title: "",
      subtitle: "",
      description: "",
      email: "",
      web: "",
      url: "",
      alt: "",
    },
    validationSchema: yup.object({
      title: yup.string().min(2).max(256).required("Title is required!"),
      subtitle: yup.string().min(2).max(256).required("Subtitle is required!"),
      description: yup
        .string()
        .min(2)
        .max(1024)
        .required("Description is required!"),
      email: yup.string().min(5).email("Invalid email format"),
      web: yup.string().min(14).url("Must be a valid URL"),
      url: yup.string().min(14).url("Must be a valid URL"),
      alt: yup.string().min(2).max(256),
      state: yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      const normalizedRecipe = normalizeRecipe(values);
      createRecipe(normalizedRecipe, token)
        .then(() => {
          toastEmitter.success("Recipe Successfully Created!");
          navigate("/");
        })
        .catch(() => {
          toastEmitter.error("Failed Creating Recipe");
        });
      resetForm();
    },
  });

  if (user?.isCook || user?.isAdmin) {
    return (
      <>
        <div className="text-center">
          <h1 className="text-3xl my-5">Create Recipe</h1>
        </div>
        <RecipeForm formik={formik} />
      </>
    );
  } else {
    return <NoAccess />;
  }
};

export default CreateRecipe;