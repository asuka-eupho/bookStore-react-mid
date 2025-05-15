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
export const fetchBookCategory = () => {
    return instance.get("/api/v1/database/category");
}
export const callUploadBookImg = (fileImg) => {
    const bodyFormData = new FormData();
    bodyFormData.append('fileImg', fileImg);
    return instance({
        method: 'post',
        url: '/api/v1/file/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "book"
        },
    });
}
export const callCreateBookAPI = (thumbnail, slider, mainText, author, price, sold, quantity, category) => {
    return instance.post('/api/v1/book', { thumbnail, slider, mainText, author, price, sold, quantity, category })
}
export const callUpdateBookAPI = (thumbnail, slider, mainText, author, price, sold, quantity, category, _id) => {
    return instance.put(`/api/v1/book/${_id}`, { thumbnail, slider, mainText, author, price, sold, quantity, category, _id })
}
export const callDeleteBookAPI = (_id) => {
    return instance.delete(`/api/v1/book/${_id}`);
}