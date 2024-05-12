import roleContext from "@/context/RoleContext/roleContext";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import GeneralTable from "@/components/Tables/GeneralTable";
import { useAppointmentCrud } from "@/hooks/useAppointmentCrud";
import { Tag } from "antd";
import { useGetPopularDoctorsQuery } from "@/redux/services/api/hospitalAdminApi";
import GenTable from "@/components/Tables/GenTable";

const PopularDoctorTable = ({ items ,details,loading,error,authToken}) => {
  // const {
  //   data: details,
  //   isLoading: loading,
  //   error,
  // } = useGetPopularDoctorsQuery(localStorage.getItem("Hospital Admintoken"));

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const tableprops = {
    details: details,
    tableTitle: "Doctor",
    authToken: authToken,
    page: "doctor",
    columnsToFilter: ["DoctorID", "PatientID"],
    entries: 5,
  };

  return (
    <>
      {console.log(details)}
      <GenTable {...tableprops} />
    </>
  );
};

export default PopularDoctorTable;
