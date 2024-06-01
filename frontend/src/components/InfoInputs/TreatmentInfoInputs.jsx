import {treatmentAttributes } from "@/constants/constants";
import React from "react";
import CommonInput from "../CommonInput/CommonInput";
import { useGetDepartmentsQuery } from "@/redux/services/api/hospitalAdminApi";

const TreatmentInfoInputs = ({ data, handleChange }) => {
 const {data:details}=useGetDepartmentsQuery( localStorage.getItem("Hospital Admintoken"));
  const options=details?.map((item)=>({label:item.Name,value:item.DepartmentID,key:item.DepartmentID}))
  const treatmentInputs = treatmentAttributes(options);
  return (
    <div className="grid grid-cols-2 gap-2">
      {treatmentInputs.map((input, i) => (
        <CommonInput
          key={i}
          label={input.label}
          name={input.name}
          type={input.type}
          validationFn={input.validationfn}
          value={data?.[input.name]}
          data={data}
          options={options}
          handleChange={handleChange}
          required={input.require}
        />
      ))}
    </div>
  );
};

export default TreatmentInfoInputs;
