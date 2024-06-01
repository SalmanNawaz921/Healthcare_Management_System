import ChartCard from "@/components/ChartCard/ChartCard";
import SplineChart from "@/components/Charts/SplineChart";
import DashboardWrapper from "@/components/DashboardWrapper/DashboardWrapper";
import {
  useGetAllEarningsMonthlyQuery,
  useGetAllEarningsQuery,
} from "@/redux/services/api/adminApi";
import { allMonths, calculateEarningsByMonth } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import PopularHospitals from "./PopularHospitals";
import MainAdminCards from "./MainAdminCards";

const MainAdminDashboard = () => {
  const authToken = localStorage.getItem("Main Admintoken");
  const { data: hospitalEarnings } = useGetAllEarningsQuery(authToken);
  const {data}=useGetAllEarningsMonthlyQuery(authToken);
  const [earningsByMonth, setEarningsByMonth] = useState({});

  useEffect(() => {
    if (data) {
      const earningsArr = calculateEarningsByMonth(
        data,
        "Date",
        "Earnings"
      );
      // Update state with earnings by month
      setEarningsByMonth(earningsArr);
    }
  }, [data]);

  // const labels = Object.keys(hospitalEarnings);
  const labels = hospitalEarnings?.map((item) => item.Name);
  const chartData = hospitalEarnings?.map((item) => item.Earnings);
  // // Convert data object to array
  const splineData = Object.values(earningsByMonth);
  return (
    <DashboardWrapper
      TopComponents={
        <MainAdminCards />
      }
      MiddleComponent={
        <div className="mt-5 w-full px-5 pb-5">
          <h1 className="font-bold text-xl"> All Hospitals Earnings</h1>
          <p className="text-gray-400">By month</p>
          <div className="">
            <SplineChart
              labels={allMonths}
              data={splineData}
              label="Earnings By Hospitals"
            />
          </div>
        </div>
      }
      SideComponent={
        <>
          <PopularHospitals data={hospitalEarnings}/>
        </>
      }
   
    />
  );
};

export default MainAdminDashboard;
