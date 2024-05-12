import StyledCard from "@/components/Card/Card";
import { medicineCards, patientCards } from "@/constants/constants";
import { useMedicineCrud } from "@/hooks/useMedicineCrud";
import { useGetAllPatientsAdminQuery } from "@/redux/services/api/hospitalAdminApi";
import React, { useEffect, useState } from "react";

const MedicineCards = () => {
  const { data } = useMedicineCrud(localStorage.getItem("Hospital Admintoken"));

  const [medicinesCount, setMedicinesCount] = useState([]);
  const updateMedicinesCount = async (medicines) => {
    const totalMedicines = medicines.length;
    const inStock = medicines?.reduce((acc, cur) => acc + cur?.Quantity, 0);
    const totalExpenditure = medicines?.reduce(
      (acc, cur) => acc + cur?.Price,
      0
    );

    setMedicinesCount([totalMedicines, inStock, totalExpenditure]);
  };

  useEffect(() => {
    if (data) {
      updateMedicinesCount(data);
    }
  }, [data]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {medicineCards.map((medicine, i) => (
        <StyledCard
          title={medicine.label}
          Icon={medicine.Icon}
          count={medicinesCount[i]}
          key={i}
          subtitle={
            i === 0
              ? `${medicinesCount[i]} medicines are available`
              : i === 1
              ? `Available medicines stock is ${medicinesCount[i]}`
              : ` ${medicinesCount[i]} total expenditure on medicines`
          }
        />
      ))}
    </div>
  );
};

export default MedicineCards;
