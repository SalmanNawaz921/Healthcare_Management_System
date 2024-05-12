// CommonInput.jsx
import { Form, Input, Select, DatePicker, Radio } from "antd";
const { Option } = Select;
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import {
  CheckCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { qualificationSpecializations } from "@/constants/constants";

const CommonInput = ({
  label,
  name,
  type,
  validationFn,
  options,
  handleChange,
  ...rest
}) => {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState(null);
  const [selectValues, setSelectValues] = useState([]);
  const setChange = (e) => {
    if (
      type === "text" ||
      type === "number" ||
      type === "password" ||
      type === "email" ||
      type === "radio"
    ) {
      handleChange(name, e.target.value);
    } else if (type === "select") {
      selectChange(e);
    } else {
      dateChange(e);
    }
  };
  const selectChange = (value) => {
    setSelectValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    handleChange(name, value);
  };

  const dateChange = (data, dateString) => {
    // const formattedDate = moment(data);
    setDate(data);
    handleChange(name, data);
    console.log(data, dateString);
  };
  const validateField = (rule, value) => {
    return new Promise((resolve, reject) => {
      // For other input types, check if the value is not empty
      if (type === "date") {
        if (date === null || date === undefined) {
          reject("Please input your " + label + "!");
          setMessage("Please input your " + label + "!");
          setStatus("warning");
          return;
        }
      } else if (type === "select") {
        if (selectValues[name] === null || selectValues[name] === undefined) {
          reject("Please input your " + label + "!");
          setMessage("Please input your " + label + "!");
          setStatus("warning");
          return;
        }
      } else if (!value) {
        reject("Please input your " + label + "!");
        setMessage("Please input your " + label + "!");
        setStatus("warning");
        return;
      }

      if (name !== "confirmPassword" && validationFn && !validationFn(value)) {
        reject("Invalid " + label + "!");
        setMessage("Invalid " + label + "!");
        setStatus("error");
        return;
      } else if (name === "confirmPassword" && validationFn) {
        reject("Passwords do not match!");
        setMessage("Passwords do not match!");
        setStatus("error");
        return;
      }

      setStatus("success");
      setMessage("Success " + label + "!");
      resolve();
    });
  };

  const getIcon = (validateStatus) => {
    switch (validateStatus) {
      case "success":
        return <CheckCircleOutlined />;
      case "warning":
        return <WarningOutlined />;
      case "error":
        return <CloseCircleOutlined />;
      default:
        return null;
    }
  };

  const renderInput = () => {
    switch (type) {
      case "text":
      case "password":
      case "email":
      case "number":
        return (
          <Input
            type={type}
            suffix={getIcon(status)}
            {...rest}
            className="input"
            onChange={setChange}
          />
        );
      case "date":
        return (
          // <DatePicker {...rest} format="YYYY-MM-DD" />
          <DatePicker {...rest} onChange={setChange} />
        );
      case "select": {
        return (
          <Select {...rest} onChange={setChange}>
            {/* // <Select {...rest}> */}
            {name === "qualification"
              ? options.map((option, i) => (
                  <Option key={i} value={option.qualification}>
                    {option.label}
                  </Option>
                ))
              : options.map((option, i) => (
                  <Option key={i} value={option}>
                    {option.label}
                  </Option>
                ))}
          </Select>
        );
      }
      case "radio": {
        return (
          <Radio.Group onChange={setChange}>
            {/* <Radio.Group> */}
            <Radio value="5"> Male </Radio>
            <Radio value="6"> Female </Radio>
          </Radio.Group>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div className="">
      <Form.Item
        name={name}
        validateStatus={status}
        rules={[
          {
            validator: validateField,
          },
        ]}
      >
        <div className="flex flex-col">
          <div
            style={{ marginBottom: 8, fontSize: "20px" }}
            className="font-bold font-poppins"
          >
            {label}
          </div>
          {renderInput()}
        </div>
      </Form.Item>
    </div>
  );
};

export default CommonInput;
