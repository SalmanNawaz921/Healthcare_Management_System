import { useGetAllDoctorsByHospitalQuery } from "@/redux/services/api/patientApi";
import { useState } from "react";
import { FaBuilding, FaUserMd } from "react-icons/fa";
import Settings from "../Settings/Settings";
import { useParams } from "react-router-dom";
import GenTable from "../Tables/GenTable";
import { useGetDepartmentsQuery } from "@/redux/services/api/hospitalAdminApi";
import { useGetPatientsMainAdminQuery } from "@/redux/services/api/adminApi";
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
  const { data: hospitalDetails } = useViewHospitalQuery({ authToken, id });

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
            "HospitalID",
          ]}
        />
      );
      setFormName(obj?.key);
    }
  };
  return (
    <>
      <Settings
        fullName={hospitalDetails?.["Name"]}
        email={hospitalDetails?.["Email"]}
        phoneno={hospitalDetails?.["Contact"]}
        items={items}
        handleMenuClick={handleMenuClick}
        noShow={true}
        formName={formName}
        component={component}
      />
    </>
  );
};

export default HospitalDetails;
