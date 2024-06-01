import { useEffect } from "react";
import { Card, Steps } from "antd";
import { isEqualToToday } from "@/utils/utils";
const { Step } = Steps;

const TodayAppointments = ({data,isLoading,error,isSuccess}) => {
  const generateStepItems = (appointments) => {
    const appointmentsPending=appointments?.filter((appointment)=>appointment["AppointmentStatus"]==="Pending")
    return appointmentsPending
      ?.slice(0, 5)
      .map((appointment, index) => {
        if (isEqualToToday(appointment["AppointmentDate"]) === true) {
          const hoursLeft = appointment?.["HourDifference"];
          if (hoursLeft < 0 ) return null; // Skip if the appointment is already over
          const stepItem = {
            key: index,
            title: (
              <>
                <div className="mb-4 flex items-center justify-center">
                  <div className="ml-6">
                    <h2>{appointment["Full Name"]}</h2>
                    <span>{appointment?.["AppointmentTime"]}</span>
                  </div>
                </div>
              </>
            ),
          };
          return { hoursLeft, stepItem };
        } else {
          return null;
        }
      })
      .filter((item) => item !== null); // Filter out null items
  };

  const stepItems = generateStepItems(data);
  useEffect(() => {}, [data]);
  return (
    <>
      {isSuccess && (
        <Card className="bg-white rounded-xl border-[1px] border-border p-5 xl:mt-6">
          <h2 className="font-poppins mb-6">Today Appointments</h2>
          <div className="flex gap-8">
            <div className="flex flex-col whitespace-nowrap gap-[52px] text-xs">
              {stepItems.map(({ hoursLeft }, index) => (
                <p key={index}>{hoursLeft} hrs left</p>
              ))}
            </div>
            <Steps direction="vertical" size="small" current={0}>
              {stepItems.map(({ stepItem }) => (
                <Step {...stepItem} />
              ))}
            </Steps>
          </div>
        </Card>
      )}
    </>
  );
};

export default TodayAppointments;
