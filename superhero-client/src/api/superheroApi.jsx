import axios from "axios";

const apiSuperhero = axios.create({
  baseURL: "/superheroes",
  headers: { "Content-Type": "application/json" },
});

const apiImage = axios.create({
  baseURL: "/images",
});

export const getSuperhero = (id) => apiSuperhero.get(`/${id}`);
export const getSuperheroes = (page) => apiSuperhero.get(`?page=${page}`);
export const createSuperhero = (data) => apiSuperhero.post("/", data);
export const updateSuperhero = (id, data) => apiSuperhero.put(`/${id}`, data);
export const deleteSuperhero = (id) => apiSuperhero.delete(`/${id}`);
export const uploadImages = (id, images) => {
  const formData = new FormData();
  images.forEach((image) => formData.append("images", image));
  return apiImage.post(`/${id}/images`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const removeImages = (id, images) =>
  apiImage.put(`/${id}/remove-images`, { images });
