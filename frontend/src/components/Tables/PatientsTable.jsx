import { usePrescriptionCrud } from "@/hooks/usePrescriptionCrud";
import GenTable from "./GenTable";
import { sortAscending, sortData, sortDescending } from "@/utils/utils";
import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import PatientCardsForAdmin from "../Pages/HospitalAdmin/PatientCardsForAdmin";
import { message } from "antd";
import { useDeletePatientMutation } from "@/redux/services/api/hospitalAdminApi";

const PatientsTable = ({
  authToken,
  details,
  loading,
  error,
  type,
  ViewComponent,
  purpose,
}) => {
  let add;
  if (type === "doctor") {
    ({ add } = usePrescriptionCrud());
  }
  const [
    deletePatient,
    { isSuccess: isDeleted, isLoading: isDeleting, error: deletionError },
  ] = useDeletePatientMutation();
  const items = [
    { key: 1, label: "View", icon: <EyeOutlined /> },
    type === "doctor"
      ? { key: 2, label: "Give Prescription", icon: <EditOutlined /> }
      : { key: 3, label: "Delete", icon: <DeleteOutlined /> },
  ];

  const sortingOptions = [
    { label: "Age", value: "age", key: 1 },
    { label: "Old", value: "old", key: 2 },
    { label: "Young", value: "young", key: 3 },
  ];

  const genderOptions = [
    { label: "Gender", value: "sortGender", key: 1 },
    { label: "Male", value: "male", key: 2 },
    { label: "Female", value: "female", key: 3 },
  ];

  const handleSort = (val, detail) => {
    let sortedData;
    if (sortingOptions) {
      if (val === "old") {
        sortedData = sortDescending(detail, "Age");
      } else if (val === "young") {
        sortedData = sortAscending(detail, "Age");
      } else {
        return details;
      }
    }
    return sortedData;
  };

  const handleGender = (val, detail) => {
    let sortedData;
    if (genderOptions) {
      if (val === "male") {
        sortedData = sortData(detail, "Gender", "male");
      } else if (val === "female") {
        sortedData = sortData(detail, "Gender", "female");
      } else {
        return details;
      }
    }
    return sortedData;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleEdit = async (formValues, record) => {
    console.log("Edit", formValues, record);
    if (record?.Status == "Pending") {
      const prescription = await add(formValues, record);
      if (prescription) return prescription;
    }
    message.error("Prescription already given");

    return details;
  };

  const handleDelete = async (id) => {
    const result = await deletePatient({ id, authToken });
    console.log(result?.data?.patients);
    if (result?.data?.patients) {
      message.success("Patient Successfully Deleted");
      return result?.data?.patients;
    }
    message.error("Error: Patient cannot be deleted");
    return details;
  };
  const tableprops = {
    details: details || null,
    tableTitle: "Patient",
    authToken: authToken,
    keyToDelete: "PatientID",
    items: (purpose !== "department" && items) || null,
    handleSort: (purpose !== "department" && handleSort) || null,
    filterKey: purpose !== "department" && "Visit Date",
    keyToSearch: purpose !== "department" && "Full Name",
    handleGender: handleGender,
    sortingOptions: purpose !== "department" && sortingOptions,
    genderOptions: purpose !== "department" && genderOptions,
    columnsToFilter: [
      "MedicalHistory",
      "Description",
      "HourDifference",
      "AppointmentDate",
      "AppointmentTime",
    ],
    ViewComponent: ViewComponent,
    page: "prescription",
    handleEdit: handleEdit,
    handleDelete: handleDelete,
    keyToView: "PatientID",
  };

  return (
    <>
      {type === "admin" && purpose !== "department" && (
        <div className="mb-10">
          <PatientCardsForAdmin />
        </div>
      )}
      <div className={purpose !== "department" && "shadow-2xl rounded-3xl"}>
        <GenTable {...tableprops} />
      </div>{" "}
    </>
  );
};

export default PatientsTable;
