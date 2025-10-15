import { FunctionComponent, useContext } from "react";
import { ThemeContext } from "../../Provider/ThemeProvider";
import User from "../../../interfaces/User";

interface ProfileContactProps {
  loggedUser: User;
}

const ProfileContact: FunctionComponent<ProfileContactProps> = ({
  loggedUser,
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base md:text-lg">
        <div className="flex items-center">
          <span
            className={`w-8 h-8 mr-3 flex items-center justify-center rounded-full ${
              theme === "dark" ? "bg-gray-600" : "bg-gray-200"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </span>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Phone
            </div>
            <div>{loggedUser?.phone || "N/A"}</div>
          </div>
        </div>

        <div className="flex items-center">
          <span
            className={`w-8 h-8 mr-3 flex items-center justify-center rounded-full ${
              theme === "dark" ? "bg-gray-600" : "bg-gray-200"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </span>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Account Type
            </div>
            <div>
              {loggedUser?.isAdmin
                ? "Admin"
                : loggedUser.isBusiness
                ? "Business"
                : "Personal"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileContact;
