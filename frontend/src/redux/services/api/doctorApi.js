import { hmsApi } from "../hmsApi";
export const doctorApi = hmsApi.injectEndpoints({
  endpoints: (builder) => ({
    getDoctorVisits: builder.query({
      query: (authToken) => ({
        url: "/doctor/viewVisits",
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),
    getAllPatients: builder.query({
      query: (authToken) => ({
        url: "/doctor/patientlist",
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),
    getTreatmentsByDepartment: builder.query({
      query: (authToken) => ({
        url: "/doctor/treatmentlist",
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),

    getDoctorDetails: builder.query({
      query: (params) => ({
        url: `/doctor/getDetails/${params.id}`,
        method: "GET",
        headers: {
          "auth-token": `${params.authToken}`,
        },
      }),
    }),

    editDoctorDetails: builder.mutation({
      query: (params) => ({
        url: "/doctor/editDetails",
        method: "PUT",
        headers: {
          "auth-token": `${params.authToken}`,
        },
        body: params.credentials,
      }),
    }),
    getAppointmentsDoctor: builder.query({
      query: (authToken) => ({
        url: "/doctor/getAppointmentsDoctor",
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),
    getPatientSymptoms: builder.query({
      query: (params) => ({
        url: `/patient/getPatientSymptoms/${params.id}`,
        method: "GET",
        headers: {
          "auth-token": `${params.authToken}`,
        },
      }),
    })
  }),
});

export const {
  useGetAllPatientsQuery,
  useGetTreatmentsByDepartmentQuery,
  useGetDoctorDetailsQuery,
  useEditDoctorDetailsMutation,
  useGetDoctorVisitsQuery,
  useGetAppointmentsDoctorQuery,
  useGetPatientSymptomsQuery
} = hmsApi;
