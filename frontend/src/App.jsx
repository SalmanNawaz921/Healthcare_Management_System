import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import AlertState from "./context/AlertContext/AlertState";
import AlertDialog from "./components/Alert/AlertDialog";
import { userComponents, users, userOptions } from "./constants/constants";
import React,{ useContext } from "react";
import roleContext from "./context/RoleContext/roleContext";
const App = () => {
  const isAuthenticated = () => {
    const { role } = useContext(roleContext);
    const user = users.find((user) => user.value === role);
    if (!user) {
      return false;
    } // Return false if user is not found

    const authToken = localStorage.getItem(`${user.name}token`);
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
        {users.map((user, userIndex) => {
          const userName = user.name.replace(" ", "");
          const smallUserName = userName.toLowerCase();
          const CapitalizedUserName = userComponents[smallUserName];
          return (
            <React.Fragment key={userIndex}>
              {userOptions[smallUserName]?.map((option, optionIndex) =>
                [
                  `/${smallUserName}/:username`,
                  `/${smallUserName}/:username/${option.label.toLowerCase()}`,
                  `/${smallUserName}/:username/${option.label.toLowerCase()}/:id`,
                ].map((path, pathIndex) => (
                  <Route
                    key={`${userIndex}-${optionIndex}-${pathIndex}`}
                    path={path}
                    element={
                      isAuthenticated() ? (
                        <CapitalizedUserName />
                      ) : (
                        <Navigate to="/" />
                      )
                    }
                  />
                ))
              )}
            </React.Fragment>
          );
        })}
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </AlertState>
  );
};

export default App;
