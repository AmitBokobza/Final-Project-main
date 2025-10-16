import { FormikValues } from "formik";
import { FunctionComponent, useContext } from "react";
import InputForm from "../Misc/InputForm";
import { ThemeContext } from "../../Provider/ThemeProvider";

interface RecipeInfoProps {
    formik: FormikValues;
}
 
const RecipeInfo: FunctionComponent<RecipeInfoProps> = ({ formik }) => {
    const { theme } = useContext(ThemeContext);
    
    return ( 
        <>
            <div className={`p-4 md:p-6 rounded-lg ${theme === "dark" ? "bg-gray-800/20" : "bg-white/50"}`}>
                <h3 className="text-lg font-semibold mb-4">
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