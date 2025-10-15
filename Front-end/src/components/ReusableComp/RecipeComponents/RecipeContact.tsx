import { FormikValues } from "formik";
import { FunctionComponent } from "react";
import InputForm from "../Misc/InputForm";

interface RecipeInfoProps {
    formik: FormikValues;
}
 
const RecipeInfo: FunctionComponent<RecipeInfoProps> = ({ formik }) => {
    return ( 
        <>
            <div className="p-4 md:p-6 bg-white/50 dark:bg-gray-800/20 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Additional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InputForm
                        type="email"
                        name="email"
                        id="email"
                        formik={formik}
                    />
                    <InputForm
                        type="url"
                        name="web"
                        id="web"
                        formik={formik}
                    />
                </div>
            </div>
        </>
    );
}
 
export default RecipeInfo;