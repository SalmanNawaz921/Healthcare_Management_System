// // import { Button, FloatButton, Form, Menu, message } from "antd";
// import React, { useEffect, useState } from "react";
// import CommonInput from "../CommonInput/CommonInput";
// import { symptomInputs } from "@/constants/constants";
// import { CheckCircleOutlined,PlusOutlined } from "@ant-design/icons";
// import { useAddSymptomMutation, useEditSymptomMutation, useGetSymptomsQuery } from "@/redux/services/api/patientApi";
// import Model from "../Model/Model";

// const SymptomInfoInputs = () => {
//   const authToken = localStorage.getItem("Patienttoken");
//   const {data}=useGetSymptomsQuery({authToken});
  
//   const [addSymptom,{isLoading:isAddSymptomLoading,error:addSymptomError,isSuccess:isAddSymptomSuccess}]=useAddSymptomMutation();
//   const items = [];
//   // Transform data into an object with SymptomID as the key
//   const [selectedSymptom, setSelectedSymptom] = useState(data?.[0]?.SymptomID);
//   const [formValues, setFormValues] = useState(data?.[0]);

//   const updateFormValues = (name, value) => {
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       [name]: value,
//     }));
//   };

//   const handleMenuClick = (obj) => {
//     setSelectedSymptom(obj?.key);
//   };
//   const makeSymptomInfoInputs = () => {
//     if(data)
//     return data?.map((symptom) =>
//       items.push({
//         label: symptom?.SymptomName,
//         name: symptom?.SymptomName,
//         key: symptom?.SymptomID,
//       })
//     );
//   };



//   const renderInputs = () => {
//     return symptomInputs.map((input) => (
//       <CommonInput
//         key={input.value}
//         label={input.label}
//         name={input.name}
//         type={input.type}
//         validationfn={input.validationfn}
//         value={formValues?.[input.name]}
//         required={input.require}
//         handleChange={updateFormValues}
//         data={formValues}
//       />
//     ));
//   };

//   const [
//     editSymptom,
//     {
//       isLoading: isEditSymptomLoading,
//       error: editSymptomError,
//       isSuccess: isEditSymptomSuccess,
//     },
//   ] = useEditSymptomMutation();
//   const handleFinish = async () => {
//     try {
//       const authToken = localStorage.getItem("Patienttoken");
//       const credentials = { ...formValues };
//       const vals = { credentials, id: selectedSymptom, authToken };
//       const result = await editSymptom(vals);
//       if (!editSymptomError) {
//         if (isEditSymptomSuccess) {
//           message.success("Symptoms Information updated successfully");
//         }
//       } else {
//         message.error("Error: Symptoms Information cannot be updated");
//       }
//     } catch (error) {
//       message.error("Error: Symptoms Information cannot be updated");
//     }
//   };

//   const add=async(formValues)=>{
//     const authToken = localStorage.getItem("Patienttoken");
//     const credentials = { ...formValues };
//     const vals = { credentials, authToken };
//     console.log(vals)
//     try {
//       const result = await addSymptom(vals);
//       console.log("result",result)
//       if (!addSymptomError) {
//         if (isAddSymptomSuccess) {
//           message.success("Symptoms Information updated successfully");
//         }
//       } else {
//         message.error("Error: Symptoms Information cannot be added");
//       }
//     } catch (error) {
//       message.error("Error: Symptoms Information cannot be added");
//     }
//   }

//   makeSymptomInfoInputs();

//   const [modalOpen, setModalOpen] = useState(false);
//   return (
//     <div>
//       {console.log(data)}
//        <FloatButton
//             icon={<PlusOutlined />}
//             onClick={() => setModalOpen(true)}
//             style={{ fontSize: "32px", width: "55px", height: "60px" }} // Adjust size as needed
//             type="primary"
//           />
//           <Model
//             title={`Add Symptom`}
//             visible={modalOpen}
//             onCancel={() => setModalOpen(false)}
//             onOk={add}
//             options={null}
//             page={"symptom"}
//             setModelOpen={setModalOpen}
//           />
//       <div>
//         <Menu
//           mode="horizontal"
//           className="flex-row justify-center gap-3 px-2 xl:px-12 w-full"
//           style={{ border: "none" }}
//           items={items}
//           onClick={handleMenuClick}
//           defaultSelectedKeys={selectedSymptom}
//         />
//       </div>
//       <Form onFinish={handleFinish}>
//         {renderInputs()}
//           <Form.Item>
//             <Button
//               className="btn-save"
//               htmlType="submit"
//               size="large"
//               icon={<CheckCircleOutlined />}
//             >
//               Save Changes
//             </Button>
//           </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default SymptomInfoInputs;
import React, { useEffect, useState } from "react";
import { Button, FloatButton, Form, Menu, message } from "antd";
import { CheckCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  useAddSymptomMutation,
  useEditSymptomMutation,
  useGetSymptomsQuery,
} from "@/redux/services/api/patientApi";
import CommonInput from "../CommonInput/CommonInput";
import Model from "../Model/Model";
import { symptomInputs } from "@/constants/constants";

const SymptomInfoInputs = () => {
  const authToken = localStorage.getItem("Patienttoken");
  const { data } = useGetSymptomsQuery({ authToken });
  const [addSymptom, { isLoading: isAddSymptomLoading, error: addSymptomError, isSuccess: isAddSymptomSuccess }] = useAddSymptomMutation();
  const [editSymptom, { isLoading: isEditSymptomLoading, error: editSymptomError, isSuccess: isEditSymptomSuccess }] = useEditSymptomMutation();

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
    const selected = data?.find((symptom) => symptom.SymptomID === parseInt(obj.key));
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

  const handleFinish = async () => {
    try {
      const authToken = localStorage.getItem("Patienttoken");
      const credentials = { ...formValues };
      const vals = { credentials, id: selectedSymptom?.SymptomID, authToken };
      const result=await editSymptom(vals);
      if (!result.error) {
        message.success("Symptoms Information updated successfully");
      } 
    } catch (error) {
      message.error("Error: Symptoms Information cannot be updated");
    }
  };

  const add = async (formValues) => {
    try {
      const authToken = localStorage.getItem("Patienttoken");
      const credentials = { ...formValues };
      const vals = { credentials, authToken };
      const result=await addSymptom(vals);
      if (!result.error) {
        message.success("Symptoms Information added successfully");
      } 
    } catch (error) {
      message.error("Error: Symptoms Information cannot be added");
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
        onOk={add}
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
      <Form onFinish={handleFinish}>
        {renderInputs()}
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
      </Form>
    </div>
  );
};

export default SymptomInfoInputs;
