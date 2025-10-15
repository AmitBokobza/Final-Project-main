import { FunctionComponent, useContext } from "react";
import InputForm from "./ReusableComp/Misc/InputForm";
import { FormikValues, useFormik } from "formik";
import * as yup from "yup";
import { loginUser } from "../services/usersApiServices";
import toastEmitter from "../emitter/toastEmitter";
import { Link, useNavigate } from "react-router-dom";
import { IUser, userContext } from "../services/userContext";
import decodeUser from "../util/Decode";
import { ThemeContext } from "./Provider/ThemeProvider";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const { setUser } = useContext(userContext);
  const { theme } = useContext(ThemeContext);

  const navigate = useNavigate();
  const formik: FormikValues = useFormik<FormikValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().min(5).required("Email is required!"),
      password: yup.string().required("Password is required!"),
    }),
    onSubmit: (values, { resetForm }) => {
      loginUser(values)
        .then((res: any) => {
          localStorage.setItem("token", res.data);
          const decodedUser = decodeUser(res.data);
          setUser(decodedUser as IUser);
          toastEmitter.success("User Logged In Succesfully!");
          navigate("/");
          resetForm();
        })
        .catch((err) => {
          console.log(err);
          toastEmitter.error("Wrong Email or Password!");
        });
    },
  });
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div
          className={`
          relative 
          ${theme === "dark" ? "bg-gray-800" : "bg-white"} 
          shadow-lg 
          rounded-lg 
          overflow-hidden
        `}
        >
          {/* Gradient Highlight */}
          <div className="absolute top-0 left-0 w-full h-1 gradient-background" />

          <div className="p-8">
            <h2
              className={`
              text-3xl 
              font-bold 
              text-center 
              mb-8 
              ${theme === "dark" ? "text-white" : "text-gray-800"}
            `}
            >
              Login
            </h2>

            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <InputForm
                type="email"
                name="email"
                id="email"
                formik={formik}
                required
              />

              <InputForm
                type="password"
                name="password"
                id="password"
                formik={formik}
                required
              />

              <div className="pt-2">
                <button
                  disabled={!formik.dirty || !formik.isValid}
                  type="submit"
                  className={`
                  w-full 
                  py-3 
                  px-4 
                  text-white 
                  ${
                    theme === "dark"
                      ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                      : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                  } 
                  rounded-lg 
                  transition-colors 
                  duration-200 
                  font-medium 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-offset-2 
                  disabled:opacity-60 
                  disabled:pointer-events-none
                `}
                >
                  Login
                </button>

                <div className="text-center mt-4">
                  <p
                    className={`
                    text-sm 
                    ${theme === "dark" ? "text-gray-400" : "text-gray-600"}
                  `}
                  >
                    Don't have an account?
                    <Link
                      to="/register"
                      className={`
                      ml-1 
                      font-medium 
                      ${
                        theme === "dark"
                          ? "text-blue-400 hover:text-blue-300"
                          : "text-blue-600 hover:text-blue-700"
                      }
                    `}
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
