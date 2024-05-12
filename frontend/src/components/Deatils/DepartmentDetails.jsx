import { useGetPatientQuery } from "@/redux/services/api/patientApi";
import React, { useContext, useState } from "react";
import DetailsWrapper from "../DetialsWrapper/DetailsWrapper";
import InfoComponent from "../Settings/InfoComponent";
import { FaUserAlt, FaUserEdit, FaUserMd } from "react-icons/fa";
import Settings from "../Settings/Settings";
import roleContext from "@/context/RoleContext/roleContext";
import { useParams } from "react-router-dom";
import DepartmentTable from "../Tables/DepartmentTable";
import DoctorTable from "../Tables/DoctorTable";
import {
  useGetDepartmentQuery,
  useGetDoctorsByDepartmentQuery,
  useGetPatientsByDepartmentQuery,
  useGetTreatmentByDepartmentQuery,
} from "@/redux/services/api/departmentApi";
import PatientsTable from "../Tables/PatientsTable";
import TreatmentTable from "../Tables/TreatmentTable";

const DepartmentDetails = () => {
  const { id } = useParams();
  const authToken = localStorage.getItem("Hospital Admintoken");
  const items = [
    {
      key: "Doctors",
      icon: <FaUserMd />,
      label: "Doctors",
    },
    {
      key: "Patients",
      icon: <FaUserMd />,
      label: "Patients",
    },
    {
      key: "Treatments",
      icon: <FaUserMd />,
      label: "Treatments",
    },
  ];

  const [formName, setFormName] = useState("Doctors");
  const { data: departmentDetails } = useGetDepartmentQuery({ authToken, id });
  const {
    data: details,
    isLoading: loading,
    error,
  } = useGetDoctorsByDepartmentQuery({ authToken, id });
  const {
    data: patientDetails,
    isLoading: isPatientLoading,
    error: patientError,
  } = useGetPatientsByDepartmentQuery({ authToken, id });
  const {
    data: treatmentData,
    isLoading: isTreatmentLoading,
    error: treatmentError,
  } = useGetTreatmentByDepartmentQuery({ authToken, id });
  const [component, setComponent] = useState(
    <DoctorTable
      details={details}
      loading={loading}
      error={error}
      authToken={authToken}
      purpose="department"
    />
  );
  const handleMenuClick = (obj) => {
    if ( obj?.key === "Doctors") {
      setComponent(
        <DoctorTable
          details={details}
          loading={loading}
          error={error}
          authToken={authToken}
          purpose="department"
        />
      );
      setFormName(obj?.key);
    }
    if (obj?.key === "Patients") {
      setComponent(
        <PatientsTable
          authToken={authToken}
          details={patientDetails}
          loading={isPatientLoading}
          error={patientError}
          type="admin"
          purpose="department"
          />
        );
        setFormName(obj?.key);
      }
      if (obj?.key === "Treatments") {
        setComponent(
          <TreatmentTable
          authToken={authToken}
          data={treatmentData}
          isLoading={isTreatmentLoading}
          error={treatmentError}
          type="admin"
          purpose="department"
        />
      );
      setFormName(obj?.key);
    }
    console.log(formName);
  };
  return (
    <>
      {console.log(details)}
      <Settings
        fullName={departmentDetails?.["Name"]}
        email={departmentDetails?.["Location"]}
        phoneno={departmentDetails?.["Contact"]}
        items={items}
        handleMenuClick={handleMenuClick}
        // //formName={"patientInfo"}
        // img={details?.["Img"]}
        noShow={true}
        // details={details}
        formName={formName}
        component={component}
      />
      
    </>
  );
};

export default DepartmentDetails;
