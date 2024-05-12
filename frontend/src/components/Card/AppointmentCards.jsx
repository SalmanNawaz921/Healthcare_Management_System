import React from "react";
import StyledCard from "./Card";

import { appointmentCards } from "@/constants/constants";

const AppointmentCards = ({data}) => {

  const arr = [
    data?.length,
    data?.filter((d) => d?.["Status"] === "Pending").length,
    data?.filter((d) => d?.["Status"] === "Done").length,
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {appointmentCards?.map((appointment, i) => (
        <StyledCard
          key={i}
          Icon={appointment.Icon}
          count={arr[i]}
          subtitle={
            i === 0
              ? `${appointment?.subtitle} ${arr[i]}`
              : i === 1
              ? `${arr[i]} ${appointment?.subtitle} `
              : `${arr[i]} ${appointment?.subtitle}`
          }
          title={appointment?.label}
        />
      ))}
    </div>
  );
};

export default AppointmentCards;
