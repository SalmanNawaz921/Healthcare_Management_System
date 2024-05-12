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
    // console.log(type);
    const [
      data,
      {
        isSuccess: isPersonalSuccess,
        isLoading: isPersonalLoading,
        error: personalError,
      },
    ] = mutationHook();
    return (
      <>
        <h1 className="text-center text-3xl mb-10 font-poppins">{type}</h1>
        {console.log("Details", details)}
          <FormComponent
            data={data}
            // handleEdit={handleEdit}
            type={type}
            details={details}
            isSuccess={isPersonalSuccess}
            id={id} // You might need to adjust this depending on your data structure
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
