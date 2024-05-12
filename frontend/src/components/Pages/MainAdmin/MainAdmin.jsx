import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import MainAdminDashboard from "./MainAdminDashboard";
import { adminOptions } from "@/constants/constants";
import { useState } from "react";
import HospitalTable from "@/components/Tables/HospitalTable";
import MainAdminSettings from "./MainAdminSettings";
import AdminsTable from "@/components/Tables/AdminTable";
import HospitalDetails from "@/components/Deatils/HospitalDetails";

const MainAdmin = () => {
  const { username,id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [componentName, setComponentName] = useState("Dashboard");
  const operations = [
    {
      key: "1",
      label: "View",
      icon: <EyeOutlined />,
    },

    {
      key: "2",
      label: "Edit",
      icon: <EditOutlined />,
    },
    {
      key: "3",
      label: "Delete",
      icon: <DeleteOutlined />,
    },
  ];

  const handleClick = (e) => {
    navigate(`${e}/details`);
  };

  const renderSectionComponent = () => {
    // const path = location.pathname.endsWith(`/mainadmin/${username}`);
    if (
      location.pathname.endsWith(`/mainadmin/${username}/dashboard`) ||
      location.pathname.endsWith(`/mainadmin/${username}`)
    ) {
      return <MainAdminDashboard />;
    } else if (location.pathname.endsWith(`/mainadmin/${username}/hospitals`)) {
      setComponentName("Hospitals");
      return <HospitalTable handleClick={handleClick} items={operations} />;
    } else if (location.pathname.endsWith(`/mainadmin/${username}/settings`)) {
      setComponentName("Settings");
      return <MainAdminSettings username={username} />;
    }
    else if (location.pathname.endsWith(`/mainadmin/${username}/admins`)) {
      setComponentName("Admins");
      return <AdminsTable handleClick={handleClick} items={operations} />;
    }
    else if (location.pathname.endsWith(`/mainadmin/${username}/hospitals/${id}`)) {
      setComponentName("Hospital Details");
      return <HospitalDetails handleClick={handleClick} items={operations} />;
    }
    // } else if (location.pathname.endsWith(`/MainAdmin/${username}/treatment`)) {
    //   return (
    //     <TreatmentTable handleClick={handleClick} items={patientOperations} />
    //   );
    // }
  };

  const SidebarComponent = () => {
    return (
      <Sidebar type="mainadmin" username={username} options={adminOptions} />
    );
  };
  const HeaderComponent = () => {
    return <Navbar name={username} />;
  };
  const SectionComponent = () => {
    return renderSectionComponent();
  };
  return (
    <PageWrapper
      SidebarComponent={SidebarComponent}
      HeaderComponent={HeaderComponent}
      SectionComponent={SectionComponent}
      componentName={componentName}
    />
  );
};

export default MainAdmin;
