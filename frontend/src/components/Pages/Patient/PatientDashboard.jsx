import React, { useEffect, useState } from "react";
import TodayAppointments from "@/components/Pages/Doctor/TodayAppointments";
import SplineChart from "@/components/Charts/SplineChart";
import DashboardWrapper from "@/components/DashboardWrapper/DashboardWrapper";
import { useGetAllDoctorsByHospitalQuery, useGetPatientAllAppointmentsQuery } from "@/redux/services/api/patientApi";
import RecentPatients from "../Doctor/RecentPatients";
import AppointmentCards from "@/components/Card/AppointmentCards";
import { allMonths, calculateEarningsByMonth } from "@/utils/utils";
import GenTable from "@/components/Tables/GenTable";
import PopularDoctorTable from "../HospitalAdmin/PopularDoctorTable";
const PatinetDashboard = ({
  appointmentData,
  isSuccess,
  isLoading,
  error,
}) => {
  const [apointmentsByMONTH, setApointmentsByMONTH] = useState({});
  const authToken = localStorage.getItem("Patienttoken");
  const {
    data:doctorsData,
    isSuccess:doctorSuccess,
    isLoading:doctorLoading,
    error:doctorError,
  }=useGetAllDoctorsByHospitalQuery({authToken})
  useEffect(() => {
    if (appointmentData) {
      const monthCounts = appointmentData.reduce((acc, visitDate) => {
        const date = new Date(visitDate?.["AppointmentDate"]);
        const monthName = new Intl.DateTimeFormat("en-US", {
          month: "long",
        }).format(date);
        acc[monthName] = (acc[monthName] || 0) + 1;
        return acc;
      }, {});

      // Calculate earnings for each month
      const multipliedData = allMonths.reduce((acc, monthName) => {
        const count = monthCounts[monthName] || 0; // Set count to 0 if no visits in the month
        acc[monthName] = count;
        console.log(acc);
        return acc;
      }, {});
      setApointmentsByMONTH(multipliedData);
    }
  }, [appointmentData]);
  const labels = Object.keys(apointmentsByMONTH);
  const chartData = Object.values(apointmentsByMONTH);

  const MidComponent = () => {
    return (
      <div className="mt-5 w-full px-5 pb-5 ">
        <h1 className="font-bold text-xl"> Appointments</h1>
        <p className="text-gray-400">By month</p>
        {console.log(apointmentsByMONTH)}
        <div className="">
          <SplineChart
            labels={allMonths}
            data={chartData}
            label="Appointments"
          />
        </div>
      </div>
    );
  };


  return (
    <DashboardWrapper
      TopComponents={<AppointmentCards data={appointmentData} />}
      MiddleComponent={MidComponent()}
      SideComponent={
        <>
          <RecentPatients data={appointmentData} isSuccess={isSuccess} />
          <TodayAppointments
            data={appointmentData}
            isLoading={isLoading}
            isSuccess={isSuccess}
            error={error}
          />
        </>
      }
      BottomComponent={
        <div className=" bg-white">
          <h2 className="font-semibold text-xl mt-10 ml-10">Popular Doctors</h2>
          <PopularDoctorTable
            details={doctorsData}
            loading={doctorLoading}
            error={doctorError}
            authToken={authToken}
          />
        </div>
      }
    />
  );
};

export default PatinetDashboard;
