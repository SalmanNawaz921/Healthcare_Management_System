import React from "react";
import { Avatar } from "antd";

const SideCard = ({ name, contact, time }) => {
  return (
    <div className="flex flex-col mb-3 p-4 bg-white rounded-xl bo border-b-[1px] hover:shadow-md transition duration-300 ease-in-out cursor-pointer  ">
      <div className="flex flex-row justify-between">
        <div className="flex gap-1">
          <Avatar shape="square" size={32} />
          <div className="flex flex-col">
            <h2 className="text-[12px] font-poppins font-medium whitespace-nowrap">{name.slice(0,24)}</h2>
            <p className="text-xs text- text-gray-400">{contact}</p>
          </div>
        </div>
        <p className="text-xs whitespace-nowrap">{time}</p>
      </div>
    </div>
  );
};
export default SideCard;
