import { Card } from "antd";
import React from "react";
import { TeamOutlined } from "@ant-design/icons";
const StyledCard = ({ cardType, title, Chart, Icon, count, subtitle }) => (
  <div className="bg-white flex-btn gap-4 rounded-xl border-[1px] border-border p-5 shadow-xl">
    <div className="w-3/4">
      <h2 className="text-base font-medium">{title}</h2>
      <h2 className="text-xl my-6 font-medium">{count}</h2>
      <p className="text-xs text-textGray">{subtitle}</p>
    </div>
    <div className="w-10 h-10 flex flex-col items-center justify-center bg-opacity-10 rounded-md text-yellow-500 bg-yellow-500">
      {<Icon style={{ fontSize: "16px" }} />}
    </div>
    {Chart}
  </div>
);

export default StyledCard;
