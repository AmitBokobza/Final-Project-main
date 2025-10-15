import { FunctionComponent, useContext } from "react";
import { userContext } from "../../../services/userContext";
import { Link, useNavigate } from "react-router-dom";
import person from "../../../assets/person.png";

interface NavUserProps {}

const NavUser: FunctionComponent<NavUserProps> = () => {
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  if (user) {
    if (user.isAdmin) {
      return (
        <>
          <div className="flex flex-row justify-center items-center">
            <Link className="ml-5" to={`../profile-page/${user._id}`}>
              <img src={person} />
            </Link>
            <button
              onClick={handleLogOut}
              className="ml-3 text-sm cursor-pointer p-1 rounded-full hover:bg-gray-200/30 transition-colors"
            >
              LOG OUT
            </button>
          </div>
        </>
      );
    }
  }
  if (!user) {
    return (
      <>
        <div className="flex flex-row justify-center items-center">
          <Link className="ml-5 p-1 rounded-full hover:bg-gray-200/30 transition-colors" to="/register">
            SIGN UP
          </Link>
          <Link className="ml-5 p-1 rounded-full hover:bg-gray-200/30 transition-colors" to="/login">
            LOG IN
          </Link>
        </div>
      </>
    );
  }

  if (!user.isBusiness) {
    return (
      <>
        <div className="flex flex-row justify-center items-center">
          <Link className="ml-5" to={`../profile-page/${user._id}`}>
            <img src={person} />
          </Link>
          <button
            onClick={handleLogOut}
            className="ml-3 text-sm cursor-pointer p-1 rounded-full hover:bg-gray-200/30 transition-colors"
          >
            LOG OUT
          </button>
        </div>
      </>
    );
  }

  if (user.isBusiness) {
    return (
      <>
        <div className="flex flex-row justify-center items-center">
          <Link className="ml-5" to={`../profile-page/${user._id}`}>
            <img src={person} />
          </Link>
          <button
            onClick={handleLogOut}
            className="ml-3 text-sm cursor-pointer p-1 rounded-full hover:bg-gray-200/30 transition-colors"
          >
            LOG OUT
          </button>
        </div>
      </>
    );
  }
};

export default NavUser;
