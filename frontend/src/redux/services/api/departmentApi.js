import { hmsApi } from "../hmsApi";
export const departmentApi = hmsApi.injectEndpoints({
  endpoints: (builder) => ({
    /* Department Endpoints */

    // Add Department

    addDepartment: builder.mutation({
      query: (params) => ({
        url: "/hospitaladmin/addDepartment",
        method: "POST",
        headers: {
          "auth-token": `${params.authToken}`,
        },
        body: params.credentials,
      }),
    }),

    // Edit Department

    editDepartment: builder.mutation({
      query: (params) => ({
        url: `/hospitaladmin/editDepartment/${params.departmentId}`,
        method: "PUT",
        headers: {
          "auth-token": `${params.authToken}`,
        },
        body: params.credentials,
      }),
    }),

    // Delete Department

    deleteDepartment: builder.mutation({
      query: (params) => ({
        url: `/hospitaladmin/deleteDepartment/${params.departmentId}`,
        method: "DELETE",
        headers: {
          "auth-token": `${params.authToken}`,
        },
      }),
    }),

    // Fetch Departments

    getDepartments: builder.query({
      query: (authToken) => ({
        url: "/hospitaladmin/viewDepartments",
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),

    // Specific Department

    getDepartment: builder.query({
      query: (params) => ({
        url: `/hospitaladmin/getDepartment/${params.id}`,
        method: "GET",
        headers: {
          "auth-token": `${params.authToken}`,
        },
      }),
    }),

    // Doctors BY Department

    getDoctorsByDepartment: builder.query({
      query: (params) => ({
        url: `/hospitaladmin/getDoctorsByDepartment/${params.id}`,
        method: "GET",
        headers: {
          "auth-token": `${params.authToken}`,
        },
      }),
    }),

    // Treatments BY Department

    getTreatmentByDepartment: builder.query({
      query: (params) => ({
        url: `/hospitaladmin/getTreatmentsByDepartment/${params.id}`,
        method: "GET",
        headers: {
          "auth-token": `${params.authToken}`,
        },
      }),
    }),

    // Patients BY Department

    getPatientsByDepartment: builder.query({
      query: (params) => ({
        url: `/hospitaladmin/getPatientsByDepartment/${params.id}`,
        method: "GET",
        headers: {
          "auth-token": `${params.authToken}`,
        },
      }),
    }),
  }),
});

export const {
  useAddDepartmentMutation,
  useEditDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetDepartmentsQuery,
  useGetDepartmentQuery,
  useGetDoctorsByDepartmentQuery,
  useGetPatientsByDepartmentQuery,
  useGetTreatmentByDepartmentQuery
} = departmentApi;
