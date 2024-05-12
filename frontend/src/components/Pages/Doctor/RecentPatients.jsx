import React from "react";
import { useEffect } from "react";
import { Avatar, Card } from "antd";
import { sortDescending } from "@/utils/utils";
import { useState } from "react";

const RecentPatients = ({ data, isSuccess }) => {
  const [appointmentData, setAppointmentData] = useState(data);

  useEffect(() => {
    if (isSuccess) {
      const updatedData = sortDescending(data);
      setAppointmentData(updatedData);
    }
  }, [data]);
  return (
    <>
      {isSuccess && (
        <Card className="bg-white rounded-xl border-[1px] border-border">
          {console.log(data)}
          <h2 className="font-poppins mb-4">Recent Appointments</h2>
{console.log(data)}
          {data
            ?.filter(
              (appointment) => appointment?.["AppointmentStatus"]?appointment?.["AppointmentStatus"] === "Done":appointment?.["Status"]==="Done"
            )
            .slice(0, 5)
            .map((patient, i) => {
              return (
                <div
                  key={i}
                  className="flex flex-col mb-3 p-4 bg-white rounded-xl bo border-b-[1px] hover:shadow-md transition duration-300 ease-in-out cursor-pointer"
                >
                  <div className="flex flex-row justify-between">
                    <div className="flex gap-2">
                      <Avatar shape="square" size={32} />
                      <div className="flex flex-col">
                        <h2 className="text-[12px] font-poppins font-medium">
                          {patient["Full Name"]}
                        </h2>
                        <p className="text-xs text- text-gray-400">
                          {patient["Contact"]}
                        </p>
                      </div>
                    </div>
                    <p className="">{patient?.["AppointmentTime"]}</p>
                  </div>
                </div>
              );
            })}
        </Card>
      )}
    </>
  );
};

export default RecentPatients;
