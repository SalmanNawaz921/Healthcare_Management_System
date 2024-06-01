import GenTable from "./GenTable";
import { sortData } from "@/utils/utils";
import { DeleteOutlined } from "@ant-design/icons";

const PrescriptionTable = ({ data, loading, error, authToken, type }) => {
  const items = [{ key: 3, label: "Delete", icon: <DeleteOutlined /> }];

  const sortingOptions = [
    { label: "Sort", value: "sort", key: 1 },

    type !== "Patient"
      ? { label: "Patient", value: "patient", key: 2 }
      : { label: "Doctor", value: "doctor", key: 2 },
  ];

  const genderOptions = [
    { label: "Condition", value: "condition", key: 1 },
    { label: "Routine", value: "routine", key: 2 },
    { label: "Mild", value: "mild", key: 3 },
    { label: "Critical", value: "critical", key: 3 },
  ];

  const handleSort = (val, detail) => {
    let sortedData;
    if (sortingOptions) {
      if (val !== "sort") {
        sortedData = [...detail].sort((a, b) => a[val].localeCompare(b[val]));
      } else {
        return data;
      }
    }
    return sortedData ? sortedData : data;
  };

  const handleGender = (val, detail) => {
    let sortedData;
    if (genderOptions) {
      if (val === "routine") {
        sortedData = sortData(detail, "Condition", "routine");
      } else if (val === "mild") {
        sortedData = sortData(detail, "Condition", "mild");
      } else if (val === "critical") {
        sortedData = sortData(detail, "Condition", "critical");
      } else {
        return data;
      }
    }
    return sortedData ? sortedData : data;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const tableprops = {
    details: data || null,
    tableTitle: "Prescription",
    authToken: authToken,
    keyToDelete: "PrescriptionID",
    items: (type === null && items) || null,
    handleSort: handleSort || null,
    filterKey: "Date Prescribed",
    keyToSearch: type,
    handleGender: handleGender,
    sortingOptions: sortingOptions,
    genderOptions: genderOptions,
    columnsToFilter: ["MedicalHistory", "Description"],
  };

  return (
    <div className="shadow-2xl">
      <GenTable {...tableprops} />
    </div>
  );
};

export default PrescriptionTable;
