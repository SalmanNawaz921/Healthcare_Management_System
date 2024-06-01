import { hospitalInputs } from "@/constants/constants";
import React from "react";
import CommonInput from "../CommonInput/CommonInput";
import { useGetAllAdminsQuery } from "@/redux/services/api/adminApi";

const AddHospital = ({ data, handleChange }) => {
  const { data: adminOptions } = useGetAllAdminsQuery(
    localStorage.getItem("Main Admintoken")
  );
  const options = adminOptions?.map((item) => ({
    label: item?.Name,
    value: item.AdminID,
    key: item.AdminID,
  }));
  const hospitalAttributes = hospitalInputs(options);
  return (
    <div className="grid grid-cols-2 gap-2">
      {hospitalAttributes.map((input, i) => (
        <CommonInput
          key={i}
          label={input.label}
          name={input.name}
          type={input.type}
          validationFn={input.validationfn}
          value={data?.[input.label]}
          data={data}
          options={options}
          handleChange={handleChange}
          required={input.require}
        />
      ))}
    </div>
  );
};

export default AddHospital;
