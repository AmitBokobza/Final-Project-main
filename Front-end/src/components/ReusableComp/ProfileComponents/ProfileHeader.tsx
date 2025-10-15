import { FunctionComponent, useContext } from "react";
import User from "../../../interfaces/User";
import { ThemeContext } from "../../Provider/ThemeProvider";

interface ProfileHeaderProps {
  loggedUser: User;
}

const ProfileHeader: FunctionComponent<ProfileHeaderProps> = ({
  loggedUser,
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
      <div className="relative">
        <img
          src={loggedUser?.image?.url || "https://via.placeholder.com/150"}
          alt={loggedUser?.image?.alt || "Profile Picture"}
          className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover shadow-lg border-4 border-white dark:border-gray-700"
        />
        <div
          className={`absolute bottom-2 right-2 w-5 h-5 rounded-full bg-green-500 border-2 border-${
            theme === "dark" ? "gray-800" : "white"
          }`}
        ></div>
      </div>

      <div className="text-center md:text-left">
        <h2
          className={`text-2xl md:text-4xl font-bold text-${
            theme === "dark" ? "white" : "gray-900"
          }`}
        >
          {loggedUser?.name.first}{" "}
          {loggedUser?.name.middle ? loggedUser.name.middle + " " : ""}
          {loggedUser?.name.last}
        </h2>
        <p
          className={`text-base md:text-lg text-${
            theme === "dark" ? "gray-300" : "gray-700"
          } mt-1`}
        >
          {loggedUser?.email}
        </p>

        <div className="mt-3">
          <span
            className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
              loggedUser?.isAdmin
                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                : loggedUser?.isCook
                ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            }`}
          >
            {loggedUser?.isAdmin
              ? "Admin Account"
              : loggedUser?.isCook
              ? "Cook Account"
              : "Personal Account"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
