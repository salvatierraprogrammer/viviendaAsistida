// homeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { vivienda } from "../../data/vivienda"; // Rename vivienda to viviendaData
import { useGetViviendaQuery } from "../../services/ecApi";



const homeSlice = createSlice({

  name: "homeScreen",
  initialState: {
    allVivienda: vivienda, // Use viviendaData instead of vivienda
  },
  reducers: {},
});

export default homeSlice.reducer;