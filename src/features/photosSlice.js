import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const ACCESS_KEY = '9-jcwaFRSJJp2qeKCX0JBdveNxpFL_mEn-0z2IilnqM';

export const fetchPhotos = createAsyncThunk(
  'photos/fetchPhotos',
  async ({ query, page }) => {
    const endpoint = query
      ? `https://api.unsplash.com/search/photos?page=${page}&query=${query}&per_page=30&client_id=${ACCESS_KEY}`
      : `https://api.unsplash.com/photos?page=${page}&per_page=30&client_id=${ACCESS_KEY}`;

    const res = await fetch(endpoint);
    const data = await res.json();

    return query
    ? {
      results: data.results,
      totalPages: Math.min(data.total_pages, 10) // 👈 Máximo 10 páginas
    }
  : {
      results: data,
      totalPages: 10
    };
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
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.photos = action.payload.results;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setQuery, setPage } = photosSlice.actions;
export default photosSlice.reducer;