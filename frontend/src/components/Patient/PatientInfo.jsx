import { personalInfoInputs } from "@/constants/constants";
import React from "react";
import CommonInput from "../CommonInput/CommonInput";
import { Form } from "antd";
import { petientInfoInputs } from "@/constants/constants";
import { useViewHospitalsQuery } from "@/redux/services/api/hospitalApi";

const PatientInfo = ({ data, handleChange,purpose }) => {
  const {data:details}=useViewHospitalsQuery();
  const options=details?.map((item)=>({label:item.Name,value:item.HospitalID}))
  const patientInfpInputs = petientInfoInputs(options);
  console.log(patientInfpInputs);
  return (
    <div>
      {patientInfpInputs.map((input) => {
        if (purpose!=="Edit"&&input.require) {
          return (
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
              required={input.require}
              items={input.items}
              options={input.options}
            />
          );
        }
        else if(purpose==="Edit"){
          return (
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
              required={input.require}
              items={input.items}
              options={input.options}
            />
          );
        }
        
        return null;
      })}
    </div>
  );
};

export default PatientInfo;
