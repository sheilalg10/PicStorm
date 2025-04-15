import { configureStore } from '@reduxjs/toolkit';
import photosReducer from '../features/photosSlice';
import favoritesReducer from '../features/favoritesSlice';

const store = configureStore({
    reducer: {
        photos: photosReducer,
        favorites: favoritesReducer,
    },
});

export default store;