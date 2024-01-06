import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./slice/homeSlice";
import { ecApi } from "../services/ecApi";
import authSlice from "./slice/authSlice"; // Corregir la importación aquí

export const store = configureStore({
  reducer: {
    homeSlice,
    [ecApi.reducerPath]: ecApi.reducer,
    authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ecApi.middleware),
});