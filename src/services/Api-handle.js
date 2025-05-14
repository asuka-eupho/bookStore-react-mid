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
export const logoutAPI = () => {
    return instance.post("/api/v1/auth/logout");
}
export const FetchAndFilterUser = (query) => {
    return instance.get(`/api/v1/user?${query}`);
}
export const createUserAPI = (fullName, email, password, phone, role) => {
    return instance.post("/api/v1/user", { fullName, email, password, phone, role });
}
export const createBulkUserAPI = (data) => {
    return instance.post("/api/v1/user/bulk-create", data);
}

export const callUpdateUser = (_id, fullName, phone) => {
    return instance.put('/api/v1/user', { _id, fullName, phone })
}
export const callDeleteUser = (id) => {
    return instance.delete(`/api/v1/user/${id}`)
}
// ========================= book API ==========================
export const FetchAndFilterBook = (query) => {
    return instance.get(`/api/v1/book?${query}`);
}
export const DeleteBookAPI = (id) => {
    return instance.delete(`/api/v1/book/${id}`);
}
