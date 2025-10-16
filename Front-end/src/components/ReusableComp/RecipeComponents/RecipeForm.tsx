import { FormikValues } from "formik";
import { FunctionComponent, useContext } from "react";
import { ThemeContext } from "../../Provider/ThemeProvider";
import RecipeDetails from "./RecipeDetailes";
import RecipeInfo from "./RecipeContact";
import RecipeImage from "./RecipeImg";


interface RecipeFormProps {
  formik: FormikValues;
}

const RecipeForm: FunctionComponent<RecipeFormProps> = ({ formik }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div className={`py-12 px-4 md:px-6 ${theme === "dark" ? "bg-dark" : "bg-light"}`}>
        <div className="container max-w-4xl py-8 px-6 md:px-8 mx-auto card rounded-lg shadow-lg border relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 z-10 gradient-background" />

          <form
            className="max-w-3xl mx-auto space-y-8"
            onSubmit={formik.handleSubmit}
          >
            <RecipeDetails formik={formik} />

            <RecipeInfo formik={formik} />

            <RecipeImage formik={formik} />

            <div className="flex justify-center py-4">
              <button
                disabled={!formik.dirty || !formik.isValid}
                type="submit"
                className="w-full sm:w-auto text-white gradient-background font-medium rounded-lg text-lg px-8 py-3 text-center transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50"
              >
                Submit Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RecipeForm;