import { useGetTreatmentsByDepartmentQuery } from "@/redux/services/api/doctorApi";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import TableLayout from "../TableLayout/TableLayout";
import { sortAscending, sortDescending } from "@/utils/utils";
import TreatmentCards from "../Card/TreatmentCards";

const TreatmentsTable = ({ type }) => {
  const {
    data: treatmentsData,
    error,
    isLoading,
  } = useGetTreatmentsByDepartmentQuery(localStorage.getItem("Doctortoken"));

  const [treatmentData, setTreatmentData] = useState([]);
  const [columnsData, setColumnsData] = useState([]);

  const updateTreatmentData = (treatmentsData) => {
    const firstItem = treatmentsData[0];
    const extractedColumns = Object.keys(firstItem)
      .filter((key) => key !== "Description")
      .map((key) => ({
        title: key === "TreatmentID" ? "#" : key,
        dataIndex: key,
        i: key,
      }));
    const extractedData = treatmentsData.map((item) => {
      const { Description, ...rest } = item;
      return rest;
    });

    return { extractedColumns, extractedData };
  };

  useEffect(() => {
    if (!localStorage.getItem("Doctortoken")) {
      navigate("/");
    }
    if (treatmentsData?.length > 0) {
      const { extractedColumns, extractedData } =
        updateTreatmentData(treatmentsData);

      setColumnsData(extractedColumns);
      setTreatmentData(extractedData);
    }
  }, [treatmentsData]);

  const [search, setSearch] = useState("");
  const handleSearch = (val) => {
    setSearch(val);
    const filteredData = treatmentsData.filter((data) => {
      return data["Name"].toLowerCase().includes(val.toLowerCase());
    });
    if (filteredData.length === 0) return;
    const { extractedColumns, extractedData } =
      updateTreatmentData(filteredData);
    setTreatmentData(extractedData);
    setColumnsData(extractedColumns);
  };

  const handleSort = (val) => {
    let sortedData;
    if (val === "Cost High to Low") {
      sortedData = sortDescending(treatmentsData, "Cost");
    } else {
      sortedData = sortAscending(treatmentsData, "Cost");
    }
    const { extractedColumns, extractedData } = updateTreatmentData(sortedData);
    setTreatmentData(extractedData);
    setColumnsData(extractedColumns);
  };

  const sortingOptions = [
    { value: "Cost High to Low", label: "Cost High to Low" },
    { value: "Cost Low to High", label: "Cost Low to High" },
  ];
  const tableProps = {
    columns: columnsData,
    data: treatmentData,
    search: type!=="doctor"&& search,
    handleSearch: type!=="doctor"&& handleSearch,
    sortingOptions: type!=="doctor"&& sortingOptions,
    handleSort: handleSort,
  };

  return (
    <div className="flex flex-col gap-8">
  {type!=="doctor"&& <TreatmentCards data={data} />}
      <TableLayout {...tableProps} />
    </div>
  );
};

export default TreatmentsTable;
