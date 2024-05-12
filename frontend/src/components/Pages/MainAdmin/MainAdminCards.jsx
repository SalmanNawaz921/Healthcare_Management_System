import ChartCard from "@/components/ChartCard/ChartCard";
import {
  useGetAllAdminsQuery,
  useGetAllDoctorsQuery,
  useGetAllEarningsQuery,
  useGetMainAdminDoctorsQuery,
} from "@/redux/services/api/adminApi";
import { allMonths, calculateEarningsByMonth } from "@/utils/utils";
import React from "react";

const MainAdminCards = () => {
  const authToken = localStorage.getItem("Main Admintoken");
  const { data: allDoctors } = useGetMainAdminDoctorsQuery(authToken);
  const { data: departmentEarnings } = useGetAllEarningsQuery(authToken);
  const { data: allAdmins } = useGetAllAdminsQuery(authToken);
  const arr = [
    {
      title: "Total Admins",
      count: allAdmins?.length,
      data: calculateEarningsByMonth(allAdmins, "JoinDate"),
      color: "lightgreen",
      labels: allMonths,
      label: "Admins",
    },
    {
      title: "Total Doctors",
      count: allDoctors?.length,
      data: calculateEarningsByMonth(allDoctors, "Joining Date"),
      color: "pink",
      labels: allMonths,
      label: "Doctors",
    },
    {
      title: "Hospital Earnings",
      count: departmentEarnings?.reduce(
        (acc, curr) => acc + curr?.["Earnings"],
        0
      ),
      // data:{},
      data: departmentEarnings?.map((item) => item.Earnings),
      labels: departmentEarnings?.map((item) => item.Name),
      color: "skyblue",
      label: "Earnings",
    },
  ];

  // Check if all data is available
  if (!allDoctors || !departmentEarnings || !allAdmins) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full grid xl:grid-cols-3 gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
      {console.log(departmentEarnings?.map((item) => item.Earnings))}
      {arr.map((obj, i) => (
        <ChartCard
          title={obj?.title}
          bgColor={obj?.color}
          totalCount={obj?.count}
          data={obj?.data}
          key={obj?.title}
          labels={ obj?.labels}
          // label={obj.label}
        />
      ))}
    </div>
  );
};

export default MainAdminCards;

// export default MainAdminCards;
