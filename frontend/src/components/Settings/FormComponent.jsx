import { Button, Form, message } from "antd";
import { useState } from "react";
import PersonalInfo from "../SignUp/PersonalInfo";
import UserInfo from "../SignUp/UserInfo";
import { DeleteOutlined, CheckCircleOutlined } from "@ant-design/icons";
import DoctorInfo from "../Doctor/DoctorInfo";
import PatientInfo from "../Patient/PatientInfo";
import { useNavigate } from "react-router-dom";

const FormComponent = ({ data, type, id, details, deleteUser }) => {
  const [formValues, setFormValues] = useState(details ? details : []);
  const updateFormValues = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
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

  const handleDelete = async () => {
    try {
      let result;
      let authToken =
        localStorage.getItem("Doctortoken") ||
        localStorage.getItem("Patienttoken");

      if (authToken) {
        const params = { id, authToken };
        result = await deleteUser(params);
      }

      if (result?.data?.success === true) {
        useNavigate("/login");
        message.success(`Success! ${type} deleted successfully`);
      } 
    } catch (error) {
      message.error("Error: User cannot be deleted");
    }
  };
  const handleEdit = async () => {
    try {
      const persondId = id;
      const credentials = { ...formValues, persondId };
      let result;
      let authToken;
      if (type === "Doctor Information") {
        authToken = localStorage.getItem("Doctortoken");
      } else if (type === "Patient Information")
        authToken = localStorage.getItem("Patienttoken");
      if (authToken) {
        const params = { credentials, authToken };
        result = await data(params);
      } else {
        const params = { credentials, id };
        result = await data(params);
      }

      if (result?.data?.success === true) {
        message.success(`Success! ${type} updated successfully`);
      } 
    } catch (error) {
      message.error("Error: User cannot be updated");
    }
  };

  return (
    <Form onFinish={handleEdit}>
      {renderInputComponent()}
      <div className={`${deleteUser?"grid grid-cols-1 sm:grid-cols-2 gap-4":""} w-full`}>
        {deleteUser && (
            <Form.Item>
              <Button
                className="btn-danger"
                htmlType="submit"
                size="large"
                icon={<DeleteOutlined />}
                onClick={handleDelete}
              >
                Delete Account
              </Button>
            </Form.Item>
          )}

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
