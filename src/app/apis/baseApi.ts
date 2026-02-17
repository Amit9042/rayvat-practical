import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: async (headers) => {
        headers.set("Content-Type", "application/json")
        const accessToken = localStorage.getItem("accessToken")
        if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`)
        }
        return headers
    },
    credentials: "include"
})

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQuery,
    endpoints: () => ({}),
})