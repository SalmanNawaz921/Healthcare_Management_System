import { Form, Button, message } from "antd";
import { users } from "@/constants/constants";
import { useContext, useState } from "react";
import roleContext from "@/context/RoleContext/roleContext";
import Role from "../Role/Role";
import { useLoginMutation } from "@/redux/services/api/authApi";
import alertContext from "@/context/AlertContext/alertContext";
import UserInfo from "../SignUp/UserInfo";

import logo from "@/assets/logo.png";
import Stepper from "../Stepper/Stepper";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
const Frm = ({ formType }) => {
  const { role, navigateBaseOnRole } = useContext(roleContext);
  const { showAlert } = useContext(alertContext);
  const [formValues, setFormValues] = useState({});

  const handleInputChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const component = [UserInfo];
  const { getFormValues, updateFormValues } = useMultiStepForm(component);

  const componentsWithProps = component.map((Component, i) => (
    <Component
      data={getFormValues()}
      handleChange={updateFormValues}
      key={i}
      formType="Login"
    />
  ));
  const [
    loginMutation,
    { isLoading: isLoginLoading, error: loginError, isSuccess: isLoginSuccess },
  ] = useLoginMutation();
  const form = Form.useFormInstance();
  const vals = getFormValues();
  const handleLogin = async () => {
    try {
      const credentials = { ...vals, role };
      const result = await loginMutation(credentials);
      if (!result?.error) {
        if (result?.data) {
          localStorage.clear();
          localStorage.setItem(
            `${users[role - 1].name}token`,
            result.data.token
          );
          localStorage.setItem("selectedRole", role);
          navigateBaseOnRole(role, vals["Username"]);
          message.success("Hurrah! Logged in successfully");
        }
      } else {
        message.error("Error: " + result?.error?.data);
      }
    } catch (error) {
      console.error("Login error:", result?.error?.data?.msg);
      message.error("Error: " + result?.error?.data?.msg);
    }
  };

  return (
    <>
      <Role />
      <img src={logo} className="h-20 mt-4 border-2 rounded-full" />
      {formType === "Register" && (
        <div>
          <Stepper handleInputChange={handleInputChange} />
        </div>
      )}

      {formType === "Login" && (
        <Form
          name="login"
          onFinish={handleLogin}
          className="w-full px-20"
          form={form}
        >
          {componentsWithProps[0]}
          <Form.Item className="flex justify-center">
            <Button type="primary" htmlType="submit" size="large">
              Login
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default Frm;
