import { useState } from "react";

import {
  useAddTreatmentMutation,
  useDeleteTreatmentMutation,
  useEditTreatmentMutation,
  useGetTreatmentsQuery,
} from "@/redux/services/api/treatmentApi";
import { message } from "antd";

export const useTreatmentCrud = (steps) => {
  const authToken = localStorage.getItem("Hospital Admintoken");
  const [
    addTreatment,
    { isSuccess: isAddSuccess, isLoading: isAddLoading, error: addingError },
  ] = useAddTreatmentMutation();
  const [
    editTreatment,
    { isSuccess: isEditSuccess, isLoading: isEditLoading, error: editingError },
  ] = useEditTreatmentMutation();
  const [
    deleteTreatment,
    {
      isSuccess: isdeleteSuccess,
      isLoading: isdeleteLoading,
      error: deletingError,
    },
  ] = useDeleteTreatmentMutation();
  const { data, isSuccess, isLoading, error } =
    useGetTreatmentsQuery(authToken);

  const add = async (formValues) => {
    try {
      const credentials = { ...formValues };
      let result;
      if (authToken) result = await addTreatment({ credentials, authToken });
      else throw new Error("User is not authenticated");
      if (isAddSuccess || !result.error) {
        message.success("Treatment added successfully");
        // setModalOpen(false);
      }
      return result;
    } catch (error) {
      console.log(error);
      message.error("Uncaught Error: Treatment not added");
    }
  };

  const edit = async (formValues, treatmentId) => {
    try {
      const credentials = { ...formValues };
      let result;
      if (authToken)
        result = await editTreatment({
          credentials,
          authToken,
          treatmentId,
        });
      else throw new Error("User is not authenticated");
      if (isEditSuccess || !result.error) {
        message.success("Treatment edited successfully");
        // setModalOpen(false);
      }
      return result;
    } catch (error) {
      console.log(error);
      message.error("Uncaught Error: Treatment not edited");
    }
  };

  const remove = async (id) => {
    let result;
    if (authToken && id) {
      try {
        result = await deleteTreatment({ treatmentId: id, authToken });
        if (isdeleteSuccess && !result.error) {
          message.success("Treatment Deleted Successfully");
        }
        return result?.data;
      } catch (error) {
        console.log(error);
        message.error("Error: Deleting Treatment");
      }
    }
  };

  return {
    add,
    edit,
    remove,
    data: data?.treatments,
    loading: isLoading || isAddLoading || isEditLoading || isdeleteLoading,
    error: error || addingError || editingError || deletingError,
  };
};
