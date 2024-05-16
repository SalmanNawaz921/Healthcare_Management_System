// CommonInput.jsx
import { Form, Input, Select, DatePicker, Radio } from "antd";
const { Option } = Select;

import {
  CheckCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { qualificationSpecializations } from "@/constants/constants";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const { TextArea } = Input;

const CommonInput = ({
  label,
  name,
  type,
  validationFn,
  options,
  handleChange,
  data,
  required,
  items,
  ...rest
}) => {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState(null);
  const [selectValues, setSelectValues] = useState([]);
  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };
  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  });
  const setChange = (e) => {
    if (
      type === "text" ||
      type === "number" ||
      type === "password" ||
      type === "email" ||
      type === "radio" ||
      type === "textarea"
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
    setDate(data);
    handleChange(name, data);
  };

  const validateField = (rule, value) => {
    return new Promise((resolve, reject) => {
      if (!data?.[name]) {
        reject("Please input your " + label + "!");
        setMessage("Please input your " + label + "!");
        setStatus("warning");
        return;
      } else if (!data && !value) {
        reject("Please input your " + label + "!");
        setMessage("Please input your " + label + "!");
        setStatus("warning");
        return;
      }
      if (
        label === "ConfirmPassword" &&
        !validationFn(data?.["Password"], value)
      ) {
        reject("Password does not match" + "!");
        setMessage("Password does not match" + "!");
        setStatus("error");
        return;
      }
      if (label !== "ConfirmPassword" && validationFn) {
        try {
          !validationFn(data?.[label]);
        } catch (error) {
          reject(
            <div>
              {error.message.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          );
          setMessage(
            <div>
              {error.message.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          );
          setStatus("error");
          return;
        }
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
      case "email":
      case "number":
        return (
          <Input
            type={type}
            suffix={getIcon(status) || <span />}
            {...rest}
            onChange={setChange}
          />
        );
      case "password":
        return (
          <Input.Password
            iconRender={(visible) =>
              visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
            }
            {...rest}
            onChange={setChange}
          />
        );

      case "date":
        if (name !== "AppointmentDate") {
          return (
            <DatePicker {...rest} onChange={setChange} format="YYYY-MM-DD" />
          );
        }
        return (
          <DatePicker
            {...rest}
            onChange={setChange}
            format="YYYY-MM-DD HH:mm:ss"
            disabledDate={disabledDate}
            disabledTime={disabledDateTime}
            showTime={{
              defaultValue: dayjs("00:00:00", "HH:mm:ss"),
            }}
          />
        );
      case "select": {
        return (
          <div>
            {name === "Qualification" ? (
              <Select {...rest} onChange={setChange}>
                {options.map((option, i) => (
                  <Option key={i} value={option.qualification}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            ) : name === "Specialization" ? (
              <Select {...rest} onChange={setChange}>
                {options.map((option, i) => (
                  <Option key={i} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            ) : (
              <Select {...rest} onChange={setChange} options={options} />
            )}
          </div>
        );
      }

      case "textarea": {
        return <TextArea rows={4} onChange={setChange} />;
      }
      case "radio": {
        return (
          <Radio.Group onChange={setChange}>
            {/* {items.map((item) => (
              <Radio key={item.key} value={item.value}>
                {item.label}
              </Radio>
            ))} */}
            {name === "Gender" && (
              <>
                <Radio value="5"> Male </Radio>
                <Radio value="6"> Female </Radio>
              </>
            )}
            {name === "AliveStatus" && (
              <>
                <Radio value="9"> Alive </Radio>
                <Radio value="10"> Dead </Radio>
              </>
            )}
            {name === "Checkupstatus" && (
              <>
                <Radio value="7"> Busy </Radio>
                <Radio value="8"> Free </Radio>
              </>
            )}
            {name === "Status" && (
              <>
                <Radio value="18"> Pending </Radio>
                <Radio value="19"> Done </Radio>
              </>
            )}
            {name === "CaseType" && (
              <>
                <Radio value="11"> Routine </Radio>
                <Radio value="12"> Mild </Radio>
                <Radio value="13"> Crtical </Radio>
              </>
            )}
          </Radio.Group>
        );
      }

      default:
        return null;
    }
  };

  return (
    <Form.Item
      name={name}
      validateStatus={required === true && status}
      rules={[
        {
          validator: required === true && validateField,
          required: required,
        },
      ]}
    >
      <div className="flex flex-col">
        <div
          // style={{ marginBottom: 8, fontSize: "20px" }}
          className="font-md font-poppins mb-4 text-lg"
        >
          {label}
        </div>
        {renderInput()}
      </div>
    </Form.Item>
  );
};

export default CommonInput;
