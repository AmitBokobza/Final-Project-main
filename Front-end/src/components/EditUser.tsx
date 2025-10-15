import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import User from "../interfaces/User";
import { FormikValues, useFormik } from "formik";
import * as yup from "yup";
import { normalizeUser } from "../util/Normalize";
import toastEmitter from "../emitter/toastEmitter";
import { userContext } from "../services/userContext";
import RegisterForm from "./ReusableComp/RegisterComponents/RegisteForm";
import { getUserById, updateUser } from "../services/usersApiServices";
import NoAccess from "./ReusableComp/Misc/NoAccess";
import ProfileNotFound from "./ReusableComp/ProfileComponents/ProfileNotFound";
import { ThemeContext } from "./Provider/ThemeProvider";

interface EditUserProps {}

const EditUser: FunctionComponent<EditUserProps> = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const token: string = localStorage.getItem("token") || "";
  const [userToUpdate, setUserToUpdate] = useState<User | null>(null);
  const { user } = useContext(userContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response: any = await getUserById(id as string, token);
        setUserToUpdate(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [id]);

  const formik: FormikValues = useFormik<FormikValues>({
    initialValues: {
      first: userToUpdate?.name.first || "",
      middle: userToUpdate?.name.middle || "",
      last: userToUpdate?.name.last || "",
      phone: userToUpdate?.phone || "",
      url: userToUpdate?.image.url || "",
      alt: userToUpdate?.image.alt || "",
      country: userToUpdate?.address.country || "",
      city: userToUpdate?.address.city || "",
      street: userToUpdate?.address.street || ""
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      first: yup.string().min(2).max(256).required("First name is required!"),
      middle: yup.string().min(2).max(256),
      last: yup.string().min(2).max(256).required("Last name is required!"),
      url: yup.string().min(14),
      alt: yup.string().min(14).max(256),
      country: yup.string().min(2).max(256).required("Country is required!"),
      city: yup.string().min(2).max(256).required("City is required"),
      street: yup.string().min(2).max(256).required("Street is required!"),
    }),
    onSubmit: (values, { resetForm }) => {
      const normalizedUser = normalizeUser(values);
      updateUser(id as string, normalizedUser, token)
        .then(() => {
          toastEmitter.success("User Succefully Updated!");
          navigate(`/profile-page/${id}`);
          resetForm();
        })
        .catch(() => {
          toastEmitter.error("Error Updating Card!");
        });
    },
  });
  if (!user) {
    return <NoAccess />;
  }

  if (String(user?._id) === userToUpdate?._id) {
    return (
      <>
        <div className="text-center">
          <h1 className="text-3xl my-5">Edit User</h1>
        </div>
        <RegisterForm formik={formik}  isCreate={false}/>
      </>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileNotFound theme={theme} />
    </div>
  );
};

export default EditUser;
