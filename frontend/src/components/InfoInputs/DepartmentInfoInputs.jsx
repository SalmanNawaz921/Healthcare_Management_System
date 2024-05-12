import { departmentInputs, hospitalInputs, treatmentAttributes } from "@/constants/constants";
import React from "react";
import CommonInput from "../CommonInput/CommonInput";
import { useGetDepartmentsQuery } from "@/redux/services/api/hospitalAdminApi";

const DepartmentInfoInputs = ({ data, handleChange }) => {

  return (
    <div className="grid grid-cols-2 gap-2">
      {departmentInputs.map((input, i) => (
        <CommonInput
          key={i}
          label={input.label}
          name={input.name}
          type={input.type}
          validationFn={input.validationfn}
          value={data?.[input.name]}
          data={data}
          handleChange={handleChange}
          required={input.require}
        />
      ))}
    </div>
  );
};

export default DepartmentInfoInputs;
