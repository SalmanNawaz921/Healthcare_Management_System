// import { Avatar, Layout, Space, List, Button, Form, message, Menu } from "antd";
// import { FaTrashAlt, FaUserAlt, FaUserEdit } from "react-icons/fa";
// import { TiEdit } from "react-icons/ti";
// import ReactLoading from "react-loading";

// import {
//   UserOutlined,
//   DeleteOutlined,
//   CheckCircleOutlined,
// } from "@ant-design/icons";

// import DetailsWrapper from "@/components/DetialsWrapper/DetailsWrapper";
// import { doctorInputs, personalInfoInputs } from "@/constants/constants";
// import CommonInput from "@/components/CommonInput/CommonInput";
// import { useState } from "react";
// import {
//   useEditDoctorDetailsMutation,
//   useEditPersonalDetailsMutation,
//   useGetDoctorDetailsQuery,
//   useGetDoctorsQuery,
// } from "@/redux/services/api/hmsApi";
// import PersonalInfo from "@/components/SignUp/PersonalInfo";
// import { useEffect } from "react";
// const { Header, Sider, Content } = Layout;
// const DoctorSettings = ({
//   username,
//   avatar,
//   email,
//   phoneno,
//   fullName,
//   items,
// }) => {
//   const { data: doctorDetails } = useGetDoctorDetailsQuery(
//     localStorage.getItem("Doctortoken")
//   );

//   const LeftComponent = () => {
//     return (
//       <>
//         <Avatar size={128} icon={<UserOutlined />} />
//         <div className="gap-2 flex-colo">
//           {/* {console.log(doctorDetails)} */}
//           <h2 className="text-sm font-semibold ">
//             {(doctorDetails?.["FirstName"] || "").concat(
//               " ",
//               doctorDetails?.["LastName"] || ""
//             )}
//           </h2>

//           <h2 className="text-xs text-textGray"> {doctorDetails?.["Email"]}</h2>
//           <p className="text-xs"> {doctorDetails?.["Contact"]}</p>
//         </div>
//         {/* <div className="flex-colo gap-3 px-2 xl:px-12 w-full">
//           <button
//             className="
//               bg-text text-subMain
//                 text-sm gap-4 flex items-center w-full p-6 rounded"
//             onClick={(e) => handleFirstOption(e)}
//           >
//             <FaUserAlt />
//             Personal Informtion
//           </button>
//           <button
//             className="bg-dry text-main hover:bg-text hover:text-subMain
//             gap-4 flex items-center w-full p-6 rounded  text-sm"
//             onClick={(e) => handleSecondOption(e)}
//           >
//             <FaUserEdit />
//             Edit Information
//           </button>
//         </div> */}
//         <Menu
//           mode="vertical"
//           className="flex-colo gap-3 px-2 xl:px-12 w-full"
//           style={{ border: "none" }}
//           defaultSelectedKeys={["personalInfo"]}
//         >
//           <Menu.Item key="personalInfo" icon={<FaUserAlt />}>
//             Personal Information
//           </Menu.Item>
//           <Menu.Item key="editInfo" icon={<FaUserEdit />}>
//             Edit Information
//           </Menu.Item>
//         </Menu>
//       </>
//     );
//   };
//   const RightComponent = () => {
//     const [formValues, setFormValues] = useState(
//       doctorDetails ? doctorDetails : []
//     );
//     const updateFormValues = (name, value) => {
//       setFormValues((prevValues) => ({
//         ...prevValues,
//         [name]: value,
//       }));
//     };

//     const getFormValues = () => {
//       return formValues;
//     };
//     const [
//       personalDetails,
//       {
//         isLoading: isPersonalLoading,
//         isSuccess: isPersonalSuccess,
//         error: personalError,
//       },
//     ] = useEditPersonalDetailsMutation();

//     const handleEdit = async () => {
//       try {
//         const personId = doctorDetails?.["PersonID"];
//         const credentials = { ...formValues, personId };
//         const result = await personalDetails(credentials);
//         console.log(result);

//         if (isPersonalSuccess) {
//           message.success("Success! Personal details updated successfully");
//         } else {
//           throw new Error(result?.error?.data?.msg);
//         }
//       } catch (error) {
//         message.error("Error: " + error);
//       }
//     };

//     return (
//       <Form className="" onFinish={handleEdit}>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
//           {personalInfoInputs.map((input, i) => {
//             return (
//               <CommonInput
//                 key={i}
//                 label={input.label}
//                 name={input.name}
//                 type={input.type}
//                 value={formValues?.[input.label]} // Directly access the value using the label as the key
//                 data={getFormValues()}
//                 handleChange={updateFormValues}
//                 validationFn={input.validationfn}
//                 style={{ height: "40px" }}
//               />
//             );
//           })}
//           {/* {console.log(formValues)} */}
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
//           <Form.Item>
//             <Button
//               className="btn-danger"
//               htmlType="submit"
//               size="large"
//               icon={<DeleteOutlined />}
//             >
//               Delete Account
//             </Button>
//           </Form.Item>
//           {isPersonalLoading ? (
//             <div className="flex justify-center items-center py-3">
//               <ReactLoading
//                 type={"bubbles"}
//                 color={"color"}
//                 height={"10%"}
//                 width={"10%"}
//               />
//             </div>
//           ) : (
//             <Form.Item>
//               <Button
//                 className="btn-save"
//                 htmlType="submit"
//                 size="large"
//                 icon={<CheckCircleOutlined />}
//               >
//                 Save Changes
//               </Button>
//             </Form.Item>
//           )}
//         </div>
//       </Form>
//     );
//   };

//   return (
//     <DetailsWrapper
//       LeftComponent={LeftComponent}
//       RightComponent={RightComponent}
//     />
//   );
// };

// export default DoctorSettings;
