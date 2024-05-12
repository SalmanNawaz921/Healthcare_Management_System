import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import MainAdminDashboard from "./MainAdminDashboard";
import { adminOptions, hospitalAdminOptions } from "@/constants/constants";
import { useState } from "react";
import HospitalTable from "@/components/Tables/HospitalTable";
import HospitalAdminDashboard from "./HospitalAdminDashboard";
import {
  useGetAllPatientsAdminQuery,
  useGetDoctorsQuery,
  useGetHospitalAdminDetailsQuery,
  useGetInvoicesQuery,
} from "@/redux/services/api/hospitalAdminApi";
import HospitalAdminSettings from "./HospitalAdminSettings";
import DepartmentTable from "@/components/Tables/DepartmentTable";
import MedicineTable from "@/components/Tables/MedicineTable";
import AppointmentTable from "@/components/Tables/AppointmentTable";
import TreatmentTable from "@/components/Tables/TreatmentTable";
import DoctorTable from "@/components/Tables/DoctorTable";
import PatientsTable from "@/components/Tables/PatientsTable";
import UnassignedDoctors from "@/components/Tables/UnassignedDoctors";
import PatientCardsForAdmin from "./PatientCardsForAdmin";
import TreatmentCards from "../../Card/TreatmentCards";
import { useTreatmentCrud } from "@/hooks/useTreatmentCrud";
import InvoiceTable from "@/components/Tables/InvoiceTable";
import PatientDetails from "@/components/Deatils/PatientDetails";
import DepartmentDetails from "@/components/Deatils/DepartmentDetails";
import DoctorDetails from "@/components/Deatils/DoctorDetails";
// import MainAdminSettings from "./MainAdminSettings";

const HospitalAdmin = () => {
  const { username, id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [componentName, setComponentName] = useState("Dashboard");
  const authToken = localStorage.getItem("Hospital Admintoken");
  const { data: details } = useGetHospitalAdminDetailsQuery(authToken);
  const { data } = useTreatmentCrud(authToken);
  const {
    data: invoiceData,
    error: invoiceError,
    isLoading: isInvoiceLoading,
  } = useGetInvoicesQuery(authToken);
  const { data: doctorsData, isLoading, error } = useGetDoctorsQuery(authToken);

  const {
    data: patientsData,
    isLoading: loading,
    error: patientError,
  } = useGetAllPatientsAdminQuery(authToken);
  const operations = [
    {
      key: "1",
      label: "View",
      icon: <EyeOutlined />,
    },

    {
      key: "2",
      label: "Edit",
      icon: <EditOutlined />,
    },
    {
      key: "3",
      label: "Delete",
      icon: <DeleteOutlined />,
    },
  ];

  const handleClick = (e) => {
    navigate(`${e}/details`);
  };

  const {
    data: treatmentData,
    isLoading: isTreatmentLoading,
    error: treatmentError,
  } = useTreatmentCrud();

  const renderSectionComponent = () => {
    // const path = location.pathname.endsWith(`/mainadmin/${username}`);
    if (
      location.pathname.endsWith(`/hospitaladmin/${username}/dashboard`) ||
      location.pathname.endsWith(`/hospitaladmin/${username}`)
    ) {
      setComponentName("Dashboard");
      return <HospitalAdminDashboard />;
    }
    // }
    else if (
      location.pathname.endsWith(`/hospitaladmin/${username}/departments`)
    ) {
      setComponentName("Departments");
      return <DepartmentTable handleClick={handleClick} items={operations} />;
    } else if (
      location.pathname.endsWith(`/hospitaladmin/${username}/settings`)
    ) {
      setComponentName("Settings");
      return (
        <HospitalAdminSettings username={username} details={details?.admin} />
      );
    } else if (
      location.pathname.endsWith(`/hospitaladmin/${username}/medicines`)
    ) {
      setComponentName("Medicines");
      return <MedicineTable items={operations} />;
    } else if (
      location.pathname.endsWith(`/hospitaladmin/${username}/appointments`)
    ) {
      setComponentName("Appointments");
      return <AppointmentTable items={operations} />;
    } else if (
      location.pathname.endsWith(`/hospitaladmin/${username}/treatments`)
    ) {
      setComponentName("Treatments");

      return (
        <TreatmentTable
          data={treatmentData}
          error={treatmentError}
          isLoading={isTreatmentLoading}
          authToken={authToken}
        />
      );
    } else if (
      location.pathname.endsWith(`/hospitaladmin/${username}/doctors`)
    ) {
      setComponentName("Doctors");
      return (
        <DoctorTable
          details={doctorsData}
          authToken={authToken}
          loading={isLoading}
          error={error}
        />
      );
      // return <InvoiceTable />;
    } else if (
      location.pathname.endsWith(`/hospitaladmin/${username}/patients`)
    ) {
      setComponentName("Patients");
      return (
        <>
          <PatientsTable
            details={patientsData}
            error={patientError}
            authToken={authToken}
            loading={loading}
            ViewComponent={PatientDetails}
            type="admin"
          />
        </>
      );
    } else if (
      location.pathname.endsWith(`/hospitaladmin/${username}/invoices`)
    ) {
      setComponentName("Invoices");
      return (
        <InvoiceTable
          data={invoiceData}
          error={invoiceError}
          isLoading={isInvoiceLoading}
          authToken={authToken}
          type="admin"
        />
      );
    } else if (
      location.pathname.endsWith(`/hospitaladmin/${username}/patients/${id}`)
    ) {
      setComponentName("Patient Details");
      return <PatientDetails authToken={localStorage.getItem("Hospital Admintoken")} />;
    } else if (
      location.pathname.endsWith(`/hospitaladmin/${username}/departments/${id}`)
    ) {
      setComponentName("Department Details");
      return <DepartmentDetails id={id} />;
    } else if (
      location.pathname.endsWith(`/hospitaladmin/${username}/doctors/${id}`)
    ) {
      setComponentName("Doctor Details");
      return <DoctorDetails details={doctorsData}/>;
    } else if (
      location.pathname.endsWith(`/hospitaladmin/${username}/assign%20doctors`)
    ) {
      setComponentName("Assign Doctor");
      return <UnassignedDoctors />;
    }
  };

  const SidebarComponent = () => {
    return (
      <Sidebar
        type="hospitaladmin"
        username={username}
        options={hospitalAdminOptions}
      />
    );
  };
  const HeaderComponent = () => {
    return <Navbar name={username} />;
  };
  const SectionComponent = () => {
    return renderSectionComponent();
  };
  return (
    <PageWrapper
      SidebarComponent={SidebarComponent}
      HeaderComponent={HeaderComponent}
      SectionComponent={SectionComponent}
      componentName={componentName}
    />
  );
};

export default HospitalAdmin;
