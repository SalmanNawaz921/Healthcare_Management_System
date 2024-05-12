import { hmsApi } from "../hmsApi";
export const hospitalAdminApi = hmsApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch Hospital Admin Details

    getHospitalAdminDetails: builder.query({
      query: (authToken) => ({
        url: `/hospitaladmin/getDetails`,
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),

    // Patient For Admin

    getAllPatientsAdmin: builder.query({
      query: (authToken) => ({
        url: "/hospitaladmin/viewPatients",
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),

    // Popular Doctors For Admin Dashboard

    getPopularDoctors: builder.query({
      query: (authToken) => ({
        url: "/hospitaladmin/viewPopularDoctors",
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),

    // Get Unassigned Doctors

    getUnassignedDoctors: builder.query({
      query: (authToken) => ({
        url: "/hospitaladmin/viewUnassignedDoctors",
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),

    // Assign a particular doctor to department

    assignDoctor: builder.mutation({
      query: (params) => ({
        url: "/hospitaladmin/assignDoctor",
        method: "POST",
        headers: {
          "auth-token": `${params.authToken}`,
        },
        body: params.credentials,
      }),
    }),

    // Get Hospital Earnings

    getHospitalEarnings: builder.query({
      query: (authToken) => ({
        url: "/hospitaladmin/viewHospitalEarnings",
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),
    getDepartments: builder.query({
      query: (params) => ({
        url: `/hospitaladmin/viewDepartments/${params.id}`,
        method: "GET",
        headers: {
          "auth-token": `${params.authToken}`,
        },
      }),
    }),
    getInvoices: builder.query({
      query: (authToken) => ({
        url: "/hospitaladmin/viewInvoices",
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),
    getDoctors: builder.query({
      query: (authToken) => ({
        url: "/hospitaladmin/viewDoctors",
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),
    getPrescriptions: builder.query({
      query: (authToken) => ({
        url: "/hospitaladmin/viewPrescriptions",
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),
    getDepartmentEarnings: builder.query({
      query: (authToken) => ({
        url: "/hospitaladmin/viewDepartmentEarnings",
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),
    getDoctorsEarnings: builder.query({
      query: (authToken) => ({
        url: "/hospitaladmin/viewDoctorsEarnings",
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),
    deleteInvoice: builder.mutation({
      query: ({id,authToken}) => ({
        url: `/hospitaladmin/deleteInvoice/${id}`,
        method: "DELETE",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),
    deleteDoctor: builder.mutation({
      query: ({id,authToken}) => ({
        url: `/hospitaladmin/deleteDoctor/${id}`,
        method: "DELETE",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),
    deletePatient: builder.mutation({
      query: ({id,authToken}) => ({
        url: `/hospitaladmin/deletePatient/${id}`,
        method: "DELETE",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),
  }),
});

export const {
  useGetHospitalAdminDetailsQuery,
  useGetAllPatientsAdminQuery,
  useGetPopularDoctorsQuery,
  useGetUnassignedDoctorsQuery,
  useAssignDoctorMutation,
  useGetHospitalEarningsQuery,
  useGetDepartmentsQuery,
  useGetInvoicesQuery,
  useGetDoctorsQuery,
  useGetPrescriptionsQuery,
  useGetDepartmentEarningsQuery,
  useGetDoctorsEarningsQuery,
  useDeleteInvoiceMutation,
  useDeleteDoctorMutation,
  useDeletePatientMutation
} = hospitalAdminApi;
