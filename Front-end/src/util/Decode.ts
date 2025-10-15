import { jwtDecode } from "jwt-decode"


const decodeUser = (token: any) => {
    return jwtDecode(token)
}

export default decodeUser;