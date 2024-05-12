import GenTable from "./GenTable";
import { sortAscending, sortData, sortDescending } from "@/utils/utils";
import { DeleteOutlined } from "@ant-design/icons";
import { useGetAllPatientsAdminQuery } from "@/redux/services/api/hospitalAdminApi";
import { useAppointmentCrud } from "@/hooks/useAppointmentCrud";
import AppointmentCards from "../Card/AppointmentCards";
import { useGetAllAdminsQuery } from "@/redux/services/api/adminApi";

const AdminsTable = () => {
  //   const options = details?.map((details, i) => details?.["HospitalID"]);
  const authToken = localStorage.getItem("Main Admintoken");
  const { data, isLoading, error } = useGetAllAdminsQuery(authToken);
  const items = [{ key: 3, label: "Delete", icon: <DeleteOutlined /> }];

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
        return data;
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
    tableTitle: "Admin",
    authToken: authToken,
    keyToDelete: "UserID",
    items: null,
    handleSort: handleSort || null,
    filterKey: "JoinDate",
    keyToSearch: "Name",
    handleGender: handleGender,
    sortingOptions: sortingOptions,
    genderOptions: genderOptions,
    columnsToFilter: ["DoctorID", "Notes","Img","OfficeLocation","Username","State","Country","ZipCode","CNIC","Salary","Address"],
  };

  return (
    <>
      {/* <div className="mb-10">
        <AppointmentCards data={data} />
      </div> */}
      <div className="shadow-2xl">
        <GenTable {...tableprops} />
      </div>
    </>
  );
};

export default AdminsTable;
