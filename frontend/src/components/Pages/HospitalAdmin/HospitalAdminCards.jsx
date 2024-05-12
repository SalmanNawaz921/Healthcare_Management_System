import ChartCard from "@/components/ChartCard/ChartCard";
import { useAppointmentCrud } from "@/hooks/useAppointmentCrud";
import { usePrescriptionCrud } from "@/hooks/usePrescriptionCrud";
import { useGetAppointmentsQuery } from "@/redux/services/api/appointmentApi";
import {
  useGetDepartmentEarningsQuery,
  useGetDoctorsQuery,
  useGetPrescriptionsQuery,
} from "@/redux/services/api/hospitalAdminApi";
import { allMonths, calculateEarningsByMonth } from "@/utils/utils";
import React from "react";

const HospitalAdminCards = () => {
  const authToken = localStorage.getItem("Hospital Admintoken");

  const { data: allPrescriptions } = useGetPrescriptionsQuery(authToken);
  const { data: allAppointments } = useGetAppointmentsQuery(authToken);
  const { data: allDoctors } = useGetDoctorsQuery(authToken);
  const { data: departmentEarnings } = useGetDepartmentEarningsQuery(authToken);
  const arr = [
    {
      title: "Total Appointments",
      count: allAppointments?.appointments?.length,
      data: calculateEarningsByMonth(
        allAppointments?.appointments,
        "AppointmentDate"
      ),
      // data: {},
      color: "gray",
      labels: allMonths,
      label: "Appointments",
    },
    {
      title: "Total Prescriptions",
      count: allPrescriptions?.length,
      data: calculateEarningsByMonth(allPrescriptions, "DateStarted"),
      // data: {},
      color: "lightgreen",
      labels: allMonths,
      label: "Prescriptions",
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
      title: "Departmental Earnings",
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
  return (
    <div className="w-full grid xl:grid-cols-4 gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
      {arr.map((obj) => (
        <ChartCard
          title={obj.title}
          bgColor={obj.color}
          totalCount={obj.count}
          data={obj.data}
          key={obj.title}
          labels={obj.labels}
          // label={obj.label}
        />
      ))}
    </div>
  );
};

export default HospitalAdminCards;
