import { Avatar, Layout, Space } from "antd";
import { FaTrashAlt, FaUserAlt, FaUserEdit } from "react-icons/fa";
import { TiEdit } from "react-icons/ti";
import { UserOutlined } from "@ant-design/icons";

import PersonalInfo from "../SignUp/PersonalInfo";
import DragUpload from "../Form/DragUpload";
const { Header, Sider, Content } = Layout;
const DetailsWrapper = ({ LeftComponent, RightComponent }) => {
  return (
    // <Layout className="flex flex-row  justify-between gap-8">
    <Layout className="flex flex-row  justify-between gap-8">
      <div
        style={{
          width: "500px",
          height: "500px",
        }}
        className="bg-white ml-10"
      >
        <div
          style={{ padding: 24, minHeight: 360 }}
          className="flex flex-col gap-2 justify-center items-center"
        >
          <LeftComponent />
        </div>
      </div>

      <Content className="bg-white ml-[24px]">
        <div style={{ padding: 24, minHeight: 360 }}>
          {/* <DragUpload /> */}
          <RightComponent />
        </div>
      </Content>
    </Layout>
  );
};

export default DetailsWrapper;
