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
      <div className="py-12 px-4 md:px-6">
        <div
          className={`container max-w-4xl py-8 px-6 md:px-8 mx-auto bg-${theme} rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 relative overflow-hidden`}
        >
          <div 
            className="absolute top-0 left-0 w-full h-1 z-10"
            style={{
              background: "linear-gradient(to right, #f97316, #dc2626)"
            }}
          />

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
                className="w-full sm:w-auto text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-lg px-8 py-3 text-center 
                dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
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