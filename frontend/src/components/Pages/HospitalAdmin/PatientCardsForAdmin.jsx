import StyledCard from "@/components/Card/Card";
import { patientCards } from "@/constants/constants";
import { useGetAllPatientsAdminQuery } from "@/redux/services/api/hospitalAdminApi";
import React, { useEffect, useState } from "react";

const PatientCardsForAdmin = () => {
  const { data } = useGetAllPatientsAdminQuery(
    localStorage.getItem("Hospital Admintoken")
  );

  const [patientsCount, setPatientsCount] = useState([]);
  const updatePatientsCount = async (patients) => {
    const todayCount = patients.filter(
      (patient) =>
        new Date(patient["Visit Date"]).toDateString() ===
        new Date().toDateString()
    ).length;

    const monthlyCount = patients.filter(
      (patient) =>
        new Date(patient["Visit Date"]).getMonth() === new Date().getMonth()
    ).length;
    const yearlyCount = patients.filter(
      (patient) =>
        new Date(patient["Visit Date"]).getFullYear() ===
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

export default PatientCardsForAdmin;
