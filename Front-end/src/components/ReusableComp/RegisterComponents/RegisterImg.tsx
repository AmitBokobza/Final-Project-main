import { FormikValues } from "formik";
import { FunctionComponent, useContext } from "react";
import { ThemeContext } from "../../Provider/ThemeProvider";
import InputForm from "../Misc/InputForm";

interface RegisterImgProps {
  formik: FormikValues;
}

const RegisterImg: FunctionComponent<RegisterImgProps> = ({ formik }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div
        className={`p-4 md:p-6 ${
          theme === "dark" ? "bg-gray-800/20" : "bg-white/50"
        } rounded-lg`}
      >
        <h3
          className={`text-lg font-semibold ${
            theme === "dark" ? "text-gray-200" : "text-gray-800"
          } mb-4 pb-2 border-b ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        >
          Image & Alternate Text
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputForm type="url" name="url" id="url" formik={formik} />
          <InputForm type="text" name="alt" id="alt" formik={formik} />
        </div>
      </div>
    </>
  );
};

export default RegisterImg;
