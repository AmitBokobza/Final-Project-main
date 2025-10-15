
import { createContext } from "react";

export interface IUser{
    iat?:number;
    isAdmin:boolean;
    isCook:boolean;
    _id:number;
}

export interface UserContextType{
    user: IUser | null;
    setUser:  React.Dispatch<React.SetStateAction<IUser | null>>;
}

export const userContext = createContext<UserContextType>({
     user:null,
     setUser: () => {}
});