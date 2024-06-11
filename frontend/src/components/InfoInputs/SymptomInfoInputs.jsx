import React, { useEffect, useState } from "react";
import { Button, FloatButton, Form, Menu, message } from "antd";
import {
  CheckCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  useAddSymptomMutation,
  useEditSymptomMutation,
  useGetSymptomsQuery,
} from "@/redux/services/api/patientApi";
import CommonInput from "../CommonInput/CommonInput";
import Model from "../Model/Model";
import { symptomInputs } from "@/constants/constants";
import { useSymptomCrud } from "@/hooks/useSymptomCrud";

const SymptomInfoInputs = () => {
  const authToken = localStorage.getItem("Patienttoken");
  const { data } = useGetSymptomsQuery({ authToken });
  const { add, remove, edit } = useSymptomCrud();

  const [selectedSymptom, setSelectedSymptom] = useState(data?.[0]);
  const [formValues, setFormValues] = useState(data?.[0]);

  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedSymptom(data[0]);
      setFormValues(data[0]);
    }
  }, [data]);

  const updateFormValues = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleMenuClick = (obj) => {
    const selected = data?.find(
      (symptom) => symptom.SymptomID === parseInt(obj.key)
    );
    setSelectedSymptom(selected);
    setFormValues(selected);
  };

  const renderInputs = () => {
    return symptomInputs.map((input) => (
      <CommonInput
        key={input.value}
        label={input.label}
        name={input.name}
        type={input.type}
        validationfn={input.validationfn}
        value={formValues?.[input.name]}
        required={input.require}
        handleChange={updateFormValues}
        data={formValues}
      />
    ));
  };

  const handleEdit = async () => {
    const res = await edit(formValues, selectedSymptom);
    if (res) {
      setSelectedSymptom(res);
    }
  };

  const handleDelete = async () => {
    const res = await remove(parseInt(selectedSymptom?.["SymptomID"]));
    if (res) {
      setSelectedSymptom(data?.[0]);
      setFormValues(data?.[0]);
    }
  };

  const handleAdd = async (formValues) => {
    const res = await add(formValues);
    if (res) {
      setSelectedSymptom(res);
    }
  };

  const items = data
    ? data.map((symptom) => ({
        label: symptom.SymptomName,
        key: symptom.SymptomID,
      }))
    : [];

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <FloatButton
        icon={<PlusOutlined />}
        onClick={() => setModalOpen(true)}
        style={{ fontSize: "32px", width: "55px", height: "60px" }} // Adjust size as needed
        type="primary"
      />
      <Model
        title="Add Symptom"
        visible={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleAdd}
        options={null}
        page="symptom"
        setModelOpen={setModalOpen}
      />
      <Menu
        mode="horizontal"
        className="flex-row justify-center gap-3 px-2 xl:px-12 w-full"
        style={{ border: "none" }}
        items={items}
        onClick={handleMenuClick}
      />
      <Form onFinish={handleEdit}>
        {renderInputs()}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Form.Item>
            <Button
              className="btn-danger"
              htmlType="button"
              size="large"
              icon={<DeleteOutlined />}
              onClick={handleDelete}
            >
              Delete Symptom
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
    </div>
  );
};

export default SymptomInfoInputs;
