// // import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// // const HOST = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
// // export const hmsApi = createApi({
// //   reducerPath: "hmsApi",
// //   baseQuery: fetchBaseQuery({
// //     baseUrl: HOST,
// //     prepareHeaders: (headers) => {
// //       headers.set("Content-Type", "application/json");
// //       return headers;
// //     },
// //   }),

// //   endpoints: (builder) => ({}),
// // });

// // // export const {} = hmsApi;

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// // import { authApi, login } from "./api/authApi";
// const HOST = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
// export const hmsApi = createApi({
//   reducerPath: "hmsApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: HOST,
//     prepareHeaders: (headers) => {
//       headers.set("Content-Type", "application/json");
//       return headers;
//     },
//   }),

//   endpoints: (builder) => ({
//     // ...authApi,
//     editDoctorDetails: builder.mutation({
//       query: (params) => ({
//         url: "/doctor/editDetails",
//         method: "PUT",
//         headers: {
//           "auth-token": `${params.authToken}`,
//         },
//         body: params.credentials,
//       }),
//     }),
//     editPersonalDetails: builder.mutation({
//       query: (credentials) => ({
//         url: "/edit/personalDetails",
//         method: "PUT",
//         body: credentials,
//       }),
//     }),
//     editUserDetails: builder.mutation({
//       query: (params) => ({
//         url: `/edit/userDetails`,
//         method: "PUT",
//         headers: {
//           "auth-token": `${params.authToken}`,
//         },
//         body: params.credentials,
//       }),
//     }),

//     getAllDoctors: builder.query({
//       query: (authToken) => ({
//         url: "/mainadmin/doctorlist",
//         method: "GET",
//         headers: {
//           "auth-token": `${authToken}`,
//         },
//       }),
//     }),
//     getHospitals: builder.query({
//       query: (authToken) => ({
//         url: "/mainadmin/hospitals",
//         method: "GET",
//         headers: {
//           "auth-token": `${authToken}`,
//         },
//       }),
//     }),
//     getHospital: builder.query({
//       query: (authToken) => ({
//         url: "/mainadmin/getHospital",
//         method: "GET",
//         headers: {
//           "auth-token": `${authToken}`,
//         },
//       }),
//     }),

//     addHospital: builder.mutation({
//       query: (params) => ({
//         url: "/mainadmin/addHospital",
//         method: "POST",
//         headers: {
//           "auth-token": `${params.authToken}`,
//         },
//         body: params.credentials,
//       }),
//     }),

//     editHospital: builder.mutation({
//       query: (params) => ({
//         url: "/mainadmin/editHospital",
//         method: "PUT",
//         headers: {
//           "auth-token": `${params.authToken}`,
//         },
//         body: params.credentials,
//       }),
//     }),
//     deleteHospital: builder.mutation({
//       query: (params) => ({
//         url: `/mainadmin/deleteHospital/${params.hospitalId}`,
//         method: "DELETE",
//         headers: {
//           "auth-token": `${params.authToken}`,
//         },
//         body: params.credentials,
//       }),
//     }),

