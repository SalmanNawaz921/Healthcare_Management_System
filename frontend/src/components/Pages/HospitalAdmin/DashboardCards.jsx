import ChartCard from "@/components/ChartCard/ChartCard";
import { usePrescriptionCrud } from "@/hooks/usePrescriptionCrud";
import { allMonths } from "@/utils/utils";
import React from "react";

const DashboardCards = () => {
  // const
  const { data: prescriptions } = usePrescriptionCrud();
  return (
    <div className="w-full grid xl:grid-cols-4 gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
      <ChartCard
        totalCount={totalAppointments}
        title="Total Appointments"
        label="Appointments"
        data={appointents}
        labels={allMonths}
        // data={data?.appointments?.map(())}
        bgColor="red"
      />
      <ChartCard
        bgColor="yellow"
        totalCount="25"
        title="Total Prescriptions"
        label="Prescriptions"
      />
      <ChartCard />
      <ChartCard />
    </div>
  );
};

export default DashboardCards;
