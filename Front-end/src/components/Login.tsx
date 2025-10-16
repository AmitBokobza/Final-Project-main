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
    <div className={`min-h-[70vh] flex items-center justify-center px-4 py-12 ${theme === "dark" ? "bg-dark" : "bg-light"}`}>
      <div className="w-full max-w-md">
        <div className="card relative shadow-lg rounded-lg overflow-hidden">
          {/* Gradient Highlight */}
          <div className="absolute top-0 left-0 w-full h-1 gradient-background" />

          <div className="p-8">
            <h2 className="text-3xl font-bold text-center mb-8">
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
                  className="w-full py-3 px-4 text-white gradient-background rounded-lg transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-60 disabled:pointer-events-none hover:opacity-90"
                >
                  Login
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm secondary-text">
                    Don't have an account?
                    <Link
                      to="/register"
                      className="ml-1 font-medium accent hover:underline"
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