//     addDepartment: builder.mutation({
//       query: (params) => ({
//         url: "/hospitaladmin/addDepartment",
//         method: "POST",
//         headers: {
//           "auth-token": `${params.authToken}`,
//         },
//         body: params.credentials,
//       }),
//     }),
//     editDepartment: builder.mutation({
//       query: (params) => ({
//         url: `/hospitaladmin/editDepartment/${params.departmentId}`,
//         method: "PUT",
//         headers: {
//           "auth-token": `${params.authToken}`,
//         },
//         body: params.credentials,
//       }),
//     }),
//     deleteDepartment: builder.mutation({
//       query: (params) => ({
//         url: `/hospitaladmin/deleteDepartment/${params.departmentId}`,
//         method: "DELETE",
//         headers: {
//           "auth-token": `${params.authToken}`,
//         },
//       }),
//     }),
//     getDepartments: builder.query({
//       query: (authToken) => ({
//         url: "/hospitaladmin/viewDepartments",
//         method: "GET",
//         headers: {
//           "auth-token": `${authToken}`,
//         },
//       }),
//     }),
//     getDoctorVisits: builder.query({
//       query: (authToken) => ({
//         url: "/doctor/viewVisits",
//         method: "GET",
//         headers: {
//           "auth-token": `${authToken}`,
//         },
//       }),
//     }),
//     getAllPatients: builder.query({
//       query: (authToken) => ({
//         url: "/doctor/patientlist",
//         method: "GET",
//         headers: {
//           "auth-token": `${authToken}`,
//         },
//       }),
//     }),
//     getTreatmentsByDepartment: builder.query({
//       query: (authToken) => ({
//         url: "/doctor/treatmentlist",
//         method: "GET",
//         headers: {
//           "auth-token": `${authToken}`,
//         },
//       }),
//     }),
//     getDoctors: builder.query({
//       query: () => ({
//         url: "/doctors",
//         method: "GET",
//       }),
//     }),
//     getDoctorDetails: builder.query({
//       query: (authToken) => ({
//         url: "/doctor/getDetails",
//         method: "GET",
//         headers: {
//           "auth-token": `${authToken}`,
//         },
//       }),
//     }),
//     getAdminDetails: builder.query({
//       query: (params) => ({
//         url: `/mainadmin/getDetails`,
//         method: "GET",
//         headers: {
//           "auth-token": `${params.authToken}`,
//         },
//       }),
//     }),
//     getHospitalAdminDetails: builder.query({
//       query: (authToken) => ({
//         url: `/hospitaladmin/getDetails`,
//         method: "GET",
//         headers: {
//           "auth-token": `${authToken}`,
//         },
//       }),
//     }),

//     addMedicine: builder.mutation({
//       query: (params) => ({
//         url: "/hospitaladmin/addMedicine",
//         method: "POST",
//         headers: {
//           "auth-token": `${params.authToken}`,
//         },
//         body: params.credentials,
//       }),
//     }),

//     // Medicine CRUD

//     editMedicine: builder.mutation({
//       query: (params) => ({
//         url: `/hospitaladmin/editMedicine/${params.medicineId}`,
//         method: "PUT",
//         headers: {
//           "auth-token": `${params.authToken}`,
//         },
//         body: params.credentials,
//       }),
//     }),
//     deleteMedicine: builder.mutation({
//       query: (params) => ({
//         url: `/hospitaladmin/deleteMedicine/${params.medicineId}`,
//         method: "DELETE",
//         headers: {
//           "auth-token": `${params.authToken}`,
//         },
//       }),
//     }),

//     getMedicines: builder.query({
//       query: (authToken) => ({
//         url: "/hospitaladmin/viewMedicines",
//         method: "GET",
//         headers: {
//           "auth-token": `${authToken}`,
//         },
//       }),
//     }),

//     // Appointment CRUD

//     addAppointment: builder.mutation({
//       query: (params) => ({
//         url: "/hospitaladmin/addAppointment",
//         method: "POST",
//         headers: {
//           "auth-token": `${params.authToken}`,
//         },
//         body: params.credentials,
//       }),
//     }),
//     editAppointment: builder.mutation({
//       query: (params) => ({
//         url: `/hospitaladmin/editAppointment/${params.appointmentId}`,
//         method: "PUT",
//         headers: {
//           "auth-token": `${params.authToken}`,
//         },
//         body: params.credentials,
//       }),
//     }),
//     deleteAppointment: builder.mutation({
//       query: (params) => ({
//         url: `/hospitaladmin/deleteAppointment/${params.appointmentId}`,
//         method: "DELETE",
//         headers: {
//           "auth-token": `${params.authToken}`,
//         },
//       }),
//     }),

//     getAppointments: builder.query({
//       query: (authToken) => ({
//         url: "/hospitaladmin/viewAppointments",
//         method: "GET",
//         headers: {
//           "auth-token": `${authToken}`,
//         },
//       }),
//     }),

//     // Treatment CRUD

