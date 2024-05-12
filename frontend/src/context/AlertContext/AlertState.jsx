import { useState } from "react";
import AlertContext from "./alertContext";

const AlertState = (props) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (color, icon, title, text) => {
    setAlert({ color, icon, title, text });
    setTimeout(() => {
      setAlert(null); // Reset alert
    }, 2000);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
