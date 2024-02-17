import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const MAX_ENTRIES = 20;

const bookSlice = createSlice({
  name: "book",
  initialState: {
    data: [],
    precision: "P0",
  },
  reducers: {
    addBook: (state, action) => {
      state.data = [action.payload, ...state.data.slice(0, MAX_ENTRIES - 1)];
    },
    setPrecision: (state, action) => {
      state.precision = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    books: bookSlice.reducer,
  },
});

export const { addBook, setPrecision } = bookSlice.actions;
