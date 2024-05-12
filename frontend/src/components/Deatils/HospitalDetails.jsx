import {
  useGetAllDoctorsByHospitalQuery,
  useGetPatientQuery,
} from "@/redux/services/api/patientApi";
import React, { useContext, useState } from "react";
import DetailsWrapper from "../DetialsWrapper/DetailsWrapper";
import InfoComponent from "../Settings/InfoComponent";
import { FaBuilding, FaUserAlt, FaUserEdit, FaUserMd } from "react-icons/fa";
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
import GenTable from "../Tables/GenTable";
import {
  useGetAllPatientsAdminQuery,
  useGetDepartmentsQuery,
} from "@/redux/services/api/hospitalAdminApi";
import { useGetHospitalQuery, useGetPatientsMainAdminQuery } from "@/redux/services/api/adminApi";
import { useViewHospitalQuery } from "@/redux/services/api/hospitalApi";

const HospitalDetails = () => {
  const { id } = useParams();
  const authToken = localStorage.getItem("Main Admintoken");
  const items = [
    {
      key: "Departments",
      icon: <FaBuilding />,
      label: "Departments",
    },
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
  ];

  const [formName, setFormName] = useState("Departments");
  const { data: departmentDetails } = useGetDepartmentsQuery({ authToken, id });
  const {
    data: details,
    isLoading: loading,
    error,
  } = useGetAllDoctorsByHospitalQuery({ authToken, id });
 const {data:hospitalDetails}=useViewHospitalQuery({authToken,id});

  const { data: patientData } = useGetPatientsMainAdminQuery({ authToken, id });
  const [component, setComponent] = useState(
    <GenTable
      details={departmentDetails}
      authToken={authToken}
      columnsToFilter={[""]}
    />
  );
  const handleMenuClick = (obj) => {
    if (obj?.key === "Departments") {
      setComponent(
        <GenTable
          details={departmentDetails}
          authToken={authToken}
          columnsToFilter={["HospitalID", "Hospital Name"]}
        />
      );
      setFormName(obj?.key);
    }
    if (obj?.key === "Doctors") {
      setComponent(
        <GenTable
          details={details}
          authToken={authToken}
          columnsToFilter={[""]}
        />
      );
      setFormName(obj?.key);
    }
    if (obj?.key === "Patients") {
      setComponent(
        <GenTable
          details={patientData}
          authToken={authToken}
          columnsToFilter={[
            "MedicalHistory",
            "Description",
            "Weight",
            "BloodPressure",
            "Height",
            "BloodType",
            "AliveStatus",
            "PatientID",
            "HospitalID"
          ]}
        />
      );
      setFormName(obj?.key);
    }

    console.log(formName);
  };
  return (
    <>
    {console.log(hospitalDetails)}
      <Settings
        fullName={hospitalDetails?.["Name"]}
        email={hospitalDetails?.["Email"]}
        phoneno={hospitalDetails?.["Contact"]}
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

export default HospitalDetails;
