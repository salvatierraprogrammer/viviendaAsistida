// homeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { vivienda } from "../../data/vivienda"; // Rename vivienda to viviendaData

const homeSlice = createSlice({
  name: "homeScreen",
  initialState: {
    allVivienda: vivienda, // Use viviendaData instead of vivienda
  },
  reducers: {},
});

export default homeSlice.reducer;