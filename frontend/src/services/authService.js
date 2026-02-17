import axios from "../api/axiosInstance";

export const registerStudent = (data) => {
  return axios.post("/api/auth/student-register/", data);
};

export const loginStudent = (data) => {
  return axios.post("/api/auth/student-login/", data);
};

export const loginStaff = (data) => {
  return axios.post("/api/auth/staff-login/", data);
};
