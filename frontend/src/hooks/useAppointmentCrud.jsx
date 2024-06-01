import { useState } from "react";

import {
  useAddAppointmentMutation,
  useDeleteAppointmentMutation,
  useEditAppointmentMutation,
  useGetAppointmentsQuery,
} from "@/redux/services/api/appointmentApi";
import { message } from "antd";

export const useAppointmentCrud = (steps) => {
  const authToken = localStorage.getItem("Hospital Admintoken");
  const [
    addAppointment,
    { isSuccess: isAddSuccess, isLoading: isAddLoading, error: addingError },
  ] = useAddAppointmentMutation();
  const [
    editAppointment,
    { isSuccess: isEditSuccess, isLoading: isEditLoading, error: editingError },
  ] = useEditAppointmentMutation();
  const [
    deleteAppointment,
    {
      isSuccess: isdeleteSuccess,
      isLoading: isdeleteLoading,
      error: deletingError,
    },
  ] = useDeleteAppointmentMutation();
  const { data, isSuccess, isLoading, error } =
    useGetAppointmentsQuery(authToken);

  const add = async (formValues) => {
    try {
      const credentials = { ...formValues };
      let result;
      if (authToken) result = await addAppointment({ credentials, authToken });
      else throw new Error("User is not authenticated");
      if (isAddSuccess || !result.error) {
        message.success("Appointment added successfully");
        // setModalOpen(false);
      }
      return result;
    } catch (error) {
      message.error("Uncaught Error: Appointment not added");
    }
  };

  const edit = async (formValues, appointmentId) => {
    try {
      const credentials = { ...formValues };
      let result;
      if (authToken)
        result = await editAppointment({
          credentials,
          authToken,
          appointmentId,
        });
      else throw new Error("User is not authenticated");
      if (isEditSuccess || !result.error) {
        message.success("Appointment edited successfully");
      }
      return result;
    } catch (error) {
      message.error("Uncaught Error: Appointment not edited");
    }
  };

  const remove = async (id) => {
    let result;
    if (authToken && id) {
      try {
        result = await deleteAppointment({ appointmentId: id, authToken });
        if (isdeleteSuccess && !result.error) {
          message.success("Appointment Deleted Successfully");
        }
        return result?.data;
      } catch (error) {
        message.error("Error: Deleting Appointment");
      }
    }
  };

  return {
    add,
    edit,
    remove,
    data: data?.appointments,
    loading: isLoading || isAddLoading || isEditLoading || isdeleteLoading,
    error: error || addingError || editingError || deletingError,
  };
};
