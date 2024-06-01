import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {patientOptions } from "@/constants/constants";
import { useState } from "react";
import PatientsTable from "@/components/Tables/PatientsTable";
import AppointmentsCalendar from "@/components/AppointmentCalender/AppointmentsCalender";
import { useEffect } from "react";
import PrescriptionTable from "@/components/Tables/PrescriptionTable";
import PatientDetails from "@/components/Deatils/PatientDetails";
import PatientDashboard from "./PatientDashboard";
import { useGetAllDoctorsByHospitalQuery, useGetAllInvoicesPatientQuery, useGetAllPrescriptionsPatientQuery, useGetPatientAllAppointmentsQuery } from "@/redux/services/api/patientApi";
import InvoiceTable from "@/components/Tables/InvoiceTable";
import PatientSettings from "./PatientSettings";
import DoctorTableForPatient from "@/components/Tables/DoctorTableForPatient";


const Patient = () => {
  const { username } = useParams();
  const [componentName, setComponentName] = useState("Dashboard");
  const location = useLocation();
  const navigate = useNavigate();
  const authToken = localStorage.getItem("Patienttoken");
  const {
    data: appointmentData,
    isSuccess,
    isLoading,
    error,
  } = useGetPatientAllAppointmentsQuery(authToken);
  const {
    data: prescriptionData,
    isSuccess:success,
    isLoading:loading,
    error:prescriptionError,
  } = useGetAllPrescriptionsPatientQuery(authToken);
  const {
    data: invoiceData,
    isSuccess:invoiceSuccess,
    isLoading:invoiceLoading,
    error:invoiceError,
  } = useGetAllInvoicesPatientQuery(authToken);

  const {
    data:doctorsData,
    isSuccess:doctorSuccess,
    isLoading:doctorLoading,
    error:doctorError,
  }=useGetAllDoctorsByHospitalQuery({authToken})
  
  useEffect(() => {
    if (
      location.pathname.endsWith(`/patient/${username}/dashboard`) ||
      location.pathname.endsWith(`/patient/${username}`)
    ) {
      setComponentName("Dashboard");
    } else if (location.pathname.endsWith(`/patient/${username}/patients`)) {
      setComponentName("Patients");
    } else if (location.pathname.endsWith(`/patient/${username}/prescriptions`)) {
      setComponentName("Prescriptions");
    }else if (location.pathname.endsWith(`/patient/${username}/appointments`)) {
      setComponentName("Appointments");
    }else if (location.pathname.endsWith(`/patient/${username}/settings`)) {
      setComponentName("Settings");
    } else if (location.pathname.endsWith(`/patient/${username}/invoices`)) {
      setComponentName("Invoices");
    }
    else if (location.pathname.endsWith(`/patient/${username}/doctors`)) {
      setComponentName("Doctors");
    }
  }, [location.pathname, username]);

  const SidebarComponent = () => {
    return (
      <Sidebar type="patient" username={username} options={patientOptions} />
    );
  };
  const HeaderComponent = () => {
    return <Navbar name={username} />;
  };
  const SectionComponent = () => {
    if (componentName === "Dashboard") {
      return <PatientDashboard  appointmentData={appointmentData} isLoading={isLoading} isSuccess={isSuccess} error={error} details={doctorsData}/>;
    } 
    else if (componentName === "Patients") {
      return (       
           <PatientsTable
            details={patientsData}
            error={patientError}
            authToken={authToken}
            loading={loading}
            ViewComponent={PatientDetails}
          />
        );
      } 

      else if (componentName === "Appointments") {
        return (       
        <AppointmentsCalendar appointments={appointmentData} />
      );
    } 
      else if (componentName === "Invoices") {
          return (
            <InvoiceTable data={invoiceData} isLoading={invoiceLoading} error={invoiceError}  authToken={authToken} type="Patient"/>
          );
    } 
      else if (componentName === "Prescriptions") {
          return (
            <PrescriptionTable   data={prescriptionData} error={prescriptionError} loading={loading} authToken={authToken} type="Patient"/>
          );
    } 
      else if (componentName === "Doctors") {
          return (
            <DoctorTableForPatient   details={doctorsData} error={doctorError} loading={doctorLoading} authToken={authToken} type="Patient"/>
          );
    } 
    
    else if (componentName === "Settings") {
      return <PatientSettings username={username} />;
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

export default Patient;
