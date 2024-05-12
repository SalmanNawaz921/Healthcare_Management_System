import { appointmentAttributes } from "@/constants/constants";
import React from "react";
import CommonInput from "../CommonInput/CommonInput";

const AppointmentInfoInputs = ({ data, handleChange }) => {
  return (
    <div className="grid grid-cols-1 gap-2">
      {appointmentAttributes.map((input, i) => (
        <CommonInput
          key={i}
          label={input.label}
          name={input.name}
          type={input.type}
          validationFn={input.validationfn}
          value={data?.[input.name]}
          data={data}
          options={input.options}
          handleChange={handleChange}
          required={input.require}
        />
      ))}
    </div>
  );
};

export default AppointmentInfoInputs;
