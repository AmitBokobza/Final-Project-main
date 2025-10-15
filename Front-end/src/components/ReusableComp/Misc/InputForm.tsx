import { FormikValues } from "formik";
import { FunctionComponent, useContext } from "react";
import { ThemeContext } from "../../Provider/ThemeProvider";

interface InputFormProps {
  type: string;
  name: string;
  id: string;
  formik: FormikValues;
  required?: boolean;
}

const InputForm: FunctionComponent<InputFormProps> = ({
  required,
  type,
  name,
  id,
  formik,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div className="relative w-full group">
        <label
          htmlFor={id}
          className={`block text-base font-medium ${
            theme === "dark" ? "text-gray-200" : "text-gray-800"
          } mb-2`}
        >
          {name.charAt(0).toUpperCase() + name.slice(1)}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        <input
          type={type}
          name={name}
          id={id}
          required={required}
          placeholder=""
          className={`block w-full py-3 px-4 text-base 
          ${
            theme === "dark"
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-gray-900 border-gray-300"
          }
          border rounded-lg shadow-sm
          ${
            theme === "dark"
              ? "focus:ring-blue-400 focus:border-blue-400"
              : "focus:ring-blue-500 focus:border-blue-500"
          }
          focus:outline-none focus:ring-2 transition-all duration-200`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
        />

        {formik.errors[name] && formik.touched[name] && (
          <span
            className={`block mt-1 text-sm ${
              theme === "dark" ? "text-red-400" : "text-red-600"
            }`}
          >
            {formik.errors[name]}
          </span>
        )}
      </div>
    </>
  );
};

export default InputForm;
