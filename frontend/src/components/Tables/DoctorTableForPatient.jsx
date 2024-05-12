import roleContext from "@/context/RoleContext/roleContext";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import GeneralTable from "./GeneralTable";
import { Tag, message } from "antd";
import { useNavigate } from "react-router-dom";
import GenTable from "./GenTable";
import { sortData } from "@/utils/utils";
import { CloseSquareOutlined, CheckOutlined } from "@ant-design/icons";
import DoctorCards from "../Card/DoctorCards";
import { useAddAppointmentMutation } from "@/redux/services/api/appointmentApi";

const DoctorTableForPatient = ({
  details,
  loading,
  error,
  authToken,
  type,
}) => {
  //   const options = details?.map((details, i) => details?.["HospitalID"]);
  const [bookAppointment, { isSuccess, isLoading, error: appointmentError }] =
    useAddAppointmentMutation();
  const items = [
    { key: 2, label: "Book Appointment", icon: <CheckOutlined /> },
    { key: 3, label: "Cancel Appointment", icon: <CloseSquareOutlined /> },
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

  const handleBook = async (formValues, record) => {
    let book;
    if (record?.Status !== "Busy") {
      const credentials = { ...formValues, DoctorID: record?.DoctorID };
      const vals = { credentials, authToken };

      console.log(vals);
      book = await bookAppointment(vals);
      if (book?.data) return book?.data;
    } else {
      message.info("Doctor is busy");
    }
  };
  const tableprops = {
    details: details || null,
    tableTitle: "Appointment",
    authToken: authToken,
    items: items || null,
    handleSort: handleSort || null,
    keyToSearch: "Name",
    handleGender: handleGender,
    sortingOptions: sortingOptions,
    genderOptions: genderOptions,
    columnsToFilter: [""],
    handleEdit: handleBook,
    page: "appointment",
  };

  return (
    <div className="shadow-2xl">
      <GenTable {...tableprops} />
    </div>
  );
};

export default DoctorTableForPatient;
