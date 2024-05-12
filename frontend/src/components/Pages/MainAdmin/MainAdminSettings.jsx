import Settings from "@/components/Settings/Settings";
import PersonalInfo from "@/components/SignUp/PersonalInfo";
import { useGetAdminDetailsQuery } from "@/redux/services/api/adminApi";
import React, { useState } from "react";
import { FaUserAlt, FaUserEdit, FaUserMd } from "react-icons/fa";

const MainAdminSettings = () => {
  const authToken = localStorage.getItem("Main Admintoken");
  const { data: details } = useGetAdminDetailsQuery({ authToken });
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
      {console.log(details)}
      <Settings
        items={items}
        handleMenuClick={handleMenuClick}
        formName={formName}
        details={details}
        fullName={details?.FirstName.concat(" ", details?.LastName)}
        email={details?.["Email"]}
        phoneno={details?.["Contact"]}
        username={details?.Username}
        img={details?.Img}
      />
    </>
  );
};

export default MainAdminSettings;
