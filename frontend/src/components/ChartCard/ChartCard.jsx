import React from "react";
import { Card } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import ChartComponent from "../Charts/ChartComponent";
import { allMonths } from "@/utils/utils";

const ChartCard = ({
  Icon,
  title,
  Chart,
  totalCount,
  data,
  label,
  bgColor,
  labels,
}) => {
  return (
    <Card className=" bg-white rounded-xl border-[1px] border-border p-5 shadow-lg">
      <div className="flex gap-4 items-center">
        <div className="w-10 h-10 flex flex-col items-center justify-center bg-opacity-10 rounded-md text-subMain bg-red-500">
          {Icon || <TeamOutlined style={{ fontSize: "24px" }} />}
        </div>
        <h2 className="text-base font-medium">{title || "Total Hospitals"}</h2>
      </div>
      <div className="flex flex-row justify-between mt-4 bg-dry py-4 px-2 items-center rounded-xl">
        <div className="w-[80%]">
          <div className="px-4">
            {Chart || (
              <ChartComponent
                labels={labels || allMonths}
                data={data}
                label={label}
                backgroundColor={bgColor}
                borderColor="white"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col ">
          <h4 className=" text-2xl font-medium font-poppins">
            {totalCount > 1000 ? "1000+" : totalCount + "+"}
          </h4>
          <p className="text-sm flex gap-2 text-subMain">{label}</p>
        </div>
      </div>
    </Card>
  );
};

export default ChartCard;
