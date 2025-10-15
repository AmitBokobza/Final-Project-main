import axios from "axios";
import User from "../interfaces/User";

const API:string = import.meta.env.VITE_API_USERS;

// register user

export const registerUser = async (user: User) => {
    try {
        const response = await axios.post(API, user)
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const loginUser = async (user : any) => {
    try {
        const response = await axios.post(`${API}/login`, user)
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getUserById = async (id: string, token:string) => {
    try {
        const response = await axios.get(`${API}/${id}` , {
            headers: {  
                "token": token
            }
        })
        return response;
    } catch (error) {
        console.log(error);
        
    }
}

export const updateUser = async (id:string, user:User, token:string) => {
    try {
        const response = await axios.put(`${API}/${id}`, user, {
            headers: {
                "token": token
            }
        })
        return response;
    } catch (error) {
        console.log(error);
        
    }
}

export const getAllUsers = async (token:string) => {
    try {
        const response = await axios.get(API, {
            headers: {
                "token" : token
            }
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = async (id:string, token:string) => {
    try {
        const response = await axios.delete(`${API}/${id}`, {
            headers: {
                "token" : token
            }
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}