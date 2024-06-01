import React, { useEffect, useState } from "react";
import StyledCard from "@/components/Card/Card";
import { treatmentCards } from "@/constants/constants";
const TreatmentCards = ({ data }) => {
  const [treatmentData, setTreatmentData] = useState([]);
  const updateTreatmentData = async (treatment) => {
    const totalCost = treatment.reduce((acc, curr) => acc + curr["Cost"], 0);
    const totalTreatments = treatment.length;
    const durationArray = treatment.map((item) =>
      parseInt(item["Duration"].split(" ")[0])
    );
    let avgDuration =
      durationArray.reduce((acc, curr) => acc + curr, 0) / durationArray.length;
    avgDuration = avgDuration.toFixed(0) + " weeks";
    setTreatmentData([totalTreatments, totalCost, avgDuration]);
  };

  useEffect(() => {
    if (data) {
      updateTreatmentData(data);
    }
  }, [data]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {treatmentCards.map((treatment, i) => (
        <StyledCard
          title={treatment.label}
          Icon={treatment.Icon}
          count={treatmentData[i]}
          key={i}
          subtitle={
            i === 0 || i === 2
              ? treatmentData[i] + treatment.subtitle
              : i === 1 && treatment.subtitle + treatmentData[i]
          }
        />
      ))}
    </div>
  );
};

export default TreatmentCards;
