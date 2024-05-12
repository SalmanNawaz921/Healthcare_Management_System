import Settings from "@/components/Settings/Settings";
import PersonalInfo from "@/components/SignUp/PersonalInfo";
import { useGetDoctorDetailsQuery } from "@/redux/services/api/doctorApi";
import { useGetPatientQuery } from "@/redux/services/api/patientApi";
import React, { useState } from "react";
import { FaSteamSymbol, FaUserAlt, FaUserEdit, FaUserMd } from "react-icons/fa";

const PatientSettings = ({username}) => {
  const authToken = localStorage.getItem("Patienttoken");
  const role=4;
  const { data: details } = useGetPatientQuery({authToken,username,role});
  const [formName, setFormName] = useState("personalInfo");

  const items = [
    {
      key: "personalInfo",
      icon: <FaUserAlt />,
      label: "Personal Information",
    },
    {
      key: "userInfo",
      icon: <FaUserEdit />,
      label: "User Information",
    },
    {
      key: "patientInfo",
      icon: <FaUserMd />,
      label: "Patient Information",
    },
    {
      key: "symptomsInfo",
      icon: <FaSteamSymbol />,
      label: "Symptoms Information",
    },
  ];

  const handleMenuClick = (obj) => {
    if (obj?.key === "personalInfo") {
      setFormName(obj?.key);
    } else if (obj?.key === "userInfo") {
      setFormName(obj?.key);
    } else {
      setFormName(obj?.key);
    }
  };
  return (
    <Settings
      items={items}
      handleMenuClick={handleMenuClick}
      formName={formName}
      details={details}
      fullName={details?.["FirstName"].concat(" ", details?.["LastName"])}
      email={details?.["Email"]}
      phoneno={details?.["Contact"]}
      username={details?.Username}
      id={details?.PatientID}
      img={details?.["Img"]}
    />
  );
};

export default PatientSettings;
