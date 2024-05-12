import { hmsApi } from "../hmsApi";

export const prescriptionApi = hmsApi.injectEndpoints({
  endpoints: (builder) => ({
    viewPrescriptions: builder.query({
      query: (authToken) => ({
        url: `/doctor/prescriptions`,
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),
    addPrescription: builder.mutation({
      query: (params) => ({
        url: `/doctor/addPrescription`,
        method: "POST",
        headers: {
          "auth-token": `${params.authToken}`,
        },
        body: params.credentials,
      }),
    }),
    editPrescription: builder.mutation({
      query: (params) => ({
        url: `/doctor/editPrescription/${params.prescriptionId}`,
        method: "PUT",
        headers: {
          "auth-token": `${params.authToken}`,
        },
        body: params.credentials,
      }),
    }),
    deletePrescription: builder.mutation({
      query: (params) => ({
        url: `/doctor/deletePrescription/${params.prescriptionId}`,
        method: "DELETE",
        headers: {
          "auth-token": `${params.authToken}`,
        },
        body: params.credentials,
      }),
    }),
  }),
});

export const {
  useViewPrescriptionsQuery,
  useAddPrescriptionMutation,
  useEditPrescriptionMutation,
  useDeletePrescriptionMutation,
} = prescriptionApi;
