import { FunctionComponent, useContext, useEffect, useState } from "react";
import { userContext } from "../services/userContext";
import { ThemeContext } from "./Provider/ThemeProvider";
import User from "../interfaces/User";
import { useNavigate, useParams } from "react-router-dom";
import ProfileHeader from "./ReusableComp/ProfileComponents/ProfileHeader";
import ProfileContact from "./ReusableComp/ProfileComponents/ProfileContact";
import ProfileAddress from "./ReusableComp/ProfileComponents/ProfileAddress";
import Spinner from "./ReusableComp/Misc/Spinner";
import { getUserById } from "../services/usersApiServices";
import ProfileNotFound from "./ReusableComp/ProfileComponents/ProfileNotFound";
import NoAccess from "./ReusableComp/Misc/NoAccess";

interface ProfilePageProps {}

const ProfilePage: FunctionComponent<ProfilePageProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(userContext);
  const userId = String(id);
  const { theme } = useContext(ThemeContext);
  const token: string = localStorage.getItem("token") || "";
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && token) {
      const fetchUser = async () => {
        try {
          const response: any = await getUserById(userId, token);
          setLoggedUser(response.data);
        } catch (error) {
          console.log(error);
          setLoggedUser(null);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    } else {
      setLoading(false);
    }
  }, [user, token]);

  if (loading) {
    return (
      <div className="flex justify-center my-20">
        <Spinner />
      </div>
    );
  }

  if (!user || !token) {
    return <NoAccess />;
  }

  if (loggedUser) {
    return (
      <>
        <div
          className={`flex items-center justify-center min-h-screen bg-${
            theme === "dark" ? "gray-900" : "gray-100"
          } py-12 px-4`}
        >
          <div
            className={`w-full max-w-4xl bg-${
              theme === "dark" ? "gray-800" : "white"
            } shadow-xl p-6 md:p-10 rounded-xl card border border-gray-200 dark:border-gray-700`}
          >
            <ProfileHeader loggedUser={loggedUser} />

            <div
              className={`mt-10 p-6 rounded-lg ${
                theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"
              }`}
            >
              <h2
                className={`text-xl font-semibold mb-4 text-${
                  theme === "dark" ? "white" : "gray-900"
                } pb-2 border-b border-gray-200 dark:border-gray-600`}
              >
                Contact Information
              </h2>

              <ProfileContact loggedUser={loggedUser} />
            </div>

            <div
              className={`mt-6 p-6 rounded-lg ${
                theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"
              }`}
            >
              <h2
                className={`text-xl font-semibold mb-4 text-${
                  theme === "dark" ? "white" : "gray-900"
                } pb-2 border-b border-gray-200 dark:border-gray-600`}
              >
                Address Information
              </h2>

              <ProfileAddress loggedUser={loggedUser} />
            </div>

            {String(user._id) == id && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => navigate(`../edit-user/${loggedUser._id}`)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition duration-200 transform hover:translate-y-px focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Edit Profile
                </button>
              </div>
            )}
            <p
              className={`text-sm mt-10 text-${
                theme === "dark" ? "gray-500" : "gray-600"
              } text-center`}
            >
              © 2025 AmitBusiness
            </p>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="container mx-auto px-4 py-8">
        <ProfileNotFound theme={theme} />
      </div>
    );
  }
};

export default ProfilePage;
