import {
  useAddSymptomMutation,
  useDeleteSymptomMutation,
  useEditSymptomMutation,
  useGetSymptomsQuery,
} from "@/redux/services/api/patientApi";
import { message } from "antd";

export const useSymptomCrud = () => {
  const authToken = localStorage.getItem("Patienttoken");
  const [
    addSymptom,
    { isSuccess: isAddSuccess, isLoading: isAddLoading, error: addingError },
  ] = useAddSymptomMutation();
  const [
    editSymptom,
    { isSuccess: isEditSuccess, isLoading: isEditLoading, error: editingError },
  ] = useEditSymptomMutation();
  const [
    deleteSymptom,
    {
      isSuccess: isdeleteSuccess,
      isLoading: isdeleteLoading,
      error: deletingError,
    },
  ] = useDeleteSymptomMutation();

  const { data, isSuccess, isLoading, error } = useGetSymptomsQuery({
    authToken,
  });

  const add = async (formValues) => {
    try {
      const credentials = { ...formValues };
      let result;
      if (authToken) result = await addSymptom({ credentials, authToken });
      else throw new Error("User is not authenticated");
      if (isAddSuccess || !result.error) {
        message.success("Symptom added successfully");
      }
      return result?.data;
    } catch (error) {
      message.error("Uncaught Error: Symptom not added");
    }
  };

  const edit = async (formValues, selectedSymptom) => {
    try {
      const credentials = { ...formValues };
      const vals = { credentials, id: selectedSymptom?.SymptomID, authToken };

      let result;
      if (authToken) result = await editSymptom(vals);
      else throw new Error("User is not authenticated");
      if (!result.error) {
        message.success("Symptom edited successfully");
      }
      return result?.data;
    } catch (error) {
      message.error("Uncaught Error: Symptom not edited");
    }
  };

  const remove = async (id) => {
    let result;
    if (authToken && id) {
      try {
        result = await deleteSymptom({ id, authToken });
        if (!result.error) {
          message.success("Symptom Deleted Successfully");
        }
        return result?.data;
      } catch (error) {
        message.error("Error: Deleting Symptom");
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
