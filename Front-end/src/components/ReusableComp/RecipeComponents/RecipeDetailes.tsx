import { FormikValues } from "formik";
import { FunctionComponent, useContext } from "react";
import InputForm from "../Misc/InputForm";
import { ThemeContext } from "../../Provider/ThemeProvider";

interface RecipeDetailsProps {
    formik: FormikValues;
}
 
const RecipeDetails: FunctionComponent<RecipeDetailsProps> = ({ formik }) => {
    const { theme } = useContext(ThemeContext);
    
    return ( 
        <>
            <div className={`p-4 md:p-6 rounded-lg ${theme === "dark" ? "bg-gray-800/20" : "bg-white/50"}`}>
                <h3 className="text-lg font-semibold mb-4">
                    Recipe Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InputForm
                        type="text"
                        name="title"
                        id="title"
                        formik={formik}
                        required
                    />

                    <InputForm
                        type="text"
                        name="subtitle"
                        id="subtitle"
                        formik={formik}
                        required
                    />
                    <InputForm
                        type="text"
                        name="description"
                        id="description"
                        formik={formik}
                        required
                    />
                </div>
            </div>
        </>
    );
}
 
export default RecipeDetails;