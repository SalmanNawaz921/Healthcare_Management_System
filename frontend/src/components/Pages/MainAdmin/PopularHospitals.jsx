import SideCard from "@/components/SideCard/SideCard";
import { useHospitalCrud } from "@/hooks/useHospitalCrud";
import { sortDescending } from "@/utils/utils";
import { Card } from "antd";
import React from "react";

const PopularHospitals = ({data}) => {
  return (
    <Card className="bg-white rounded-xl border-[1px] border-border">
      <h2 className="font-poppins mb-4">Popular Hospitals</h2>
      {console.log(data)}
      {data?.slice()?.sort((a, b) => b?.Earnings - a?.Earnings)?.slice(0, 5)?.map((dep, i) => (
        <SideCard
          key={i}
          name={dep?.["Name"]}
          contact={dep?.["Email"]}
          time={dep?.["Contact"]}
        />
      ))}
    </Card>
  );
};

export default PopularHospitals;
