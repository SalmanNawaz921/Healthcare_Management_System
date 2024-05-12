import {
  Route,
  Routes,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
// import Dashboard from "./components/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import AlertState from "./context/AlertContext/AlertState";
import AlertDialog from "./components/Alert/AlertDialog";
import RoleState from "./context/RoleContext/RoleState";
import {
  doctorOptions,
  userComponents,
  users,
  adminOptions,
  hospitalAdminOptions,
  userOptions,
} from "./constants/constants";
import MainAdminDashboard from "./components/Pages/MainAdmin/MainAdmin";
import Doctor from "./components/Pages/Doctor/Doctor";
import Patient from "./components/Pages/Patient/Patient";
import DoctorsTable from "./components/Admin_Dashboard/DoctorsTable";
import Navbar from "./components/Navbar/Navbar";
import { useContext, useEffect, useState } from "react";
import roleContext from "./context/RoleContext/roleContext";
import MainAdmin from "./components/Pages/MainAdmin/MainAdmin";
import HospitalAdmin from "./components/Pages/HospitalAdmin/HospitalAdmin";
import PatientDetails from "./components/Deatils/PatientDetails";
const App = () => {
  const isAuthenticated = () => {
    const { role } = useContext(roleContext);
    // if (!role) return false; // Return false if role is not set yet
    console.log(role);
    const user = users.find((user) => user.value === role);
    if (!user) {
      return false;
    } // Return false if user is not found
    
    console.log("Userfound");
    const authToken = localStorage.getItem(`${user.name}token`);
    console.log(!!authToken);
    return !!authToken; // Convert authToken to a boolean value
  };

  return (
    <AlertState>
      <AlertDialog />
      <Routes>
        {["/login", "/"].map((path, index) => (
          <Route path={path} key={index} element={<Login />} />
        ))}

        {/* For The Routing of Users */}
        {users.map((user) => {
          const userName = user.name.replace(" ", "");
          const smallUserName = userName.toLowerCase();
          const CapitalizedUserName = userComponents[smallUserName];
          return (
            <>
              {userOptions[smallUserName]?.map((option, i) =>
                [
                  `/${smallUserName}/:username`,
                  `/${smallUserName}/:username/${option.label.toLowerCase()}`,
                  `/${smallUserName}/:username/${option.label.toLowerCase()}/:id`,
                ].map((path, i) => (
                  <Route
                    key={i}
                    path={path}
                    // element={<CapitalizedUserName />}
                    // element={CapitalizedUserName}
                    element={
                      isAuthenticated() ? (
                        <CapitalizedUserName />
                      ) : (
                        <Navigate to="/" /> // Redirect unauthorized users to the login page
                      )
                    }
                  />
                ))
              )}
            </>
          );
        })}

        {/* export const users = [
  { value: 1, name: "Main Admin" },
  { value: 2, name: "Hospital Admin" },
  { value: 3, name: "Doctor" },
  { value: 4, name: "Patient" },
]; */}


        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </AlertState>
  );
};

export default App;
