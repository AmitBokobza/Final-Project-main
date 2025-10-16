import { FormikValues } from "formik";
import { FunctionComponent, useContext } from "react";
import InputForm from "../Misc/InputForm";
import { ThemeContext } from "../../Provider/ThemeProvider";

interface RecipeImageProps {
  formik: FormikValues;
}

const RecipeImage: FunctionComponent<RecipeImageProps> = ({ formik }) => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <>
      <div className={`p-4 md:p-6 rounded-lg ${theme === "dark" ? "bg-gray-800/20" : "bg-white/50"}`}>
        <h3 className="text-lg font-semibold mb-4">
          Recipe Image
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputForm type="url" name="url" id="url" formik={formik} />
          <InputForm type="text" name="alt" id="alt" formik={formik} />
        </div>
      </div>
    </>
  );
};

export default RecipeImage;