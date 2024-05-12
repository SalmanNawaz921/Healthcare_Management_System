import React, { useContext } from "react";
import { useEffect, useState } from "react";
import GeneralTable from "./GeneralTable";
import {
  useAssignDoctorMutation,
  useGetUnassignedDoctorsQuery,
} from "@/redux/services/api/hospitalAdminApi";
import { useGetDepartmentsQuery } from "@/redux/services/api/hospitalAdminApi";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { message } from "antd";

const TreatmentTableForAdmin = ({ items }) => {
  const authToken = localStorage.getItem("Hospital Admintoken");
  const {
    data,
    isLoading: loading,
    error,
  } = useGetUnassignedDoctorsQuery(authToken);
  const { data: departmentData } = useGetDepartmentsQuery(authToken);
  const [edit, { isSuccess: isEditSuccess }] = useAssignDoctorMutation();
  const [doctorsData, setDoctorsData] = useState([]);
  const [columnsData, setColumnsData] = useState([]);

  const updateDoctorData = (doctorsData) => {
    const firstItem = data[0];
    const extractedColumns = Object.keys(firstItem)
      .filter((key) => key !== "HospitalID")
      .map((key) => ({
        title: key === "DoctorID" ? "#" : key,
        dataIndex: key,
        i: key,
      }));
    const adminNameIndex = extractedColumns.findIndex(
      (column) => column.dataIndex === "Admin Name"
    );

    // Move "Admin Name" column to the second position
    if (adminNameIndex !== -1 && adminNameIndex !== 1) {
      const adminNameColumn = extractedColumns.splice(adminNameIndex, 1)[0];
      extractedColumns.splice(1, 0, adminNameColumn);
    }

    const extractedData = doctorsData.map((data, i) => ({
      ...data,
      key: i,
    }));

    setDoctorsData(extractedData);
    setColumnsData(extractedColumns);
    return { extractedColumns, extractedData };
  };

  useEffect(() => {
    if (!localStorage.getItem("Hospital Admintoken")) {
      navigate("/");
    }
    if (data?.length > 0) {
      const { extractedColumns, extractedData } = updateDoctorData(data);

      setColumnsData(extractedColumns);
      setDoctorsData(extractedData);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const opts = [
    {
      key: "1",
      label: "View",
      icon: <EyeOutlined />,
    },

    {
      key: "2",
      label: "Assign",
      icon: <EditOutlined />,
    },
  ];

  const handleEdit = async (formValues, record) => {
    const credentials = { ...formValues, DoctorID: record.DoctorID };
    const vals = { credentials, authToken };
    console.log(vals);
    const result = await edit(vals);
    if (result) message.info("Doctor assigned successfully");
    if (result) updateDoctorData(result);
  };

  const options = departmentData?.departments?.map((item) => item.DepartmentID);

  const tableprops = {
    data: data || null,
    update: updateDoctorData || null,
    columnsData: columnsData || null,
    authToken: localStorage.getItem("Hospital Admintoken") || null,
    newData: doctorsData || null,
    keyToSearch: "Name" || null,
    tableTitle: "Doctor",
    items: opts,
    tableTitle: "Unassign",
    handleEdit: handleEdit,
    page: "unassign",
    options: options,
  };

  return (
    <>
      <GeneralTable {...tableprops} />
    </>
  );
};

export default TreatmentTableForAdmin;
