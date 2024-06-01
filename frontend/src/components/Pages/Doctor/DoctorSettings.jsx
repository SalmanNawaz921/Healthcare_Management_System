import Settings from "@/components/Settings/Settings";
import { useGetDoctorDetailsQuery } from "@/redux/services/api/doctorApi";
import React, { useState } from "react";
import { FaUserAlt, FaUserEdit, FaUserMd } from "react-icons/fa";
import { useParams } from "react-router-dom";

const DoctorSettings = () => {
  const { username } = useParams();
  const authToken = localStorage.getItem("Doctortoken");
  const { data: details } = useGetDoctorDetailsQuery({
    authToken,
    id: username,
  });
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
      key: "doctorInfo",
      icon: <FaUserMd />,
      label: "Doctor Information",
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
      fullName={details?.FirstName.concat(" ", details?.LastName)}
      email={details?.["Email"]}
      phoneno={details?.["Contact"]}
      username={details?.Username}
      id={details?.DoctorID}
      img={details?.["Img"]}
    />
  );
};

export default DoctorSettings;
