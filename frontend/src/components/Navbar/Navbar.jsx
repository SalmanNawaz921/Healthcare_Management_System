import React from "react";
import { Avatar, Button, Drawer, Dropdown } from "antd";
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import Sidebar from "../Sidebar/Sidebar";
import logo from "@/assets/logo.png";
import { Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;
const Navbar = ({ name, isMenuOpen, setIsMenuOpen }) => {
  let mobile = useMediaQuery({ query: "(max-width: 1200px)" });
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      ),
    },
  ];
  return (
    <>
      <div
        className={`h-[80px] flex ${
          mobile === false ? "justify-end" : "justify-between"
        } sm:ml-0 sm:flex-wrap `}
      >
        {mobile && (
          <Button
            icon={<MenuOutlined />}
            onClick={() => setIsMenuOpen((prevState) => !prevState)}
            className="mt-5"
          />
        )}
        <div className="flex items-center justify-between gap-[2px] mr-10">
          <Dropdown
            menu={{ items }}
            placement="bottom"
            overlayStyle={{ background: "none" }}
          >
            <Avatar src={logo} size="large" className="border-cyan-950" />
          </Dropdown>
          <h3 className="ml-2 text-black">{name}</h3>
        </div>
      </div>
    </>
  );
};

export default Navbar;
