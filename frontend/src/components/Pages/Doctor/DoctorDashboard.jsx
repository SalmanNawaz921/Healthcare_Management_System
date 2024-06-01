import React, { useEffect, useState } from "react";
import PatientsCards from "./PatientsCards";
import RecentPatients from "./RecentPatients";
import TodayAppointments from "./TodayAppointments";
import SplineChart from "@/components/Charts/SplineChart";
import {
  useGetAllPatientsQuery,
  useGetDoctorVisitsQuery,
  useGetTreatmentsByDepartmentQuery,
} from "@/redux/services/api/doctorApi";
import { allMonths } from "@/utils/utils";
import DashboardWrapper from "@/components/DashboardWrapper/DashboardWrapper";
import TreatmentsTable from "@/components/Tables/TreatmentsTable";
const DoctorDashboard = ({ consultationFee }) => {
  const authToken = localStorage.getItem("Doctortoken");
  const { data: details } = useGetDoctorVisitsQuery(authToken);

  const {
    data: patientData,
    isSuccess,
    isLoading,
    error,
  } = useGetAllPatientsQuery(authToken);
  const [earnings, setEarnings] = useState({});

  const {
    data,
    isLoading: loading,
    error: treatmentError,
  } = useGetTreatmentsByDepartmentQuery(authToken);

  // Calculate multiplied consultation fees for each month
  useEffect(() => {
    if (details) {
      // Extract months from visit dates and count occurrences
      const monthCounts = details.reduce((acc, visitDate) => {
        const date = new Date(visitDate.VisitDate);
        const monthName = new Intl.DateTimeFormat("en-US", {
          month: "long",
        }).format(date);
        acc[monthName] = (acc[monthName] || 0) + 1;
        return acc;
      }, {});

      // Calculate earnings for each month
      const multipliedData = allMonths.reduce((acc, monthName) => {
        const count = monthCounts[monthName] || 0; // Set count to 0 if no visits in the month
        acc[monthName] = count * consultationFee;
        return acc;
      }, {});

      setEarnings(multipliedData);
    }
  }, []);

  // Create labels array with all months
  const labels = Object.keys(earnings);

  // Convert data object to array
  const chartData = Object.values(earnings);

  const MidComponent = () => {
    return (
      <div className="mt-5 w-full px-5 pb-5 ">
        <h1 className="font-bold text-xl"> Earning Reports</h1>
        <p className="text-gray-400">By month</p>
        <div className="">
          <SplineChart
            labels={allMonths}
            data={chartData}
            label="Doctor Earnings"
          />
        </div>
      </div>
    );
  };

  return (
    <DashboardWrapper
      TopComponents={<PatientsCards />}
      MiddleComponent={MidComponent()}
      SideComponent={
        <>
          <div className="shadow-2xl rounded-2xl">
            <RecentPatients
              data={patientData}
              isLoading={isLoading}
              isSuccess={isSuccess}
            />
          </div>
          <div className="shadow-2xl rounded-2xl">
            <TodayAppointments
              data={patientData}
              isLoading={isLoading}
              isSuccess={isSuccess}
              error={error}
            />
          </div>
        </>
      }
      BottomComponent={
        <div className="">
          <h2 className="font-semibold font-poppins text-xl ml-10">
            Popular Treatments
          </h2>
          <TreatmentsTable
            data={data}
            error={treatmentError}
            isLoading={isLoading}
            authToken={authToken}
            noShow={true}
            type="doctor"
          />
        </div>
      }
    />
  );
};

export default DoctorDashboard;
