import {invoiceAttributes } from "@/constants/constants";
import React from "react";
import CommonInput from "../CommonInput/CommonInput";

const InvoiceInfoInputs = ({ data, handleChange, options }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {invoiceAttributes.map((input, i) => (
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

export default InvoiceInfoInputs;
