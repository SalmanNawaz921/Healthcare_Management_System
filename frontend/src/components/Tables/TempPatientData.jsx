// import { useGetAllPatientsQuery } from "@/redux/services/api/doctorApi";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import roleContext from "@/context/RoleContext/roleContext";
// import { sortAscending, sortDescending } from "@/utils/utils";
// import TableLayout from "../TableLayout/TableLayout";
// const PatientTable = ({ items, handleClick }) => {
//   const navigate = useNavigate();
//   const [patientData, setPatientData] = useState([]);
//   const [columnsData, setColumnsData] = useState([]);
//   const sortingOptions = [
//     { value: "newPatients", label: "New Patients", key: 1 },
//     { value: "oldPatients", label: "Old Patients", key: 2 },
//   ];
//   const genderOptions = [
//     { value: 5, label: "Male", key: 1 },
//     { value: 6, label: "Female", key: 2 },
//   ];
//   const {
//     data: patientsData,
//     error,
//     isLoading,
//   } = useGetAllPatientsQuery(localStorage.getItem("Doctortoken"));

//   const updatePatientData = (patientsData) => {
//     // console.log(Object.keys(patientsData[0]));
//     const firstItem = patientsData[0];
//     const extractedColumns = Object.keys(firstItem).map((key) => ({
//       title: key,
//       dataIndex: key,
//       i: key,
//     }));
//     const extractedData = patientsData.map((data, i) => {
//       return {
//         ...data,
//         key: i,
//       };
//     });

//     return { extractedColumns, extractedData };
//   };
//   const handleSort = (val) => {
//     let sortedData;
//     if (val === "newPatients") {
//       sortedData = sortDescending(patientsData, "Visit Date");
//     } else {
//       sortedData = sortAscending(patientsData, "Visit Date");
//     }
//     const { extractedColumns, extractedData } = updatePatientData(sortedData);
//     setPatientData(extractedData);
//     setColumnsData(extractedColumns);
//   };

//   const handleGender = (val) => {
//     let sortedData;
//     console.log(val);
//     if (val === 5) {
//       sortedData = sortAscending(patientsData, "Gender");
//     } else {
//       sortedData = sortDescending(patientsData, "Gender");
//     }
//     const { extractedColumns, extractedData } = updatePatientData(sortedData);
//     console.log(extractedData);
//     setPatientData(extractedData);
//     setColumnsData(extractedColumns);
//   };
//   const [search, setSearch] = useState("");
//   const handleSearch = (val) => {
//     setSearch(val);
//     const filteredData = patientsData.filter((data) => {
//       return data["Full Name"].toLowerCase().includes(val.toLowerCase());
//     });
//     if (filteredData.length === 0) return;
//     const { extractedColumns, extractedData } = updatePatientData(filteredData);
//     setPatientData(extractedData);
//     setColumnsData(extractedColumns);
//   };
//   const [filterDate, setFilterDate] = useState([null, null]);

//   const updateFilterDate = (dates) => {
//     setFilterDate(dates);
//     if (!dates || dates[0] === null || dates[1] === null) {
//       const { extractedColumns, extractedData } =
//         updatePatientData(patientsData);
//       setPatientData(extractedData);
//       setColumnsData(extractedColumns);
//       return;
//     }
//   };

//   const handleFilter = (dates) => {
//     setFilterDate(dates);
//     const filteredData = patientsData.filter((data) => {
//       const date = new Date(data["Visit Date"]);
//       return date >= dates[0] && date <= dates[1];
//     });
//     const { extractedColumns, extractedData } = updatePatientData(filteredData);
//     setPatientData(extractedData);
//     setColumnsData(extractedColumns);
//   };

//   const { role } = useContext(roleContext);

//   useEffect(() => {
//     if (!localStorage.getItem("Doctortoken")) {
//       navigate("/");
//     }
//     if (patientsData?.length > 0) {
//       const { extractedColumns, extractedData } =
//         updatePatientData(patientsData);

//       setColumnsData(extractedColumns);
//       setPatientData(extractedData);
//     }
//   }, [patientsData]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   const tableProps = {
//     data: patientData,
//     error: error,
//     isLoading: isLoading,
//     handleSort: handleSort,
//     handleGender: handleGender,
//     handleFilter: handleFilter,
//     updateFilterDate: updateFilterDate,
//     handleSearch: handleSearch,
//     items: items,
//     handleClick: handleClick,
//     columns: columnsData,
//     search: search,
//     sortingOptions: sortingOptions,
//     filterDate: filterDate,
//     genderOptions,
//     holder: "Search Patients...",
//   };

//   return <TableLayout {...tableProps} />;
// };

// export default PatientTable;
