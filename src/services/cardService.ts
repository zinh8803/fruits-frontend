import type { CardModel } from "../types/model/card";
import api from "./api";

export const fetchCards = () => api.get("/admin/cards");
export const fetchCardById = (id: string) => api.get(`/cards/${id}`);
export const createCard = (data: CardModel) => api.post("/cards", data);
export const updateCard = (id: string, data: CardModel) =>
  api.put(`/cards/${id}`, data);
export const deleteCard = (id: string) => api.delete(`/cards/${id}`);
export const randomCard = () => api.get("/user/cards/random",
  {
    withCredentials: true,
  }
);
