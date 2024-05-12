import {
  doctorInputs,
  personalInfoInputs,
  petientInfoInputs,
  userInfoInputs,
} from "@/constants/constants";
import { message } from "antd";
import { useState } from "react";
import PersonalInfo from "../SignUp/PersonalInfo";
import UserInfo from "../SignUp/UserInfo";
import DoctorInfo from "../Doctor/DoctorInfo";
import { useContext } from "react";
import roleContext from "@/context/RoleContext/roleContext";
import PatientInfo from "../Patient/PatientInfo";
import DoctorTable from "../Tables/DoctorTable";

const DetailsComponent = ({
  data,
  type,
  isSuccess,
  id,
  details,
  Component,
}) => {
  // const {data:doctorsData}=useGetDoct(credentaiols)
  const divComponent = () => {
    return (
      <div className="">
        <h1 className="text-center text-3xl mb-10 font-poppins">{type}</h1>
        {!Component && (
          <div className="grid  grid-cols-2 gap-4 py-6  pl-32">
            {type === "Personal Information" &&
              personalInfoInputs.map(
                (input, i) =>
                  details?.[input.label] && (
                    <div key={i} className="text-lg font-poppins mb-5">
                      <span className="font-semibold">{input.label}</span> :{" "}
                      {input.label === "Gender"
                        ? details?.[input.label] === 5
                          ? "Male"
                          : "Female"
                        : details?.[input.label]}
                    </div>
                  )
              )}
            {type === "Patient Information" &&
              petientInfoInputs(null)?.map(
                (input, i) =>
                  details?.[input.label] && (
                    <div key={i} className="text-lg font-poppins mb-5">
                      <span className="font-semibold">{input.label}</span> :{" "}
                      {input.label === "Description" ||
                      input.label === "MedicalHistory"
                        ? details?.[input.label].slice(0, 20)
                        : details?.[input.label]}
                    </div>
                  )
              )}
            {type === "Doctor Information" &&
              doctorInputs?.map(
                (input, i) =>
                  details?.[input.label] && (
                    <div key={i} className="text-lg font-poppins mb-5">
                      <span className="font-semibold">{input.label}</span> :{" "}
                      {input.label === "Description" ||
                      input.label === "MedicalHistory"
                        ? details?.[input.label].slice(0, 20)
                        : details?.[input.label]}
                    </div>
                  )
              )}
          </div>
        )}
        {Component}
      </div>
    );
  };

  return (
    <div>
      {console.log(details)}
      <div className="">{divComponent()}</div>
    </div>
  );
};

export default DetailsComponent;
