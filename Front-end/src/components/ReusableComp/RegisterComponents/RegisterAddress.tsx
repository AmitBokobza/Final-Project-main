import { FormikValues } from "formik";
import { FunctionComponent, useContext } from "react";
import { ThemeContext } from "../../Provider/ThemeProvider";
import InputForm from "../Misc/InputForm";

interface RegisterAddressProps {
  formik: FormikValues;
}

const RegisterAddress: FunctionComponent<RegisterAddressProps> = ({
  formik,
}) => {
  const { theme } = useContext(ThemeContext);
  return (
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
        Address
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <InputForm
          type="text"
          name="country"
          id="country"
          formik={formik}
          required
        />
        <InputForm type="text" name="city" id="city" formik={formik} required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InputForm
          type="text"
          name="street"
          id="street"
          formik={formik}
          required
        />
      </div>
    </div>
  );
};

export default RegisterAddress;
