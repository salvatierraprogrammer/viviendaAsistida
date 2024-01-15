import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { base_url } from "../firebase/usuarios";
import { useMutation } from "react-query";

// Configuración de la API
export const ecApi = createApi({
  reducerPath: "ecApi",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
  }),
  endpoints: (builder) => ({
    // Consulta de usuarios
    getUsuarios: builder.query({
      query: () => "usuarios.json",
    }),

    // Consulta de imágenes
    getImage: builder.query({
      query: () => "image.json",
    }),

    // Consulta de vivienda
    getVivienda: builder.query({
      query: () => "vivienda.json",
    }),

    // Envío de imágenes a la base de datos
    putImage: builder.mutation({
      query: (image) => ({
        url: "image.json",
        method: "PUT",
        body: image,
      }),
    }),

    // Guardar registro de asistencia en Firebase Realtime Database
    saveAssistance: builder.mutation({
      query: (saveAssistance) => ({
        url: 'asistencias.json',
        method: 'POST',
        body: saveAssistance,
      }),
    }),
  }),
});

// Exportaciones de consultas y mutaciones para ser utilizadas en componentes
export const {
  useGetUsuariosQuery,
  useGetImageQuery,
  usePutImageMutation,
  useGetViviendaQuery,
  useSaveAssistanceMutation, // Agrega la nueva mutación
} = ecApi;