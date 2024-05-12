import { hmsApi } from "../hmsApi";

export const authApi = hmsApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `/auth/login/${credentials.role}`,
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    editPersonalDetails: builder.mutation({
      query: (params) => ({
        url: `/edit/personalDetails/${params.id}`,
        method: "PUT",
        body: params.credentials,
      }),
    }),
    editUserDetails: builder.mutation({
      query: (params) => ({
        url: `/edit/userDetails/${params.id}`,
        method: "PUT",
        body: params.credentials,
      }),
    }),
    overrideExisting: false,
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useEditUserDetailsMutation,
  useEditPersonalDetailsMutation,
} = authApi;
