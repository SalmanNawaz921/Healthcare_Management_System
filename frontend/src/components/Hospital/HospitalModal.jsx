import { Modal, Form, message } from "antd";
import { useState } from "react";
import AddHospital from "./AddHospital";
const HospitalModal = ({
  title,
  visible,
  onCancel,
  onOk,
  initialValues,
  options,
}) => {
  const [formValues, setFormValues] = useState(initialValues);

  const updateFormValues = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const getFormValues = () => {
    return formValues;
  };

  const handleOk = async () => {
    try {
      await onOk(formValues);
      setFormValues({});
    } catch (error) {
      console.log(error);
      message.error("Error: " + error.message);
    }
  };

  return (
    <Modal
      title={title}
      centered
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Save"
    >
      {/* {console.log(initialValues)} */}
      <Form>
        <AddHospital
          data={getFormValues()}
          handleChange={updateFormValues}
          options={options || []}
        />
      </Form>
    </Modal>
  );
};

export default HospitalModal;
