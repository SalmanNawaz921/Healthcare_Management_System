import { hmsApi } from "../hmsApi";
export const adminApi = hmsApi.injectEndpoints({
  endpoints: (builder) => ({
    getHospital: builder.query({
      query: (authToken) => ({
        url: "/mainadmin/getHospital",
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),

    getAdminDetails: builder.query({
      query: (params) => ({
        url: `/mainadmin/getDetails`,
        method: "GET",
        headers: {
          "auth-token": `${params.authToken}`,
        },
      }),
    }),

    getAllEarnings: builder.query({
      query: (authToken) => ({
        url: "/mainadmin/getAllEarnings",
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),
    getAllEarningsMonthly: builder.query({
      query: (authToken) => ({
        url: "/mainadmin/getAllEarningsMonthly",
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),
    getAllDoctors: builder.query({
      query: (authToken) => ({
        url: "/mainadmin/doctorlist",
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),
    getMainAdminDoctors: builder.query({
      query: (authToken) => ({
        url: "/mainadmin/doctorMainAdmin",
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),
    getAllAdmins: builder.query({
      query: (authToken) => ({
        url: "/mainadmin/viewAllAdmins",
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),
    getPatientsMainAdmin: builder.query({
      query: (params) => ({
        url: `/mainadmin/patientsMainAdmin/${params.id}`,
        method: "GET",
        headers: {
          "auth-token": `${params.authToken}`,
        },
      }),
    }),
  }),
});

export const {
  useGetAdminDetailsQuery,
  useGetAllEarningsQuery,
  useGetHospitalQuery,
  useGetAllDoctorsQuery,
  useGetAllEarningsMonthlyQuery,
  useGetMainAdminDoctorsQuery,
  useGetAllAdminsQuery,
  useGetPatientsMainAdminQuery
} = adminApi;
