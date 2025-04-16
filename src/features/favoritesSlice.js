// features/favoritesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const storedFavorites = localStorage.getItem("favorites");
const initialState = {
  items: storedFavorites ? JSON.parse(storedFavorites) : [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const exists = state.items.some(
        (photo) => photo.id === action.payload.id
      );

      if (!exists) {
        const newPhoto = {
          ...action.payload,
          dateAdded: new Date().toISOString(),
        };

        state.items.push(newPhoto);
        localStorage.setItem("favorites", JSON.stringify(state.items));
      }
    },
    removeFromFavorites: (state, action) => {
      state.items = state.items.filter((photo) => photo.id !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
    updateDescription: (state, action) => {
      const { id, newDescription } = action.payload;
      const favorite = state.items.find((photo) => photo.id === id);
      if (favorite) {
        favorite.description = newDescription; // Actualiza la descripción
        localStorage.setItem("favorites", JSON.stringify(state.items)); // Actualiza localStorage
      }
    },
  },
});

export const { addToFavorites, removeFromFavorites, updateDescription } = favoritesSlice.actions;
export default favoritesSlice.reducer;
