import { useState } from "react";

import {
  useAddPrescriptionMutation,
  useEditPrescriptionMutation,
  useDeletePrescriptionMutation,
  useViewPrescriptionsQuery,
} from "@/redux/services/api/prescriptionApi";
import { message } from "antd";
import { useGetPrescriptionsQuery } from "@/redux/services/api/hospitalAdminApi";

export const usePrescriptionCrud = () => {
  const authToken = localStorage.getItem("Doctortoken");
  const [
    addPrescription,
    { isSuccess: isAddSuccess, isLoading: isAddLoading, error: addingError },
  ] = useAddPrescriptionMutation();
  const [
    editPrescription,
    { isSuccess: isEditSuccess, isLoading: isEditLoading, error: editingError },
  ] = useEditPrescriptionMutation();
  const [
    deletePrescription,
    {
      isSuccess: isdeleteSuccess,
      isLoading: isdeleteLoading,
      error: deletingError,
    },
  ] = useDeletePrescriptionMutation();
  const { data, isSuccess, isLoading, error } =
    useViewPrescriptionsQuery(authToken);

  const add = async (formValues) => {
    try {
      const credentials = { ...formValues };
      let result;
      if (authToken) result = await addPrescription({ credentials, authToken });
      else throw new Error("User is not authenticated");
      if (isAddSuccess || !result.error) {
        message.success("Prescription added successfully");
        // setModalOpen(false);
      }
      return result;
    } catch (error) {
      message.error("Uncaught Error: Prescription not added");
    }
  };

  const edit = async (formValues) => {
    try {
      const credentials = { ...formValues };
      let result;
      if (authToken)
        result = await editPrescription({ credentials, authToken });
      else throw new Error("User is not authenticated");
      if (isEditSuccess || !result.error) {
        message.success("Prescription edited successfully");
      }
      return result;
    } catch (error) {
      message.error("Uncaught Error: Prescription not edited");
    }
  };

  const remove = async (id) => {
    let result;
    if (authToken && id) {
      try {
        result = await deletePrescription({ hospitalId: id, authToken });
        if (isdeleteSuccess && !result.error) {
          message.success("Prescription Deleted Successfully");
        }
        return result?.data;
      } catch (error) {
        message.error("Error: Deleting Prescription");
      }
    }
  };

  return {
    add,
    edit,
    remove,
    data:data,
    loading: isLoading || isAddLoading || isEditLoading || isdeleteLoading,
    error: error || addingError || editingError || deletingError,
  };
};
