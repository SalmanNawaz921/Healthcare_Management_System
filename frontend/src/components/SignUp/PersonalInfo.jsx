import { personalInfoInputs } from "@/constants/constants";
import React from "react";
import CommonInput from "../CommonInput/CommonInput";

const PersonalInfo = ({ purpose, data, handleChange }) => {
  return purpose !== "Edit" ? (
    <div>
      {personalInfoInputs
        .filter((input) => input.required !== false)
        .map((input, i) => (
          <CommonInput
            key={input.value}
            label={input.label}
            name={input.name}
            type={input.type}
            validationFn={input.validationfn}
            value={data?.[input.name]}
            data={data}
            handleChange={handleChange}
            style={{ height: "40px" }}
            required={input.required}
            items={input.items}
          />
        ))}
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {personalInfoInputs.map((input, i) => (
        <CommonInput
          key={input.value}
          label={input.label}
          name={input.name}
          type={input.type}
          validationFn={input.validationfn}
          data={data}
          value={data?.[input.label]}
          handleChange={handleChange}
          style={{ height: "40px" }}
          required={input.required}
          items={input.items}
        />
      ))}
    </div>
  );
};

export default PersonalInfo;
