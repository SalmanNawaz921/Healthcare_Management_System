
import GenTable from "./GenTable";
import { sortData } from "@/utils/utils";
import { DeleteOutlined } from "@ant-design/icons";
import { useAppointmentCrud } from "@/hooks/useAppointmentCrud";
import AppointmentCards from "../Card/AppointmentCards";

const PatientsTable = () => {
  const authToken = localStorage.getItem("Hospital Admintoken");
  const { data, isLoading, error } = useAppointmentCrud();
  const items = [{ key: 3, label: "Delete", icon: <DeleteOutlined /> }];

  const sortingOptions = [
    { label: "Sort", value: "sort", key: 1 },
    { label: "Patient", value: "patient", key: 2 },
    { label: "Doctor", value: "doctor", key: 3 },
  ];

  const genderOptions = [
    { label: "Status", value: "status", key: 1 },
    { label: "Done", value: "done", key: 2 },
    { label: "Pending", value: "pending", key: 3 },
  ];

  const handleGender = (val, detail) => {
    let sortedData;
    if (genderOptions) {
      if (val === "done") {
        sortedData = sortData(detail, "Status", "done");
      } else if (val === "pending") {
        sortedData = sortData(detail, "Status", "pending");
      } else {
        return data;
      }
    }
    return sortedData;
  };

  const handleSort = (val, detail) => {
    let sortedData;
    if (sortingOptions) {
      if (val === "patient") {
        sortedData = [...detail].sort((a, b) =>
          a["Patient"].localeCompare(b["Patient"])
        );
      } else if (val === "doctor") {
        sortedData = [...detail].sort((a, b) =>
          a["Doctor"].localeCompare(b["Doctor"])
        );
      } else {
        return data;
      }
    }
    return sortedData;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const tableprops = {
    details: data || null,
    tableTitle: "Appointment",
    authToken: authToken,
    keyToDelete: "AppointmentID",
    items: null,
    handleSort: handleSort || null,
    filterKey: "AppointmentDate",
    keyToSearch: "AppointmentID",
    handleGender: handleGender,
    sortingOptions: sortingOptions,
    genderOptions: genderOptions,
    columnsToFilter: ["DoctorID", "PatientID"],
  };

  return (
    <>
      <div className="mb-10">
        <AppointmentCards data={data} />
      </div>
      <div className="shadow-2xl">
        <GenTable {...tableprops} />
      </div>
    </>
  );
};

export default PatientsTable;
