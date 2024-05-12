import { Avatar, ConfigProvider, Menu } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";

const InfoComponent = ({
  fullName,
  email,
  phoneno,
  handleMenuClick,
  items,
  formName,
  img,
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            /* here is your component tokens */
            itemActiveBg: "#bfbfbf",
          },
        },
      }}
    >
      <Avatar size={128} src={img} />
      <div className="gap-2 flex-colo">
        <h2 className="text-sm font-semibold ">{fullName}</h2>

        <h2 className="text-xs text-textGray">{email}</h2>
        <p className="text-xs"> {phoneno}</p>
      </div>
      <Menu
        mode="vertical"
        className="flex-colo gap-3 px-2 xl:px-12 w-full"
        style={{ border: "none" }}
        items={items}
        onClick={handleMenuClick}
        defaultSelectedKeys={formName}
      />
    </ConfigProvider>
  );
};

export default InfoComponent;
