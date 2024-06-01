import { message } from "antd";
import GenTable from "./GenTable";
import { sortData } from "@/utils/utils";
import { EyeOutlined, DeleteOutlined} from "@ant-design/icons";
import DoctorCards from "../Card/DoctorCards";
import { useDeleteDoctorMutation } from "@/redux/services/api/hospitalAdminApi";

const DoctorTable = ({ details, loading, error, authToken, type, purpose }) => {
  const [deleteDoctor, { isSuccess, isLoading, error: deletionError }] =
    useDeleteDoctorMutation(localStorage.getItem("Hospital Admintoken"));
  const items = [
    { key: 1, label: "View", icon: <EyeOutlined /> },
    { key: 3, label: "Delete", icon: <DeleteOutlined /> },
  ];

  const sortingOptions = [
    { label: "Status", value: "status", key: 1 },
    { label: "Busy", value: "busy", key: 2 },
    { label: "Free", value: "free", key: 3 },
  ];

  const genderOptions = [
    { label: "Gender", value: "sortGender", key: 1 },
    { label: "Male", value: "male", key: 2 },
    { label: "Female", value: "female", key: 3 },
  ];

  const handleSort = (val, detail) => {
    let sortedData;
    if (sortingOptions) {
      if (val === "busy") {
        sortedData = sortData(detail, "Status", "busy");
      } else if (val === "free") {
        sortedData = sortData(detail, "Status", "free");
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

  const handleDelete = async (id) => {
    const result = await deleteDoctor({ id, authToken });
    if (result?.data?.doctors) {
      message.success("Doctor Deleted Successfully");
      x;
      return result?.data?.doctors;
    }
    message.error("Error: Doctor Deletion Failed");
    return details;
  };
  const tableprops = {
    details: details || null,
    tableTitle: "Doctor",
    authToken: authToken,
    keyToDelete: "DoctorID",
    items: purpose !== "department" &&  items || null,
    handleSort: handleSort || null,
    filterKey: purpose !== "department" && "Joining Date",
    keyToSearch: purpose!=="department"&&"Name",
    handleGender: handleGender,
    sortingOptions: purpose !== "department" && sortingOptions,
    genderOptions: purpose !== "department" && genderOptions,
    columnsToFilter: [""],
    handleDelete: handleDelete,
    keyToView: "DoctorID",
  };

  return (
    <>
      {purpose !== "department" && (
        <div className="mb-10">
          <DoctorCards allDoctors={details} />
        </div>
      )}
      <div className={purpose!=="department" && "shadow-2xl rounded-3xl"}>
        <GenTable {...tableprops} />
      </div>
    </>
  );
};

export default DoctorTable;
