import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPhotos = createAsyncThunk(
    fetchPhotos,
    async ({query, page}) =>{
        const endppoint = query ? `https://api.unsplash.com/search/photos?page=${page}&query=${query}` : `https://api.unsplash.com/photos?page=${page}`;

        const res = await fetch(endppoint);
        const data = await res.json();
        return query ? { results: data.results, totalPages: data.total_pages } : { results: data, totalPages: 10 }
    }
);

const photosSlice = createSlice({
    name: 'photos',
    initialState: {
        photos: [],
        query: '',
        page: 1,
        totalPages: 10,
        status: 'idle',
        error: null,
    },
    reducers: {
        setQuery: (state, action) =>{
            state.query = action.payload;
        },
        setPage: (state, action) =>{
            state.page = action.payload
        },
    }
});

export const { setQuery, setPage} = photosSlice.actions;
export default photosSlice.reducer;