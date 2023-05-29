import axios from "../utils/axios-customize";

export const callRegister = (fullName, email, password, phone) => {
  return axios.post("/api/v1/user/register", {
    fullName,
    email,
    password,
    phone,
  });
};

export const login = (username, password) => {
  return axios.post("/api/v1/auth/login", { username, password, delay: 1000 });
};

export const callLogout = () => {
  return axios.post("/api/v1/auth/logout");
};

export const getUser = () => {
  return axios.get("/api/v1/auth/account");
};

export const getAllUsers = (query) => {
  return axios.get(`/api/v1/user?${query}`);
};

export const createUserByAdmin = (fullName, email, password, phone) => {
  return axios.post("/api/v1/user/", { fullName, email, password, phone });
};

export const createUserBulk = (data) => {
  return axios.post("/api/v1/user/bulk-create", data);
};

export const updateUser = (_id, fullName, phone) => {
  return axios.put("/api/v1/user", { _id, fullName, phone });
};

export const deleteUserApi = (_id) => {
  return axios.delete(`/api/v1/user/${_id}`);
};

// book
export const getAllBook = (query) => {
  return axios.get(`/api/v1/book?${query}`);
};

export const callFetchCategory = () => {
  return axios.get(`/api/v1/database/category`);
};

export const callUploadBookImg = (fileImg) => {
  const bodyFormData = new FormData();

  bodyFormData.append("fileImg", fileImg);
  return axios({
    method: "post",
    url: "/api/v1/file/upload",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": "book",
    },
  });
};

export const createBook = (
  thumbnail, slider, mainText, author, price, sold, quantity, category
) => {
  return axios.post(
    "/api/v1/book/",
    {thumbnail, slider, mainText, author, price, sold, quantity, category}
  );
};
