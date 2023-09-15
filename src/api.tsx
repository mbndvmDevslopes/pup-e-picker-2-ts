import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

const getAllDogs = () =>
  fetch(`${baseUrl}/dogs`).then((response) => {
    return response.json();
  });

const postDog = (dog: Omit<Dog, "id">) => {
  return fetch(`${baseUrl}/dogs`, {
    method: "POST",
    body: JSON.stringify(dog),
    headers: {
      "Content-type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
};
const deleteDogRequest = (id: number) => {
  return fetch(`${baseUrl}/dogs/${id}`, { method: "DELETE" });
};

const patchFavoriteForDog = (id: number, isFav: boolean) => {
  return fetch(`${baseUrl}/dogs/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      isFavorite: isFav,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
