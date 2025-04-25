import instance from "../utils/axios-customize"


export const RegisterAPI = (fullName, email, password, phone) => {
    return instance.post("/api/v1/user/register", { fullName, email, password, phone })
}
export const LoginAPI = (username, password) => {
    return instance.post("/api/v1/auth/login", { username, password });
}
export const fetchUserAPI = () => {
    return instance.get("/api/v1/auth/account");
}