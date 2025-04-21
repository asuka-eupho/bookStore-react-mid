import axios from "axios"

export const RegisterAPI = (fullName, email, password, phone) => {
    return axios.post("/api/v1/user/register", { fullName, email, password, phone });
}