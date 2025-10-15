import { FormikValues } from "formik";
import { FunctionComponent, useContext } from "react";
import InputForm from "../Misc/InputForm";
import { ThemeContext } from "../../Provider/ThemeProvider";

interface RegisterNameProps {
  formik: FormikValues;
}

const RegisterName: FunctionComponent<RegisterNameProps> = ({ formik }) => {
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
          Full Name
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputForm
            type="text"
            name="first"
            id="firstName"
            formik={formik}
            required
          />

          <InputForm
            type="text"
            name="middle"
            id="middleName"
            formik={formik}
          />
          <InputForm
            type="text"
            name="last"
            id="lastName"
            formik={formik}
            required
          />
        </div>
      </div>
    </>
  );
};

export default RegisterName;
