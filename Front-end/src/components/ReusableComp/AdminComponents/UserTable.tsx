import { FunctionComponent } from "react";
import User from "../../../interfaces/User";
import { CiEdit, CiTrash } from "react-icons/ci";
import { Link } from "react-router-dom";
import { deleteUser } from "../../../services/usersApiServices";
import toastEmitter from "../../../emitter/toastEmitter";

interface UserTableProps {
  theme?: string;
  users: User[];
  deletedUserFromList?: (id: string) => void;
  token: string;
}

const UserTable: FunctionComponent<UserTableProps> = ({
  theme,
  users,
  deletedUserFromList,
  token,
}) => {
  return (
    <>
      <div className="overflow-x-auto relative">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-10">
          <div
            className="absolute top-1/4 -left-1/4 w-full h-96 rounded-full gradient-background"
            style={{
              filter: "blur(120px)",
              transform: "rotate(-15deg)",
            }}
          />
          <div
            className="absolute bottom-1/4 -right-1/4 w-full h-96 rounded-full gradient-background"
            style={{
              filter: "blur(120px)",
              transform: "rotate(15deg)",
            }}
          />
        </div>

        <table className="w-full table-auto border-collapse relative z-10">
          <thead>
            <tr
              className={`
              ${
                theme === "dark"
                  ? "bg-gray-800 text-gray-200 border-gray-700"
                  : "bg-gray-100 text-gray-800 border-gray-300"
              } text-left relative`}
            >
              <th className="p-0 border-0">
                <div className="absolute top-0 left-0 w-full h-1 gradient-background" />
              </th>
              <th className="p-3 border-b font-semibold hidden md:table-cell">
                ID
              </th>
              <th className="p-3 border-b font-semibold">NAME</th>
              <th className="p-3 border-b font-semibold hidden sm:table-cell">
                BUSINESS STATUS
              </th>
              <th className="p-3 border-b font-semibold">CONTROLS</th>
            </tr>
          </thead>
          {users && (
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className={`
                  ${
                    theme === "dark"
                      ? "border-gray-700 bg-gray-700/50 hover:bg-gray-700/70"
                      : "border-gray-200 bg-white hover:bg-gray-100"
                  } border-b transition-colors duration-200 relative`}
                >
                  <td className="p-0 border-0">
                    <div
                      className="absolute top-0 left-0 w-1 h-full"
                      style={{
                        background: user.isAdmin
                          ? "linear-gradient(to bottom, #ef4444, #dc2626)"
                          : user.isBusiness
                          ? "linear-gradient(to bottom, #8e56c9, #7e22ce)"
                          : "linear-gradient(to bottom, #4f8ad5, #3b82f6)",
                      }}
                    />
                  </td>
                  <td className="p-3 text-sm truncate max-w-[150px] hidden md:table-cell">
                    {user._id}
                  </td>
                  <td className="p-3">
                    {user.name.first} {user.name.middle} {user.name.last}
                  </td>
                  <td className="p-3 hidden sm:table-cell">
                    <span
                      className={`
                      px-3 py-1 rounded-full text-xs font-medium inline-block
                      ${
                        user.isAdmin
                          ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                          : user.isBusiness
                          ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white"
                          : "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                      }
                    `}
                    >
                      {user.isAdmin
                        ? "Admin User"
                        : user.isBusiness
                        ? "Business User"
                        : "Personal User"}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => {
                          deleteUser(user._id as string, token)
                            .then(() => {
                              toastEmitter.success("User Deleted!");
                              if (deletedUserFromList) {
                                deletedUserFromList(user._id as string);
                              }
                            })
                            .catch(() => {
                              toastEmitter.error("Error Deleting User!");
                            });
                        }}
                        className={`
                        hover:text-red-500 transition-colors duration-200
                        ${
                          theme === "dark"
                            ? "text-red-400/70 hover:text-red-400"
                            : "text-red-500/80 hover:text-red-600"
                        }
                      `}
                      >
                        <CiTrash size={20} />
                      </button>
                      <Link
                        to={`/profile-page/${user._id}`}
                        className={`
                        hover:text-blue-600 transition-colors duration-200
                        ${
                          theme === "dark"
                            ? "text-blue-400/70 hover:text-blue-400"
                            : "text-yellow-600/80 hover:text-yellow-700"
                        }
                      `}
                      >
                        <CiEdit size={20} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};

export default UserTable;
