import { hmsApi } from "../hmsApi";
export const patientApi = hmsApi.injectEndpoints({
  endpoints: (builder) => ({
    getPatient: builder.query({
      query: (params) => ({
        url: `/patient/details/${params.id}/${params.role}`,
        method: "GET",
        headers: {
          "auth-token": `${params.authToken}`,
        },
      }),
    }),
    editPatientDetails: builder.mutation({
      query: (params) => ({
        url: "/patient/editDetails",
        method: "PUT",
        headers: {
          "auth-token": `${params.authToken}`,
        },
        body: params.credentials,
      }),
    }),

    addSymptom: builder.mutation({
      query: (params) => ({
        url: `/patient/addSymptom`,
        method: "POST",
        headers: {
          "auth-token": `${params.authToken}`,
        },
        body: params.credentials,
      }),
    }),
    editSymptom: builder.mutation({
      query: (params) => ({
        url: `/patient/editSymptom/${params.id}`,
        method: "PUT",
        headers: {
          "auth-token": `${params.authToken}`,
        },
        body: params.credentials,
      }),
    }),
    deleteSymptom: builder.mutation({
      query: (params) => ({
        url: `/patient/deleteSymptom/${params.id}`,
        method: "DELETE",
        headers: {
          "auth-token": `${params.authToken}`,
        },
      }),
    }),

    getPatientAllAppointments: builder.query({
      query: (authToken) => ({
        url: `/patient/appointments`,
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),

    getAllPrescriptionsPatient: builder.query({
      query: (authToken) => ({
        url: `/patient/prescriptions`,
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),
    getAllInvoicesPatient: builder.query({
      query: (authToken) => ({
        url: `/patient/invoices`,
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),
    getAllDoctorsByHospital: builder.query({
      query: (params) => ({
        url: `/patient/doctorsByHospital/${params.id}`,
        method: "GET",
        headers: {
          "auth-token": `${params.authToken}`,
        },
      }),
    }),

    payInvoice: builder.mutation({
      query: (params) => ({
        url: `/patient/payInvoice/${params.id}`,
        method: "PUT",
        headers: {
          "auth-token": `${params.authToken}`,
        },
      }),
    }),
    getSymptoms: builder.query({
      query: (params) => ({
        url: `/patient/getPatientSymptoms`,
        method: "GET",
        headers: {
          "auth-token": `${params.authToken}`,
        },
      }),
    }),
  }),
});

export const {
  useGetPatientQuery,
  useEditPatientDetailsMutation,
  useGetPatientAllAppointmentsQuery,
  useGetAllPrescriptionsPatientQuery,
  useGetAllInvoicesPatientQuery,
  useGetAllDoctorsByHospitalQuery,
  usePayInvoiceMutation,
  useGetSymptomsQuery,
  useEditSymptomMutation,
  useAddSymptomMutation,
  useDeleteSymptomMutation
} = patientApi;
