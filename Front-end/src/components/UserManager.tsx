import { FunctionComponent, useContext, useEffect, useState } from "react";
import User from "../interfaces/User";
import Spinner from "./ReusableComp/Misc/Spinner";
import { userContext } from "../services/userContext";
import { ThemeContext } from "./Provider/ThemeProvider";
import UserTable from "./ReusableComp/AdminComponents/UserTable";
import UserManagerHeader from "./ReusableComp/AdminComponents/UserManagerHeader";
import { getAllUsers } from "../services/usersApiServices";
import NoAccess from "./ReusableComp/Misc/NoAccess";

interface UserManagerProps {}

const USERS_PER_PAGE = 15;

const UserManager: FunctionComponent<UserManagerProps> = () => {
  const [users, setUsers] = useState<User[]>([]);
  const token: string = localStorage.getItem("token") || "";
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useContext(userContext);
  const { theme } = useContext(ThemeContext);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  const lastIndex = currentPage * USERS_PER_PAGE;
  const firstIndex = lastIndex - USERS_PER_PAGE;
  const currentUsers = users.slice(firstIndex, lastIndex);

  const deleteUserFromList = (deletedUserId: string) => {
    setUsers((prevUsers) =>
      prevUsers.filter((card) => card._id !== deletedUserId)
    );
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response: any = await getAllUsers(token);
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center my-20">
        <Spinner />
      </div>
    );
  }

  if (user?.isAdmin) {
    return (
      <>
        <UserManagerHeader theme={theme} />
        <div className="w-full py-10">
          <div className="mx-auto max-w-4xl px-4">
            <UserTable
              theme={theme}
              users={currentUsers}
              deletedUserFromList={deleteUserFromList}
              token={token}
            />

            <div className="flex justify-center my-4">
              <button
                className={`px-4 py-2 mx-2 border rounded ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : `hover:bg-${theme} card`
                }`}
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="px-4 py-2">
                {currentPage} / {totalPages}
              </span>
              <button
                className={`px-4 py-2 mx-2 border rounded ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : `hover:bg-${theme} card`
                }`}
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <NoAccess />;
  }
};

export default UserManager;
