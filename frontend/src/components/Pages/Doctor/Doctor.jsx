import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DoctorDashboard from "./DoctorDashboard";
import TreatmentTable from "@/components/Tables/TreatmentTable";
import DoctorSettings from "./DoctorSettings";
import { doctorOptions } from "@/constants/constants";
import {
  useGetAllPatientsQuery,
  useGetAppointmentsDoctorQuery,
  useGetDoctorDetailsQuery,
  useGetTreatmentsByDepartmentQuery,
} from "@/redux/services/api/doctorApi";
import { useState } from "react";
import PatientsTable from "@/components/Tables/PatientsTable";
import AppointmentsCalendar from "@/components/AppointmentCalender/AppointmentsCalender";
import { useEffect } from "react";
import PrescriptionTable from "@/components/Tables/PrescriptionTable";
import PatientDetails from "@/components/Deatils/PatientDetails";
import { usePrescriptionCrud } from "@/hooks/usePrescriptionCrud";

const Doctor = () => {
  const { username,id } = useParams();
  const [componentName, setComponentName] = useState("Dashboard");
  const location = useLocation();
  const navigate = useNavigate();
  const authToken = localStorage.getItem("Doctortoken");
  const { data: details } = useGetDoctorDetailsQuery({ authToken });
  const {
    data: patientsData,
    isLoading: loading,
    error: patientError,
  } = useGetAllPatientsQuery(authToken);
  const { data: appointments } = useGetAppointmentsDoctorQuery(authToken);
  const { data, isLoading, error } =
    useGetTreatmentsByDepartmentQuery(authToken);
  const {
    data: prescriptionData,
    loading: prescriptionLoading,
    error: prescriptionError,
  } = usePrescriptionCrud();
  useEffect(() => {
    if (
      location.pathname.endsWith(`/doctor/${username}/dashboard`) ||
      location.pathname.endsWith(`/doctor/${username}`)
    ) {
      setComponentName("Dashboard");
    } else if (location.pathname.endsWith(`/doctor/${username}/patients`)) {
      setComponentName("Patients");
    } else if (
      location.pathname.endsWith(`/doctor/${username}/prescriptions`)
    ) {
      setComponentName("Prescriptions");
    } else if (location.pathname.endsWith(`/doctor/${username}/appointments`)) {
      setComponentName("Appointments");
    } else if (location.pathname.endsWith(`/doctor/${username}/settings`)) {
      setComponentName("Settings");
    } else if (location.pathname.endsWith(`/doctor/${username}/treatments`)) {
      setComponentName("Treatments");
    } else if (location.pathname.endsWith(`/doctor/${username}/patients/${id}`)) {
      setComponentName("Patient Details");
    }
  }, [location.pathname, username]);

  const SidebarComponent = () => {
    return (
      <Sidebar type="doctor" username={username} options={doctorOptions} />
    );
  };
  const HeaderComponent = () => {
    return <Navbar name={username} />;
  };
  const SectionComponent = () => {
    if (componentName === "Dashboard") {
      return <DoctorDashboard consultationFee={details?.["ConsultationFee"]} />;
    } else if (componentName === "Patients") {
      return (
        <PatientsTable
          details={patientsData}
          error={patientError}
          authToken={authToken}
          loading={loading}
          ViewComponent={PatientDetails}
          type="doctor"
        />
      );
    } else if (componentName === "Appointments") {
      return <AppointmentsCalendar appointments={appointments} />;
    } else if (componentName === "Treatments") {
      return (
        <TreatmentTable
          data={data}
          isLoading={isLoading}
          error={error}
          authToken={authToken}
          type="Doctor"
        />
      );
    } else if (componentName === "Prescriptions") {
      return (
        <PrescriptionTable
          data={prescriptionData}
          error={prescriptionError}
          loading={prescriptionLoading}
          authToken={authToken}
        />
      );
    } else if (componentName === "Settings") {
      return <DoctorSettings username={username} />;
    }
     else if (componentName === "Patient Details") {
      return <PatientDetails  authToken={authToken}/>;
    }
    return null;
  };

  return (
    <>
      <PageWrapper
        SidebarComponent={SidebarComponent}
        HeaderComponent={HeaderComponent}
        SectionComponent={SectionComponent}
        componentName={componentName}
      />
    </>
  );
};

export default Doctor;
