import React from "react";
import {
  doctorInputs,
  qualificationSpecializations,
} from "@/constants/constants";
import { getSpecializations } from "@/utils/utils";
import { useState } from "react";
import CommonInput from "../CommonInput/CommonInput";
const DoctorInfo = ({ data, handleChange }) => {
  const [qualification, setQualification] = useState(
    qualificationSpecializations[0].qualification
  );

  const handleQualificationChange = (value) => {
    setQualification(value);
  };

  const handleInputChange = (name, value) => {
    handleChange(name, value);
    if (name === "Qualification") {
      handleQualificationChange(value);
    }
  };
  return (
    <div>
      {doctorInputs.map((input) => {
        const options =
          input.label === "Qualification"
            ? qualificationSpecializations
            : qualification
            ? getSpecializations(qualification).specializations || []
            : [];
        return (
          <CommonInput
            key={input.value}
            label={input.label}
            name={input.name}
            type={input.type}
            validationFn={input.validationfn}
            options={options}
            value={data?.[input.label]}
            data={data}
            handleChange={handleInputChange}
            style={{ height: "40px" }}
          />
        );
      })}
    </div>
  );
};

export default DoctorInfo;
