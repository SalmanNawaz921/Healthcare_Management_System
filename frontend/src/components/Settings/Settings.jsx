import DetailsWrapper from "@/components/DetialsWrapper/DetailsWrapper";

import { useEditDoctorDetailsMutation } from "@/redux/services/api/doctorApi";
import {
  useEditUserDetailsMutation,
  useEditPersonalDetailsMutation,
} from "@/redux/services/api/authApi";
import InfoComponent from "./InfoComponent";
import FormComponent from "./FormComponent";
import { useEditPatientDetailsMutation } from "@/redux/services/api/patientApi";
import DetailsComponent from "../Deatils/DetailsComponent";
import { useDeleteDoctorMutation, useDeletePatientMutation } from "@/redux/services/api/hospitalAdminApi";

const Settings = ({
  username,
  avatar,
  email,
  phoneno,
  fullName,
  items,
  details,
  formName,
  handleMenuClick,
  img,
  noShow,
  id,
  component,
}) => {
  const LeftComponent = () => {
    return (
      <InfoComponent
        phoneno={phoneno}
        fullName={fullName}
        email={email}
        items={items}
        handleMenuClick={handleMenuClick}
        formName={formName}
        img={img}
      />
    );
  };

  

  const RightComponent = () => {
    let mutationHook;
    let type;

    if (formName === "personalInfo") {
      mutationHook = useEditPersonalDetailsMutation;
      type = "Personal Information";
    } else if (formName === "userInfo") {
      mutationHook = useEditUserDetailsMutation;
      type = "User Information";
    } else if (formName === "doctorInfo") {
      type = "Doctor Information";
      mutationHook = useEditDoctorDetailsMutation;
    } else if (formName === "patientInfo") {
      type = "Patient Information";
      mutationHook = useEditPatientDetailsMutation;
    }
    const role=localStorage.getItem("selectedRole");
    let detetionHook;
    let hookResult = [null, { isSuccess: false, isLoading: false, error: null }]; // Default value
  
    if (role === "3") {
      detetionHook = useDeleteDoctorMutation;
    } else if (role === "4") {
      detetionHook = useDeletePatientMutation;
    }
  
    if (detetionHook) {
      hookResult = detetionHook();
    }
  
    const [data, { isSuccess: isDeleteSuccess, isLoading: isDeleteLoading, error: deleteError }] = hookResult;
  
    const [
      userDetails,
      {
        isSuccess: isPersonalSuccess,
        isLoading: isPersonalLoading,
        error: personalError,
      },
    ] = mutationHook();
    return (
      <>
        <h1 className="text-center text-3xl mb-10 font-poppins">{type}</h1>
          <FormComponent
            data={userDetails}
            // handleEdit={handleEdit}
            type={type}
            details={details}
            isSuccess={isPersonalSuccess}
            id={id} // You might need to adjust this depending on your data structure
            deleteUser={localStorage.getItem("selectedRole") === "3" || localStorage.getItem("selectedRole")==="4" ? data : null}
          />
      </>
    );
  };


  const DetailsComp=()=>{
    return(
      <DetailsComponent details={details} type={formName}  Component={component}/>
    )
  }

  return (
    <DetailsWrapper
      LeftComponent={LeftComponent}
      RightComponent={noShow ?DetailsComp:RightComponent}
    />
  );
};

export default Settings;
