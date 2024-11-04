import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api",
});

export const registerUser = (data) => api.post("/users/register", data);
export const loginUser = (data) => api.post("/users/login", data);
export const getAllUsers = () => api.get("/users");
export const getUserLocations = (id) => api.get(`/users/${id}/locations`);
export const addLocation = (id, data, token) =>
    api.post(`/users/${id}/locations`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
export const updateLocation = (id, locationId, data, token) =>
    api.put(`/users/${id}/locations/${locationId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
export const deleteLocation = (id, locationId, token) =>
    api.delete(`/users/${id}/locations/${locationId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
