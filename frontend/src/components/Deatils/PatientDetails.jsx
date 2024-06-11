import { useGetPatientQuery } from "@/redux/services/api/patientApi";
import React, { useContext, useState } from "react";
import { FaUserAlt, FaUserMd } from "react-icons/fa";
import Settings from "../Settings/Settings";
import roleContext from "@/context/RoleContext/roleContext";
import { useParams } from "react-router-dom";

const PatientDetails = ({authToken}) => {
  const { id } = useParams();
  const { role } = useContext(roleContext);
  const credentaiols = { authToken, id: id, role: role };
  const {
    data: details,
    isLoading,
    error,
    isSuccess,
  } = useGetPatientQuery(credentaiols);

  const items = [
    {
      key: "Personal Information",
      icon: <FaUserAlt />,
      label: "Personal Information",
    },
    {
      key: "Patient Information",
      icon: <FaUserMd />,
      label: "Patient Information",
    },
  ];

  const [formName, setFormName] = useState("Personal Information");
  const handleMenuClick = (obj) => {
    setFormName(obj?.key);
  };
  return (
    <>
    {console.log(details)}
      <Settings
        fullName={details?.[0]?.FirstName.concat(" ", details?.[0]?.LastName)}
        email={details?.[0]?.["Email"]}
        phoneno={details?.[0]?.["Contact"]}
        items={items}
        handleMenuClick={handleMenuClick}
        img={details?.[0]?.["Img"]}
        noShow={true}
        details={details?.[0]}
        formName={formName}
      />
      ;
    </>
  );
};

export default PatientDetails;