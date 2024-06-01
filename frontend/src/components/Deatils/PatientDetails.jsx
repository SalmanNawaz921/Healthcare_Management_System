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
      <Settings
        fullName={details?.FirstName.concat(" ", details?.LastName)}
        email={details?.["Email"]}
        phoneno={details?.["Contact"]}
        items={items}
        handleMenuClick={handleMenuClick}
        img={details?.["Img"]}
        noShow={true}
        details={details}
        formName={formName}
      />
      ;
    </>
  );
};

export default PatientDetails;
