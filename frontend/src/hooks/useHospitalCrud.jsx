import { useState } from "react";

import {
  useAddHospitalMutation,
  useEditHospitalMutation,
  useDeleteHospitalMutation,
  useGetHospitalsQuery,
} from "@/redux/services/api/hospitalApi";
import { message } from "antd";

export const useHospitalCrud = (steps) => {
  const authToken = localStorage.getItem("Main Admintoken");
  const [
    addHospital,
    { isSuccess: isAddSuccess, isLoading: isAddLoading, error: addingError },
  ] = useAddHospitalMutation();
  const [
    editHospital,
    { isSuccess: isEditSuccess, isLoading: isEditLoading, error: editingError },
  ] = useEditHospitalMutation();
  const [
    deleteHospital,
    {
      isSuccess: isdeleteSuccess,
      isLoading: isdeleteLoading,
      error: deletingError,
    },
  ] = useDeleteHospitalMutation();
  const { data, isSuccess, isLoading, error } = useGetHospitalsQuery(authToken);

  const add = async (formValues) => {
    try {
      const credentials = { ...formValues };
      let result;
      if (authToken) result = await addHospital({ credentials, authToken });
      else throw new Error("User is not authenticated");
      if (isAddSuccess || !result.error) {
        message.success("Hospital added successfully");
        // setModalOpen(false);
      }
      return result;
    } catch (error) {
      console.log(error);
      message.error("Uncaught Error: Hospital not added");
    }
  };

  const edit = async (formValues) => {
    try {
      const credentials = { ...formValues };
      let result;
      if (authToken) result = await editHospital({ credentials, authToken });
      else throw new Error("User is not authenticated");
      if (isEditSuccess || !result.error) {
        message.success("Hospital edited successfully");
        // setModalOpen(false);
      }
      return result;
    } catch (error) {
      console.log(error);
      message.error("Uncaught Error: Hospital not edited");
    }
  };

  const remove = async (id) => {
    let result;
    if (authToken && id) {
      try {
        result = await deleteHospital({ hospitalId: id, authToken });
        if (isdeleteSuccess && !result.error) {
          message.success("Hospital Deleted Successfully");
        }
        return result?.data;
      } catch (error) {
        console.log(error);
        message.error("Error: Deleting Hospital");
      }
    }
  };

  //   const getAllHospitals = async () => {
  //     let result;
  //     if (authToken && id) {
  //       try {
  //         result = await getAllHospitals(authToken);
  //         if (!result.error) {
  //           message.success("Hospital Deleted Successfully");
  //         }
  //         return result;
  //       } catch (error) {
  //         console.log(error);
  //         message.error("Error: Deleting Hospital");
  //       }
  //     }
  //   };

  return {
    add,
    edit,
    remove,
    data: data,
    loading: isLoading || isAddLoading || isEditLoading || isdeleteLoading,
    error: error || addingError || editingError || deletingError,
  };
};
