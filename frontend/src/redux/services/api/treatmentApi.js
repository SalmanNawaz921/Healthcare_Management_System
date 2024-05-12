import { hmsApi } from "../hmsApi";
export const treatmentApi = hmsApi.injectEndpoints({
  endpoints: (builder) => ({
    // Treatment CRUD

    addTreatment: builder.mutation({
      query: (params) => ({
        url: "/hospitaladmin/addTreatment",
        method: "POST",
        headers: {
          "auth-token": `${params.authToken}`,
        },
        body: params.credentials,
      }),
    }),
    editTreatment: builder.mutation({
      query: (params) => ({
        url: `/hospitaladmin/editTreatment/${params.treatmentId}`,
        method: "PUT",
        headers: {
          "auth-token": `${params.authToken}`,
        },
        body: params.credentials,
      }),
    }),
    deleteTreatment: builder.mutation({
      query: (params) => ({
        url: `/hospitaladmin/deleteTreatment/${params.treatmentId}`,
        method: "DELETE",
        headers: {
          "auth-token": `${params.authToken}`,
        },
      }),
    }),

    getTreatments: builder.query({
      query: (authToken) => ({
        url: "/hospitaladmin/viewTreatments",
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),
  }),
});

export const {
  useAddTreatmentMutation,
  useEditTreatmentMutation,
  useDeleteTreatmentMutation,
  useGetTreatmentsQuery,
} = treatmentApi;
