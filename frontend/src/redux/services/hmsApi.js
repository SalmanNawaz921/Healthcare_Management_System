import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const HOST = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
export const hmsApi = createApi({
  reducerPath: "hmsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: HOST,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  endpoints: () => ({}),
});

// export const {} = hmsApi;
