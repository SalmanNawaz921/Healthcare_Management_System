import React, { useState, useEffect } from "react";
import { Calendar, Badge } from "antd";

const AppointmentsCalendar = ({ appointments }) => {
  const [appointmentsData, setAppointmentsData] = useState({});
  useEffect(() => {
    // Organize appointment data into a format compatible with Ant Design Calendar
    const formattedData = {};
    appointments?.forEach((appointment) => {
      const appointmentDate = new Date(appointment?.AppointmentDate);
      const year = appointmentDate.getUTCFullYear();
      const month = String(appointmentDate.getUTCMonth() + 1).padStart(2, '0'); // Add leading zero if single digit
      const day = String(appointmentDate.getUTCDate()).padStart(2, '0'); // Add leading zero if single digit
      const dateString = `${year}-${month}-${day}`;
    
      if (!formattedData[dateString]) {
        formattedData[dateString] = [];
      }
      formattedData[dateString].push(appointment);
    });
    
    setAppointmentsData(formattedData);
  }, [appointments]);

  const dateCellRender = (value) => {
    const dateString = value.format("YYYY-MM-DD");
    const appointments = appointmentsData[dateString];
    return (
      <ul>
        {appointments &&
          appointments?.map((appointment) => (
            <li key={appointment.AppointmentID}>
              <Badge status={appointment?.["Status"]==="Done"?`success`:`processing`} text={appointment?.["Full Name"]?appointment?.["Full Name"]: appointment?.["Patient"]?appointment?.["Patient"]:"" } />
            </li>
          ))}
      </ul>
    );
  };

  const cellRender=(current,info)=>{
    if(info.type==="date")
      return dateCellRender(current)
  }
  return (
    <div
      style={{
        width: "100%",
        border: "1px solid #d9d9d9",
        borderRadius: "2px",
      }}
    >
      <Calendar cellRender={cellRender} />
    </div>
  );
};

export default AppointmentsCalendar;
