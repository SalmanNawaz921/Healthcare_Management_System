import SplineChart from "@/components/Charts/SplineChart";
import DashboardWrapper from "@/components/DashboardWrapper/DashboardWrapper";
import {
  useGetDepartmentEarningsQuery,
  useGetHospitalEarningsQuery,
  useGetPopularDoctorsQuery,
} from "@/redux/services/api/hospitalAdminApi";
import { allMonths, calculateEarningsByMonth } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import PopularDepartments from "./PopularDepartments";
import PopularDoctorTable from "./PopularDoctorTable";
import { useAppointmentCrud } from "@/hooks/useAppointmentCrud";
import HospitalAdminCards from "./HospitalAdminCards";

const HospitalAdminDashboard = () => {
  const { data: appointmentData } = useAppointmentCrud();

  const authToken = localStorage.getItem("Hospital Admintoken");
  const { data: hospitalEarnings } = useGetHospitalEarningsQuery(authToken);
  const {
    data: details,
    isLoading: loading,
    error,
  } = useGetPopularDoctorsQuery(authToken);

  const { data: departmentEarnings } = useGetDepartmentEarningsQuery(authToken);
  // const [details, setDetails] = useState(hospitalEarnings);
  const [earningsByMonth, setEarningsByMonth] = useState({});

  useEffect(() => {
    if (hospitalEarnings) {
      const earningsArr = calculateEarningsByMonth(
        hospitalEarnings,
        "Date",
        "Earnings"
      );
      // Update state with earnings by month
      setEarningsByMonth(earningsArr);
    }
  }, [hospitalEarnings]);
  const totalAppointments = appointmentData?.length;
  const appointents = calculateEarningsByMonth(
    appointmentData,
    "AppointmentDate"
  );

  // Create labels array with all months
  const labels = Object.keys(earningsByMonth);
  const appointmentLabels = Object.keys(appointents);
  // Convert data object to array
  const chartData = Object.values(earningsByMonth);
  return (
    <DashboardWrapper
      TopComponents={<HospitalAdminCards />}
      MiddleComponent={
        <div className="mt-5 w-full px-5 pb-5">
          <h1 className="font-bold text-xl"> Hospital Earnings</h1>
          <p className="text-gray-400">By month</p>
          <div className="">
            <SplineChart
              labels={allMonths}
              data={chartData}
              label="Hospital Earnings"
            />
          </div>
        </div>
      }
      SideComponent={
        <>
          <PopularDepartments data={departmentEarnings} />
        </>
      }
      BottomComponent={
        <div className="">
          <h2 className="font-semibold text-xl mt-10 ml-10">Popular Doctors</h2>
          <PopularDoctorTable
            details={details}
            loading={loading}
            error={error}
            authToken={authToken}
          />
        </div>
      }
    />
  );
};

export default HospitalAdminDashboard;
