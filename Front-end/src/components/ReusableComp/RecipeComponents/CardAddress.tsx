import { FormikValues } from "formik";
import { FunctionComponent } from "react";
import InputForm from "../Misc/InputForm";

interface CardAddressProps {
    formik:FormikValues;
}
 
const CardAddress: FunctionComponent<CardAddressProps> = ({formik}) => {
    return ( 
        <>
            <div className="p-4 md:p-6 bg-white/50 dark:bg-gray-800/20 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <InputForm type="text" name="state" id="state" formik={formik} />
          <InputForm
            type="text"
            name="country"
            id="country"
            formik={formik}
            required
          />
          <InputForm
            type="text"
            name="city"
            id="city"
            formik={formik}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputForm
            type="text"
            name="street"
            id="street"
            formik={formik}
            required
          />
          <InputForm
            type="number"
            name="houseNum"
            id="houseNum"
            formik={formik}
            required
          />
          <InputForm
            type="number"
            name="zip"
            id="zip"
            formik={formik}
            required
          />
        </div>
      </div>

        </>
     );
}
 
export default CardAddress;