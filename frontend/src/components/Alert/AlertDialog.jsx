import alertContext from "../../context/AlertContext/alertContext.js";
import { useContext } from "react";
import { Alert, Space } from "antd";

const AlertDialog = () => {
  const { alert } = useContext(alertContext);

  return (
    <div className="top-0 right-[35%] z-999 fixed w-[400px]  px-2 py-2">
      {alert && (
        // <Alert color={alert.color} icon={alert.icon}>
        //   <span className="font-medium">{alert.title}</span> {alert.text}
        // </Alert>
        <Space
          direction="vertical"
          style={{
            width: "100%",
          }}
        >
          <Alert
            message={alert.title + alert.text}
            type={alert.color}
            showIcon
          />
        </Space>
      )}
    </div>
  );
};

export default AlertDialog;
