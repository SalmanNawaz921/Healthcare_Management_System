import React, { useContext, useEffect } from "react";
import { Form, Button, message } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useRegisterMutation } from "@/redux/services/api/authApi";
import { users } from "@/constants/constants";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import roleContext from "@/context/RoleContext/roleContext";
import alertContext from "@/context/AlertContext/alertContext";
import UserInfo from "../SignUp/UserInfo";
import PersonalInfo from "../SignUp/PersonalInfo";
import DoctorInfo from "../Doctor/DoctorInfo";
import PatientInfo from "../Patient/PatientInfo";
import Mover from "./Mover";

const Stepper = () => {
  const [form] = Form.useForm();
  const { role, navigateBaseOnRole } = useContext(roleContext);
  const { showAlert } = useContext(alertContext);
  const components = [UserInfo, PersonalInfo];

  const addComponent = () => {
    while (components.length > 3) {
      components.shift();
    }
    if (role === 4) {
      components.push(PatientInfo);
    } else if (role === 3) {
      components.push(DoctorInfo);
    }
  };

  useEffect(() => {
    addComponent();
  }, [role]);

  const {
    currentStep,
    isFirstStep,
    isLastStep,
    nextStep,
    previousStep,
    updateFormValues,
    getFormValues,
  } = useMultiStepForm(components);

  const [
    registerMutation,
    {
      registerError: error,
      registerSuccess: isSuccess,
      registerLoading: isLoading,
    },
  ] = useRegisterMutation();

  const data = getFormValues();

  const handleSignUp = async () => {
    const fields = { ...data, role };

    try {
      const result = await registerMutation(fields);

      if (!result.error && result.data) {
        localStorage.clear();
        localStorage.setItem(`${users[role - 1].name}token`, result.data.token);
        navigateBaseOnRole(role, data["Username"]);
        message.success("Registered Successfully");
      } else {
        throw new Error(result.error.data.msg);
      }
    } catch (error) {
      message.error("Error: " + "User cannot be registered");
    }
  };

  const handleSubmit = async () => {
    try {
      nextStep();

      if (isLastStep) {
        handleSignUp();
      }
    } catch (error) {
    }
  };

  return (
    <Form
      name="registration"
      onFinish={handleSubmit}
      className="w-full"
      form={form}
    >
      <Mover
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        curStep={currentStep}
        role={role}
      />

      <div className="w-[100%]">
        {currentStep === 0 && (
          <UserInfo data={getFormValues()} handleChange={updateFormValues} />
        )}
        {currentStep === 1 && (
          <PersonalInfo
            data={getFormValues()}
            handleChange={updateFormValues}
          />
        )}
        {currentStep === 2 && role === 4 && (
          <PatientInfo data={getFormValues()} handleChange={updateFormValues} />
        )}
        {currentStep === 2 && role === 3 && (
          <DoctorInfo data={getFormValues()} handleChange={updateFormValues} />
        )}
      </div>

      <div className="flex justify-between">
        <Button
          onClick={previousStep}
          disabled={isFirstStep}
          icon={<ArrowLeftOutlined />}
        >
          Previous
        </Button>

        <Form.Item>
          <Button
            icon={isLastStep ? null : <ArrowRightOutlined />}
            htmlType="submit"
            className={isLastStep ? "flex justify-center" : ""}
          >
            {isLastStep ? "Submit" : "Next"}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default Stepper;
