import { userInfoInputs } from "@/constants/constants";
import React from "react";
import CommonInput from "../CommonInput/CommonInput";

const UserInfo = ({ data, handleChange, formType, purpose }) => {
  return (
    <div>
      {userInfoInputs.map((input, i) =>
        formType === "Login" && input.name === "ConfirmPassword" ? null : (
          <CommonInput
            key={i}
            label={input.label}
            name={input.name}
            type={input.type}
            validationFn={formType === "Login"?"":input.validationfn}
            data={data ? data : null}
            value={data?.[input.name]}
            handleChange={handleChange}
            style={{ height: "40px" }}
            required={input.require}
          />
        )
      )}
    </div>
  );
};

export default UserInfo;
