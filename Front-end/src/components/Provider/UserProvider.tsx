import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import decodeUser from "../../util/Decode";
import { IUser, userContext } from "../../services/userContext";

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: FunctionComponent<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = decodeUser(token);
        setUser(decodedUser as IUser);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
