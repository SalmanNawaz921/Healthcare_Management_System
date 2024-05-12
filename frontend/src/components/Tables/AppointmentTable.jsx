// import roleContext from "@/context/RoleContext/roleContext";
// import React, { useContext } from "react";
// import { useEffect, useState } from "react";
// import GeneralTable from "./GeneralTable";
// import { useAppointmentCrud } from "@/hooks/useAppointmentCrud";
// import { Tag } from "antd";

// const AppointmentTable = ({ items }) => {
//   const { add, edit, remove, data, loading, error } = useAppointmentCrud();
//   const [appointmentData, setAppointmentData] = useState([]);
//   const [columnsData, setColumnsData] = useState([]);

//   const updateAppointmentData = (patientsData) => {
//     const firstItem = data[0];
//     const extractedColumns = Object.keys(firstItem)
//       .filter((key) => key !== "PatientID" && key != "DoctorID")
//       .map((key) => ({
//         title: key === "AppointmentID" ? "#" : key,
//         dataIndex: key,
//         i: key,
//         ...(key === "Status" && {
//           render: (text) => (
//             <Tag
//               color={text === "Pending" ? "red" : "green"}
//               className="p-2 text-base rounded-xl"
//             >
//               {text}
//             </Tag>
//           ),
//         }),
//       }));

//     const extractedData = patientsData.map((data, i) => {
//       let date = "";
//       if (data["AppointmentDate"]) {
//         date = new Date(data["AppointmentDate"]).toLocaleDateString();
//       }
//       return { ...data, key: i, ["AppointmentDate"]: date };
//     });

//     setAppointmentData(extractedData);
//     setColumnsData(extractedColumns);
//     return { extractedColumns, extractedData };
//   };

//   useEffect(() => {
//     if (!localStorage.getItem("Hospital Admintoken")) {
//       navigate("/");
//     }
//     if (data?.length > 0) {
//       const { extractedColumns, extractedData } = updateAppointmentData(data);

//       setColumnsData(extractedColumns);
//       setAppointmentData(extractedData);
//     }
//   }, [data]);
//   const { role } = useContext(roleContext);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   const options = data?.map((item) => item?.["DoctorID"]);
//   //   const options = data?.map((data, i) => data?.["HospitalID"]);

//   const handleAdd = async (formValues) => {
//     try {
//       const result = await add(formValues);
//       if (result) updateAppointmentData(result?.data?.appointments);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleEdit = async (formValues, record) => {
//     const result = await edit(formValues, record.AppointmentID);
//     if (result?.data?.success)
//       updateAppointmentData(result?.data?.appointments);
//   };

//   const handleDelete = async (id) => {
//     try {
//       const result = await remove(id);
//       if (result) updateAppointmentData(result?.data?.appointments);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const tableprops = {
//     data: data,
//     update: updateAppointmentData,
//     columnsData: columnsData,
//     handleEdit: handleEdit,
//     handleAdd: handleAdd,
//     handleDelete: handleDelete,
//     options: options,
//     tableTitle: "Appointment",
//     authToken: localStorage.getItem("Hospital Admintoken"),
//     newData: appointmentData,
//     page: "appointment",
//     keyToDelete: "AppointmentID",
//     items: items,
//   };

//   return (
//     <>
//       <GeneralTable {...tableprops} />
//     </>
//   );
// };

// export default AppointmentTable;

import GenTable from "./GenTable";
import { sortAscending, sortData, sortDescending } from "@/utils/utils";
import { DeleteOutlined } from "@ant-design/icons";
import { useGetAllPatientsAdminQuery } from "@/redux/services/api/hospitalAdminApi";
import { useAppointmentCrud } from "@/hooks/useAppointmentCrud";
import AppointmentCards from "../Card/AppointmentCards";

const PatientsTable = () => {
  //   const options = details?.map((details, i) => details?.["HospitalID"]);
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
