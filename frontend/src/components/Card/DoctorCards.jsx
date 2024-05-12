import React from "react";
import StyledCard from "./Card";
import {
  useGetDoctorsEarningsQuery,
  useGetDoctorsQuery,
} from "@/redux/services/api/hospitalAdminApi";
import { doctorCards } from "@/constants/constants";

const DoctorCards = ({allDoctors}) => {
  const authToken = localStorage.getItem("Hospital Admintoken");
  const { data } = useGetDoctorsEarningsQuery(authToken);
  // const { data: allDoctors } = useGetDoctorsQuery(authToken);

  const arr = [
    allDoctors?.length,
    allDoctors?.filter((d) => d.Status === "Free").length,
    Math.floor(
      data?.reduce((acc, cur) => acc + cur?.Earnings, 0) 
    ),
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {doctorCards?.map((doctor, i) => (
        <StyledCard
          key={i}
          Icon={doctor.Icon}
          count={arr[i]}
          subtitle={
            i === 0
              ? `${doctor?.subtitle} ${arr[i]} doctors`
              : i === 1
              ? `${doctor?.subtitle} ${arr[i]}`
              : `${arr[i]} ${doctor?.subtitle}`
          }
          title={doctor?.label}
        />
      ))}
    </div>
  );
};

export default DoctorCards;
