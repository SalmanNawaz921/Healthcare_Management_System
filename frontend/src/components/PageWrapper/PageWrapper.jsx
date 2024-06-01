import React, { useState } from "react";
import { Drawer, Layout } from "antd";
import { useMediaQuery } from "react-responsive";
import Navbar from "../Navbar/Navbar";
import { useParams } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const PageWrapper = ({
  SidebarComponent,
  SectionComponent,
  componentName,
}) => {
  let mobile = useMediaQuery({ query: "(max-width: 1200px)" });
  const [menuOpen, setMenuOpen] = useState(!mobile?true:false);
  const { username } = useParams();
  return (
    <Layout className=" min-h-screen ">
      {!mobile && (
        <Sider
          style={{
            background: "white",
            position: "sticky",
          }}
          width={275}
        >
          <SidebarComponent/>
        </Sider>
      )}
      {mobile && (
        <Drawer
          style={{
            background: "white",
            position: "sticky",
          }}
          width={275}
          collapsed={menuOpen}
          onCollapse={() => setMenuOpen(!menuOpen)}
          open={menuOpen}
          placement="left"
          onClose={() => setMenuOpen(false)}
        >
          <SidebarComponent setMenuOpen={setMenuOpen}/>
        </Drawer>
      )}
      <Layout className="">
        <Header className="bg-transparent">
          <Navbar
            name={username}
            isMenuOpen={menuOpen}
            setIsMenuOpen={setMenuOpen}
            mobile={mobile}
          />
        </Header>
        <Content className="xs:px-8 px-2 pt-10 ">
          <div className="px-12">
            <h1 className="text-bold font-bold text-2xl mb-10 ml-3">
              {componentName}
            </h1>
            <SectionComponent />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PageWrapper;
