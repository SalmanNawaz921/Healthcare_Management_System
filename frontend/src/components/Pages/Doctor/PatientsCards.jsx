import React, { useEffect, useState } from "react";
import StyledCard from "@/components/Card/Card";
import { patientCards } from "@/constants/constants";
import { useGetAllPatientsQuery } from "@/redux/services/api/doctorApi";

const PatientsCards = () => {
  const { data } = useGetAllPatientsQuery(localStorage.getItem("Doctortoken"));

  const [patientsCount, setPatientsCount] = useState([]);
  const updatePatientsCount = async (patients) => {
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0); // Start of today
    const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, 0); // Start of next day
    
    const todayCount = patients.filter(
      (patient) => {
        const appointmentDate = new Date(patient?.["AppointmentDate"]);
        return appointmentDate >= todayStart && appointmentDate < todayEnd;
      }
    ).length;
    

    const monthlyCount = patients.filter(
      (patient) =>
        new Date(patient["AppointmentDate"]).getUTCMonth() ===
        new Date().getMonth()
    ).length;
    const yearlyCount = patients.filter(
      (patient) =>
        new Date(patient["AppointmentDate"]).getUTCFullYear() ===
        new Date().getFullYear()
    ).length;

    setPatientsCount([todayCount, monthlyCount, yearlyCount]);
  };

  useEffect(() => {
    if (data) {
      updatePatientsCount(data);
    }
  }, [data]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {patientCards.map((patient, i) => (
        <StyledCard
          title={patient.label}
          Icon={patient.Icon}
          count={patientsCount[i]}
          key={i}
          subtitle={`Total Patients ${patientsCount[i]} ${
            patient.label.includes("Today")
              ? "today"
              : "this " + patient.label.toLowerCase().split(" ")[0].slice(0, -2)
          }`}
        />
      ))}
    </div>
  );
};

export default PatientsCards;