//     addTreatment: builder.mutation({
//       query: (params) => ({
//         url: "/hospitaladmin/addTreatment",
//         method: "POST",
//         headers: {
//           "auth-token": `${params.authToken}`,
//         },
//         body: params.credentials,
//       }),
//     }),
//     editTreatment: builder.mutation({
//       query: (params) => ({
//         url: `/hospitaladmin/editTreatment/${params.treatmentId}`,
//         method: "PUT",
//         headers: {
//           "auth-token": `${params.authToken}`,
//         },
//         body: params.credentials,
//       }),
//     }),
//     deleteTreatment: builder.mutation({
//       query: (params) => ({
//         url: `/hospitaladmin/deleteTreatment/${params.treatmentId}`,
//         method: "DELETE",
//         headers: {
//           "auth-token": `${params.authToken}`,
//         },
//       }),
//     }),

//     getTreatments: builder.query({
//       query: (authToken) => ({
//         url: "/hospitaladmin/viewTreatments",
//         method: "GET",
//         headers: {
//           "auth-token": `${authToken}`,
//         },
//       }),
//     }),

//     // Patient

//     getAllPatientsAdmin: builder.query({
//       query: (authToken) => ({
//         url: "/hospitaladmin/viewPatients",
//         method: "GET",
//         headers: {
//           "auth-token": `${authToken}`,
//         },
//       }),
//     }),

//     // Doctor

//     getPopularDoctors: builder.query({
//       query: (authToken) => ({
//         url: "/hospitaladmin/viewPopularDoctors",
//         method: "GET",
//         headers: {
//           "auth-token": `${authToken}`,
//         },
//       }),
//     }),

//     getUnassignedDoctors: builder.query({
//       query: (authToken) => ({
//         url: "/hospitaladmin/viewUnassignedDoctors",
//         method: "GET",
//         headers: {
//           "auth-token": `${authToken}`,
//         },
//       }),
//     }),

//     assignDoctor: builder.mutation({
//       query: (params) => ({
//         url: "/hospitaladmin/assignDoctor",
//         method: "POST",
//         headers: {
//           "auth-token": `${params.authToken}`,
//         },
//         body: params.credentials,
//       }),
//     }),

//     // Get Hospital Earnings

//     getHospitalEarnings: builder.query({
//       query: (authToken) => ({
//         url: "/hospitaladmin/viewHospitalEarnings",
//         method: "GET",
//         headers: {
//           "auth-token": `${authToken}`,
//         },
//       }),
//     }),
//     getAllEarnings: builder.query({
//       query: (authToken) => ({
//         url: "/mainadmin/getAllEarnings",
//         method: "GET",
//         headers: {
//           "auth-token": `${authToken}`,
//         },
//       }),
//     }),
//   }),
// });

// export const {
//   // // useLoginMutation,
//   // useRegisterMutation,

//   useGetAllDoctorsQuery,
//   useGetAllPatientsQuery,
//   useGetDoctorsQuery,
//   useGetTreatmentsByDepartmentQuery,
//   useGetDoctorDetailsQuery,
//   useEditPersonalDetailsMutation,
//   useEditDoctorDetailsMutation,
//   useGetDoctorVisitsQuery,
//   useGetHospitalsQuery,
//   useAddHospitalMutation,
//   useEditHospitalMutation,
//   useDeleteHospitalMutation,
//   useGetAdminDetailsQuery,
//   useEditUserDetailsMutation,
//   useGetHospitalAdminDetailsQuery,
//   useAddDepartmentMutation,
//   useEditDepartmentMutation,
//   useDeleteDepartmentMutation,
//   useGetDepartmentsQuery,
//   useAddMedicineMutation,
//   useEditMedicineMutation,
//   useDeleteMedicineMutation,
//   useGetMedicinesQuery,
//   useAddAppointmentMutation,
//   useEditAppointmentMutation,
//   useDeleteAppointmentMutation,
//   useGetAppointmentsQuery,
//   useAddTreatmentMutation,
//   useEditTreatmentMutation,
//   useDeleteTreatmentMutation,
//   useGetTreatmentsQuery,
//   useGetAllPatientsAdminQuery,
//   useGetPopularDoctorsQuery,
//   useGetUnassignedDoctorsQuery,
//   useAssignDoctorMutation,
//   useGetHospitalEarningsQuery,
//   useGetAllEarningsQuery,
// } = hmsApi;
