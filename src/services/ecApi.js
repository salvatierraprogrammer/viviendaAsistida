import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { base_url } from "../firebase/usuarios"; 


export const ecApi = createApi({
    reducerPath: "ecApi",
    baseQuery: fetchBaseQuery({
    baseUrl: base_url,
}),
    endpoints: (builder) => ({
    getUsuarios: builder.query({
        query: () => "usuarios.json",
    }),
        getImage: builder.query({
        query: () => "image.json",
      }),
      getVivienda: builder.query ({
        query:() => "vivienda.json",
      }),
  
      // ENVIA LA IMAGEN A LA BD
      putImage: builder.mutation({
        query: (image) => ({
          url: "image.json",
          method: "PUT",
          body: image,
        }),
  }),
   // Guardar en Firebase Realtime Database
    saveAssistance: builder.mutation({
      query: (assistanceData) => ({
        url: "asistencias.json", // Ajusta la ruta según tu estructura de base de datos
        method: "POST",
        body: assistanceData,
      }),
    }),
  }),
});

export const {
  useGetUsuariosQuery,
  useGetImageQuery,
  usePutImageMutation,
  useGetViviendaQuery,
  useSaveAssistanceMutation, // Agrega la nueva mutación
} = ecApi;