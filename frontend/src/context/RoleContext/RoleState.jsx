import { useState } from "react";
import RoleContext from "./roleContext";
import { useNavigate } from "react-router-dom";
const RoleState = (props) => {
  const [role, setRole] = useState(parseInt(localStorage.getItem("selectedRole")) ||1);
  const navigate = useNavigate();
  const navigateBaseOnRole = function (roleNum, username) {
    if (roleNum === 1) {
      setRole(1);
      navigate(`mainadmin/${username}`);
    } else if (roleNum === 2) {
      setRole(2);
      navigate(`hospitaladmin/${username}`);
    } else if (roleNum === 3) {
      setRole(3);
      navigate(`doctor/${username}`);
    } else if (roleNum === 4) {
      setRole(4);
      navigate(`patient/${username}`);
    }
  };

  const saveRole = (val) => {
    setRole(val);
  };
  return (
    <RoleContext.Provider value={{ role, navigateBaseOnRole, saveRole }}>
      {props.children}
    </RoleContext.Provider>
  );
};

export default RoleState;
