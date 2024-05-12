import { hmsApi } from "../hmsApi";

export const appointmentApi = hmsApi.injectEndpoints({
  endpoints: (builder) => ({
    // Appointment CRUD

    addAppointment: builder.mutation({
      query: (params) => ({
        url: "/patient/bookAppointment",
        method: "POST",
        headers: {
          "auth-token": `${params.authToken}`,
        },
        body: params.credentials,
      }),
    }),
    editAppointment: builder.mutation({
      query: (params) => ({
        url: `/hospitaladmin/editAppointment/${params.appointmentId}`,
        method: "PUT",
        headers: {
          "auth-token": `${params.authToken}`,
        },
        body: params.credentials,
      }),
    }),
    deleteAppointment: builder.mutation({
      query: (params) => ({
        url: `/hospitaladmin/deleteAppointment/${params.appointmentId}`,
        method: "DELETE",
        headers: {
          "auth-token": `${params.authToken}`,
        },
      }),
    }),

    getAppointments: builder.query({
      query: (authToken) => ({
        url: "/hospitaladmin/viewAppointments",
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),
  }),
});

export const {
  // // useLoginMutation,
  // useRegisterMutation,

  useAddAppointmentMutation,
  useEditAppointmentMutation,
  useDeleteAppointmentMutation,
  useGetAppointmentsQuery,
} = appointmentApi;
