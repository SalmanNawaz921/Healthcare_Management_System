import { useDepartmentCrud } from "@/hooks/useDepartmentCrud";
import React from "react";
import StyledCard from "./Card";
import {
  useGetDepartmentEarningsQuery,
  useGetDoctorsQuery,
} from "@/redux/services/api/hospitalAdminApi";
import { departmentCards, hospitalCards } from "@/constants/constants";
import { useGetAllDoctorsQuery, useGetAllEarningsQuery } from "@/redux/services/api/adminApi";

const HospitalCards = () => {
  const authToken = localStorage.getItem("Main Admintoken");
  const { data: allEarnings } = useGetAllEarningsQuery(authToken);
  const { data: allDoctors } = useGetAllDoctorsQuery(authToken);

  const arr = [
    allEarnings?.length,
    allDoctors?.length,
    allEarnings?.reduce((acc, cur) => acc + cur?.Earnings, 0),
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {hospitalCards?.map((department, i) => (
        <StyledCard
          key={i}
          Icon={department.Icon}
          count={arr[i]}
          subtitle={
            i === 0
              ? `${department?.subtitle} ${arr[i]} departments`
              : i === 1
              ? `${department?.subtitle} ${arr[i]}`
              : `${arr[i]} ${department?.subtitle}`
          }
          title={department?.label}
        />
      ))}
    </div>
  );
};

export default HospitalCards;
