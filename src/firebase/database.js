import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "./usuarios"; 

const ecApi = createApi ({
    reducerPath: "ecApi",
    baseQuery: fetchBaseQuery({
        baseUrl: base_url,
    }),
    endpoints: (builder) => ({
        getUsuarios: builder.query({
            query: () => "usuarios.json",
        }),
    }),

});

export const { useGetUsuairiosQuery } = ecApi;
