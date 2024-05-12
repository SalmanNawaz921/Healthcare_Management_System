import { useState } from "react";

import {
  useAddMedicineMutation,
  useDeleteMedicineMutation,
  useEditMedicineMutation,
  useGetMedicinesQuery,
} from "@/redux/services/api/medicineApi";
import { message } from "antd";

export const useMedicineCrud = (steps) => {
  const authToken = localStorage.getItem("Hospital Admintoken");
  const [
    addMedicine,
    { isSuccess: isAddSuccess, isLoading: isAddLoading, error: addingError },
  ] = useAddMedicineMutation();
  const [
    editMedicine,
    { isSuccess: isEditSuccess, isLoading: isEditLoading, error: editingError },
  ] = useEditMedicineMutation();
  const [
    deleteMedicine,
    {
      isSuccess: isdeleteSuccess,
      isLoading: isdeleteLoading,
      error: deletingError,
    },
  ] = useDeleteMedicineMutation();
  const { data, isSuccess, isLoading, error } = useGetMedicinesQuery(authToken);

  const add = async (formValues) => {
    try {
      const credentials = { ...formValues };
      let result;
      if (authToken) result = await addMedicine({ credentials, authToken });
      else throw new Error("User is not authenticated");
      if (isAddSuccess || !result.error) {
        message.success("Medicine added successfully");
        // setModalOpen(false);
      }
      return result;
    } catch (error) {
      console.log(error);
      message.error("Uncaught Error: Medicine not added");
    }
  };

  const edit = async (formValues, medicineId) => {
    try {
      const credentials = { ...formValues };
      let result;
      if (authToken)
        result = await editMedicine({ credentials, authToken, id:medicineId });
      else throw new Error("User is not authenticated");
      if (isEditSuccess || !result.error) {
        message.success("Medicine edited successfully");
        // setModalOpen(false);
      }
      return result;
    } catch (error) {
      console.log(error);
      message.error("Uncaught Error: Medicine not edited");
    }
  };

  const remove = async (id) => {
    let result;
    if (authToken && id) {
      try {
        result = await deleteMedicine({ medicineId: id, authToken });
        if (isdeleteSuccess && !result.error) {
          message.success("Medicine Deleted Successfully");
        }
        return result?.data;
      } catch (error) {
        console.log(error);
        message.error("Error: Deleting Medicine");
      }
    }
  };

  return {
    add,
    edit,
    remove,
    data: data?.medicines,
    loading: isLoading || isAddLoading || isEditLoading || isdeleteLoading,
    error: error || addingError || editingError || deletingError,
  };
};
