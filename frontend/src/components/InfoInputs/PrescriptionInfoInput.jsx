import {prescriptionAttributes} from "@/constants/constants";
import React from "react";
import CommonInput from "../CommonInput/CommonInput";
import { useGetPatientSymptomsQuery, useGetTreatmentsByDepartmentQuery } from "@/redux/services/api/doctorApi";

const PrescriptionInfoInput = ({ data, handleChange,initialValues }) => {
const authToken=localStorage.getItem("Doctortoken");
 const {data:details}=useGetTreatmentsByDepartmentQuery(authToken);
 const {data:symptoms}=useGetPatientSymptomsQuery({authToken,id:initialValues?.PatientID});
  const options=details?.map((item)=>({label:item.Name,value:item.TreatmentID,key:item.TreatmentID}))
  const symtomOptions=symptoms?.map((item)=>({label:item?.["SymptomName"],value:item.SymptomID,key:item.SymptomID}))
  const prescriptionInputs = prescriptionAttributes(options,symtomOptions);
  return (
    <div className="grid grid-cols-2 gap-2">
      {prescriptionInputs.map((input, i) => (
        <CommonInput
          key={i}
          label={input.label}
          name={input.name}
          type={input.type}
          validationFn={input.validationfn}
          value={data?.[input.name]}
          data={data}
          options={input?.options}
          handleChange={handleChange}
          required={input.require}
        />
      ))}
    </div>
  );
};

export default PrescriptionInfoInput;
