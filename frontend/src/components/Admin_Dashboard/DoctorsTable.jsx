import { useGetAllDoctorsQuery } from "@/redux/services/api/adminApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../DataTable/DataTable";

const DoctorsTable = () => {
  const navigate = useNavigate();
  const [doctorData, setDoctorData] = useState([]);
  const [columnsData, setColumnsData] = useState([]);
  const {
    data: doctorsData,
    error,
    isLoading,
  } = useGetAllDoctorsQuery(localStorage.getItem("Main Admintoken"));

  useEffect(() => {
    if (!localStorage.getItem("Main Admintoken")) {
      navigate("/");
    }
    if (doctorsData?.length > 0) {
      console.log(Object.keys(doctorsData[0]));
      const firstItem = doctorsData[0];
      const extractedColumns = Object.keys(firstItem).map((key) => ({
        title: key,
        dataIndex: key,
        i: key,
      }));
      const extractedData = doctorsData.map((data, i) => ({
        ...data,
        key: i,
      }));
      console.log(extractedData);
      setColumnsData(extractedColumns);
      setDoctorData(extractedData);
    }
  }, [doctorsData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  //const columns = Object.keys(doctorsData[0]).map((key) => <th>{key}</th>);

  return <DataTable columns={columnsData} data={doctorData} />;
};

export default DoctorsTable;
