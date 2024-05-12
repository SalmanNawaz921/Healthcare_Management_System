import { hmsApi } from "../hmsApi";
export const hospitalApi = hmsApi.injectEndpoints({
  endpoints: (builder) => ({
    getHospitals: builder.query({
      query: (authToken) => ({
        url: "/mainadmin/hospitals",
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),

    addHospital: builder.mutation({
      query: (params) => ({
        url: "/mainadmin/addHospital",
        method: "POST",
        headers: {
          "auth-token": `${params.authToken}`,
        },
        body: params.credentials,
      }),
    }),

    editHospital: builder.mutation({
      query: (params) => ({
        url: "/mainadmin/editHospital",
        method: "PUT",
        headers: {
          "auth-token": `${params.authToken}`,
        },
        body: params.credentials,
      }),
    }),
    deleteHospital: builder.mutation({
      query: (params) => ({
        url: `/mainadmin/deleteHospital/${params.hospitalId}`,
        method: "DELETE",
        headers: {
          "auth-token": `${params.authToken}`,
        },
        body: params.credentials,
      }),
    }),

    viewHospitals: builder.query({
      query: () => "mainadmin/viewAllHospitals",
    }),
    viewHospital: builder.query({
      query: (params) => ({
        url: `/mainadmin/viewHospital/${params.id}`,
        method: "GET",
        headers: {
          "auth-token": `${params.authToken}`,
        },
      }),
    }),
  }),
});

export const {
  useGetHospitalsQuery,
  useAddHospitalMutation,
  useEditHospitalMutation,
  useDeleteHospitalMutation,
  useViewHospitalsQuery,
  useViewHospitalQuery,
} = hospitalApi;
