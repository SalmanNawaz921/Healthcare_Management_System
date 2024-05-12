import { useState } from "react";

import {
  useAddDepartmentMutation,
  useDeleteDepartmentMutation,
  useEditDepartmentMutation,
  useGetDepartmentsQuery,
} from "@/redux/services/api/departmentApi";
import { message } from "antd";

export const useDepartmentCrud = (steps) => {
  const authToken = localStorage.getItem("Hospital Admintoken");
  const [
    addDepartment,
    { isSuccess: isAddSuccess, isLoading: isAddLoading, error: addingError },
  ] = useAddDepartmentMutation();
  const [
    editDepartment,
    { isSuccess: isEditSuccess, isLoading: isEditLoading, error: editingError },
  ] = useEditDepartmentMutation();
  const [
    deleteDepartment,
    {
      isSuccess: isdeleteSuccess,
      isLoading: isdeleteLoading,
      error: deletingError,
    },
  ] = useDeleteDepartmentMutation();
  const { data, isSuccess, isLoading, error } =
    useGetDepartmentsQuery(authToken);

  const add = async (formValues) => {
    try {
      const credentials = { ...formValues };
      let result;
      if (authToken) result = await addDepartment({ credentials, authToken });
      else throw new Error("User is not authenticated");
      if (isAddSuccess || !result.error) {
        message.success("Department added successfully");
        // setModalOpen(false);
      }
      return result;
    } catch (error) {
      console.log(error);
      message.error("Uncaught Error: Department not added");
    }
  };

  const edit = async (formValues, departmentId,hospitalId) => {
    try {
      const credentials = { ...formValues,hospitalId };
      let result;
      if (authToken)
        result = await editDepartment({ credentials, authToken, departmentId });
      else throw new Error("User is not authenticated");
      if (isEditSuccess || !result.error) {
        message.success("Department edited successfully");
        // setModalOpen(false);
      }
      return result;
    } catch (error) {
      console.log(error);
      message.error("Uncaught Error: Department not edited");
    }
  };

  const remove = async (id) => {
    let result;
    if (authToken && id) {
      try {
        result = await deleteDepartment({ departmentId: id, authToken });
        if (isdeleteSuccess && !result.error) {
          message.success("Department Deleted Successfully");
        }
        return result?.data;
      } catch (error) {
        console.log(error);
        message.error("Error: Deleting Department");
      }
    }
  };

  return {
    add,
    edit,
    remove,
    data: data,
    loading: isLoading || isAddLoading || isEditLoading || isdeleteLoading,
    error: error || addingError || editingError || deletingError,
  };
};
