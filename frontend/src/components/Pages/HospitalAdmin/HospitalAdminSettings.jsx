import Settings from "@/components/Settings/Settings";
import React, { useState } from "react";
import { FaUserAlt, FaUserEdit } from "react-icons/fa";

const HospitalAdminSettings = ({ details, username, img }) => {
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
    <>
      <Settings
        items={items}
        handleMenuClick={handleMenuClick}
        formName={formName}
        details={details}
        fullName={details?.FirstName?.concat(" ", details?.LastName)}
        email={details?.["Email"]}
        phoneno={details?.["Contact"]}
        username={details?.Username}
        img={details?.Img}
        id={details?.["AdminID"]}
      />
    </>
  );
};

export default HospitalAdminSettings;
