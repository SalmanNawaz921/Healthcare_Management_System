import { hmsApi } from "../hmsApi";
export const medicineApi = hmsApi.injectEndpoints({
  endpoints: (builder) => ({
    /* Medicine Endpoints */

    // Add Medicine

    addMedicine: builder.mutation({
      query: (params) => ({
        url: "/hospitaladmin/addMedicine",
        method: "POST",
        headers: {
          "auth-token": `${params.authToken}`,
        },
        body: params.credentials,
      }),
    }),

    // Edit Medicine

    editMedicine: builder.mutation({
      query: (params) => ({
        url: `/hospitaladmin/editMedicine/${params.id}`,
        method: "PUT",
        headers: {
          "auth-token": `${params.authToken}`,
        },
        body: params.credentials,
      }),
    }),

    // Delete Medicine

    deleteMedicine: builder.mutation({
      query: (params) => ({
        url: `/hospitaladmin/deleteMedicine/${params.medicineId}`,
        method: "DELETE",
        headers: {
          "auth-token": `${params.authToken}`,
        },
      }),
    }),

    // Fetch Medicines

    getMedicines: builder.query({
      query: (authToken) => ({
        url: "/hospitaladmin/viewMedicines",
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),
  }),
});

export const {
  useAddMedicineMutation,
  useEditMedicineMutation,
  useDeleteMedicineMutation,
  useGetMedicinesQuery,
} = medicineApi;
