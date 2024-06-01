import { useState } from "react";
import { FaUserAlt, FaUserMd } from "react-icons/fa";
import Settings from "../Settings/Settings";
import { useParams } from "react-router-dom";
import { useGetDoctorDetailsQuery } from "@/redux/services/api/doctorApi";

const DoctorDetails = () => {
  const { id } = useParams();
  const { data } = useGetDoctorDetailsQuery({
    authToken: localStorage.getItem("Hospital Admintoken"),
    id: id,
  });

  const items = [
    {
      key: "Personal Information",
      icon: <FaUserAlt />,
      label: "Personal Information",
    },
    {
      key: "Doctor Information",
      icon: <FaUserMd />,
      label: "Doctor Information",
    },
  ];

  const [formName, setFormName] = useState("Personal Information");
  const handleMenuClick = (obj) => {
    if (obj?.key === "Personal Information") {
      setFormName(obj?.key);
    } else if (obj?.key === "Doctor Information") {
      setFormName(obj?.key);
    } else {
      setFormName(obj?.key);
    }
  };
  return (
    <>
      <Settings
        fullName={data?.["Name"]}
        email={data?.["Email"]}
        phoneno={data?.["Contact"]}
        items={items}
        handleMenuClick={handleMenuClick}
        img={data?.["Img"]}
        noShow={true}
        details={data}
        formName={formName}
      />
      ;
    </>
  );
};

export default DoctorDetails;
