import { stepperOptions } from "@/constants/constants";
import React, { useState } from "react";
import { TiTick } from "react-icons/ti";

const Mover = ({ isFirstStep, isLastStep, curStep, role }) => {
  const steps = stepperOptions;

  return (
    <div className="flex justify-between my-3">
      {steps?.map((step, i) => (
        <div
          key={i}
          className={`step-item ${curStep === i && "active"} ${
            i < curStep ? "complete" : ""
          } `}
        >
          <div className="step">
            {i < curStep || isLastStep ? <TiTick size={24} /> : i + 1}
          </div>
          <p className="text-gray-500">{step}</p>
        </div>
      ))}
    </div>
  );
};

export default Mover;
