import { configureStore } from '@reduxjs/toolkit';
import photosReducer from '../features/photosSlice';

const store = configureStore({
    reducer: {
        photos: photosReducer,
    },
});

export default store;