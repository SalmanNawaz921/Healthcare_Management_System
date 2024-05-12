import { Modal, Form, message, Button } from "antd";
import { useState } from "react";
import MedicineInfoInputs from "../InfoInputs/MedicineInfoInputs";
import InvoiceInfoInputs from "../InfoInputs/InvoiceInfoInputs";
import AppointmentInfoInputs from "../InfoInputs/AppointmentInfoInputs";
import TreatmentInfoInputs from "../InfoInputs/TreatmentInfoInputs";
import CommonInput from "../CommonInput/CommonInput";
import { assignDoctor } from "@/constants/constants";
import DepartmentInfoInputs from "../InfoInputs/DepartmentInfoInputs";
import PrescriptionInfoInput from "../InfoInputs/PrescriptionInfoInput";
import AddHospital from "../Hospital/AddHospital";
import { useGetDepartmentsQuery } from "@/redux/services/api/hospitalAdminApi";
const HospitalModal = ({
  title,
  visible,
  onCancel,
  onOk,
  initialValues,
  options,
  page,
  data,
  setModelOpen,
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
      setModelOpen(false);
    } catch (error) {
      console.log(error);
      // message.error("Error: " + error.message);
    }
  };

  const componentToShow = () => {
    if (page === "hospital") {
      return (
        <AddHospital
          data={getFormValues()}
          handleChange={updateFormValues}
        />
      );
    } else if (page === "department") {
      return (
        <DepartmentInfoInputs
          data={getFormValues()}
          handleChange={updateFormValues}
          options={options || []}
        />
      );
    } else if (page === "medicine") {
      return (
        <MedicineInfoInputs
          data={getFormValues()}
          handleChange={updateFormValues}
          options={options || []}
          initialValues={initialValues}
        />
      );
    } else if (page === "invoice") {
      return (
        <InvoiceInfoInputs
          data={getFormValues()}
          handleChange={updateFormValues}
          options={options || []}
        />
      );
    } else if (page === "appointment") {
      return (
        <AppointmentInfoInputs
          data={getFormValues()}
          handleChange={updateFormValues}
        />
      );
    } else if (page === "treatment") {
      return (
        <TreatmentInfoInputs
          data={getFormValues()}
          handleChange={updateFormValues}
          options={options || []}
        />
      );
    } else if (page === "prescription") {
      return (
        <>
          {console.log(initialValues)}
          <PrescriptionInfoInput
            data={getFormValues()}
            handleChange={updateFormValues}
            initialValues={initialValues}
          />
        </>
      );
    } else if (page === "unassign") {
      const { data } = useGetDepartmentsQuery(
        localStorage.getItem("Hospital Admintoken")
      );
      const assignOptions = data?.map((item)=>({label:item.Name,value:item.DepartmentID,key:item.DepartmentID}));
      const assignAttributes = assignDoctor(assignOptions);
      return (
        <CommonInput
          data={getFormValues()}
          name={assignAttributes.name}
          label={assignAttributes.label}
          validationFn={assignAttributes.validationfn}
          value={getFormValues()?.[assignAttributes.label]}
          type={assignAttributes.type}
          options={assignAttributes.options}
          handleChange={updateFormValues}
          required={assignAttributes.require}
        />
      );
    }
  };

  return (
    <Modal
      centered
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Save"
      footer={null}
    >
      <h2 className="text-2xl font-medium font-poppins text-center mb-5">
        {title}
      </h2>
      {/* {console.log(initialValues)} */}
      <Form onFinish={handleOk}>
        {componentToShow()}

        <Form.Item className="flex justify-center">
          <Button type="primary" htmlType="submit" size="large">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default HospitalModal;
