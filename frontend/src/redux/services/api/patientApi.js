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

      getPatientAllAppointments:builder.query({
        query: (authToken) => ({
          url: `/patient/appointments`,
          method: "GET",
          headers: {
            "auth-token": `${authToken}`,
          },
        }),
      
      }),

      getAllPrescriptionsPatient:builder.query({
        query: (authToken) => ({
          url: `/patient/prescriptions`,
          method: "GET",
          headers: {
            "auth-token": `${authToken}`,
          },
        }),
      
      }),
      getAllInvoicesPatient:builder.query({
        query: (authToken) => ({
          url: `/patient/invoices`,
          method: "GET",
          headers: {
            "auth-token": `${authToken}`,
          },
        }),
      
      }),
      getAllDoctorsByHospital:builder.query({
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
      })

  }),
});

export const {
 useGetPatientQuery,
 useEditPatientDetailsMutation,
  useGetPatientAllAppointmentsQuery,
  useGetAllPrescriptionsPatientQuery,
  useGetAllInvoicesPatientQuery,
  useGetAllDoctorsByHospitalQuery,
  usePayInvoiceMutation
} = patientApi;
