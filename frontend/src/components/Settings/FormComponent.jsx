import { qualificationSpecializations } from "@/constants/constants";
import { Button, Form, message } from "antd";
import { useState } from "react";
import CommonInput from "@/components/CommonInput/CommonInput";
import PersonalInfo from "../SignUp/PersonalInfo";
import UserInfo from "../SignUp/UserInfo";
import { DeleteOutlined, CheckCircleOutlined } from "@ant-design/icons";
import DoctorInfo from "../Doctor/DoctorInfo";
import { useContext } from "react";
import roleContext from "@/context/RoleContext/roleContext";
import PatientInfo from "../Patient/PatientInfo";

const FormComponent = ({ data, type, isSuccess, id, details }) => {
  const [formValues, setFormValues] = useState(details ? details : []);
  const updateFormValues = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    console.log(formValues);
  };

  const getFormValues = () => {
    return formValues;
  };

  const renderInputComponent = () => {
    switch (type) {
      case "Personal Information":
        return (
          <PersonalInfo
            purpose="Edit"
            handleChange={updateFormValues}
            data={getFormValues()}
          />
        );
      case "User Information":
        return (
          <UserInfo
            purpose="Edit"
            handleChange={updateFormValues}
            data={formValues}
          />
        );
      case "Doctor Information":
        return (
          <DoctorInfo
            purpose="Edit"
            handleChange={updateFormValues}
            data={formValues}
          />
        );
      case "Patient Information":
        return (
          <PatientInfo
            purpose="Edit"
            handleChange={updateFormValues}
            data={formValues}
          />
        );
      default:
        return (
          <PersonalInfo
            purpose="Edit"
            handleChange={updateFormValues}
            data={formValues}
          />
        );
    }
  };

  const role = useContext(roleContext);
  const handleEdit = async () => {
    try {
      const persondId = id;
      console.log(id);
      const credentials = { ...formValues, persondId };
      let result;
      let authToken;
      if (type === "Doctor Information") {
        authToken = localStorage.getItem("Doctortoken");
      } else if (type === "Patient Information")
        authToken = localStorage.getItem("Patienttoken");
      if (authToken) {
        const params = { credentials, authToken };
        console.log(params);
        result = await data(params);
      } else {
        const params={credentials,id}
        result = await data(params);
      }

      if (result?.data?.success===true) {
        // console.log(result);
        message.success(`Success! ${type} updated successfully`);
      } else {
        console.log(result?.error?.data?.msg);
      }
    } catch (error) {
      message.error("Error: User cannot be updated");
    }
  };
  return (
    <Form onFinish={handleEdit}>
      {renderInputComponent()}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <Form.Item>
          <Button
            className="btn-danger"
            htmlType="submit"
            size="large"
            icon={<DeleteOutlined />}
          >
            Delete Account
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            className="btn-save"
            htmlType="submit"
            size="large"
            icon={<CheckCircleOutlined />}
          >
            Save Changes
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default FormComponent;
