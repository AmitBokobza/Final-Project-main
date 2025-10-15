import { FormikValues, useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup";
import { normalizeUser } from "../util/Normalize";
import toastEmitter from "../emitter/toastEmitter";
import { useNavigate } from "react-router-dom";
import RegisterForm from "./ReusableComp/RegisterComponents/RegisteForm";
import { registerUser } from "../services/usersApiServices";

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
  const navigate = useNavigate();
  const formik: FormikValues = useFormik<FormikValues>({
    initialValues: {
      first: "",
      middle: "",
      last: "",
      phone: "",
      email: "",
      password: "",
      url: "",
      alt: "",
      country: "",
      city: "",
      street: "",
      isCook: false,
    },
    validationSchema: yup.object({
      first: yup.string().min(2).max(256).required("First name is required!"),
      middle: yup.string().min(2).max(256),
      last: yup.string().min(2).max(256).required("Last name is required!"),
      phone: yup
        .string()
        .min(9)
        .max(11)
        .matches(
          /^(?:(?:\+972-?(?:[2-9]\d{7}|5\d{8}))|(?:0(?:[2-9]\d{7}|5\d{8})))$/,
          "Phone number must be a valid Israeli phone number"
        )
        .required("Phone number is required!"),
      email: yup.string().min(5).required("Email is required!"),
      password: yup
        .string()
        .min(7)
        .max(20)
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*\-]).{9,}$/,
          "Password must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number, and one of the following special characters: !@#$%^&*-"
        )
        .required("Password is required!"),
      url: yup.string().min(14),
      alt: yup.string().min(14).max(256),
      country: yup.string().min(2).max(256).required("Country is required!"),
      city: yup.string().min(2).max(256).required("City is required"),
      street: yup.string().min(2).max(256).required("Street is required!"),
      isCook: yup.boolean().required()
    }),
    onSubmit: (values, { resetForm }) => {
      const newUser = normalizeUser(values);
      registerUser(newUser)
        .then((res: any) => {
          toastEmitter.success(
            `User ${res.data.email} Successfully Registered!`
          ),
            navigate("/");
        })
        .catch(() => {
          toastEmitter.error("Registration Failed!");
        });
      resetForm();
    },
  });

  return (
    <>
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Create Account
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Join our community to create and manage your own recipes.
          </p>
        </div>

        <RegisterForm isCreate={true} formik={formik} />
      </div>
    </>
  );
};

export default Register;
