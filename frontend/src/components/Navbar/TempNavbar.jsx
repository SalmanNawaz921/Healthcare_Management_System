// import React from "react";
// import { Avatar, Button, Drawer } from "antd";
// import { useState } from "react";
// import { MenuOutlined } from "@ant-design/icons";
// import { useMediaQuery } from "react-responsive";
// import Sidebar from "../Sidebar/Sidebar";
// import logo from "@/assets/logo.png";
// import { Layout, Menu, theme } from "antd";
// const { Header, Content, Footer, Sider } = Layout;
// const Navbar = ({ name, imgUrl }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   let mobile = useMediaQuery({ query: "(max-width: 600px)" });
//   return (
//     <>
//       <div className="h-[80px] flex justify-end   sm:ml-0 sm:flex-wrap ">
//         <div className="flex items-center justify-between gap-[2px] mr-10">
//           <Avatar src={logo} size="large" className="border-cyan-950" />
//           <h3 className="ml-2 text-black">{name}</h3>
//           <h3>Logout</h3>
//         </div>
//         {mobile && (
//           <Button
//             icon={<MenuOutlined />}
//             onClick={() => setIsMenuOpen((prevState) => !prevState)}
//           />
//         )}
//       </div>
//       <nav
//         className="absolute left-0 w-[240px]"
//         style={{ width: "240px !important", position: "fixed", left: 0 }}
//       >
//         {!mobile && (
//           <Drawer
//             placement="left"
//             onClose={() => setIsMenuOpen((prevState) => !prevState)}
//             open={false}
//             // closable={false}
//             autoFocus={false}
//             width={240}
//             style={{
//               background:
//                 "linear-gradient(to top left, rgba(255, 255, 255, 2), #4e3ebb)",
//             }}
//             mask={false}
//           >
//             <Sidebar username={name} />
//           </Drawer>
//           // <Sider
//           //   breakpoint="lg"
//           //   collapsedWidth="0"
//           //   onBreakpoint={(broken) => {
//           //     console.log(broken);
//           //   }}
//           //   onCollapse={(collapsed, type) => {
//           //     console.log(collapsed, type);
//           //   }}
//           //   collapsible={true}
//           // >
//           // </Sider>
//         )}
//       </nav>
//     </>
//   );
// };

// export default Navbar;
