import roleContext from "@/context/RoleContext/roleContext";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { useHospitalCrud } from "@/hooks/useHospitalCrud";
import GeneralTable from "./GeneralTable";
import HospitalCards from "../Card/HospitalCards";
import GenTable from "./GenTable";

const HospitalTable = ({ items }) => {
  const { add, edit, remove, data, loading, error } = useHospitalCrud();
  const [hospitalData, setHospitalData] = useState([]);
  const [columnsData, setColumnsData] = useState([]);

  const { role } = useContext(roleContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleAdd = async (formValues) => {
    try {
      const result = await add(formValues);
      if (result) return result
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (formValues, record) => {
    const result = await edit(formValues, record?.["HospitalID"]);
    if (result) updateHospitalData(result?.data);
  };

  const handleDelete = async (id) => {
    try {
      const result = await remove(id);
      if (result?.hospital) updateHospitalData(result?.hospital);
    } catch (err) {
      console.log(err);
    }
  };

  const tableprops = {
    details: data,
    handleEdit: handleEdit,
    handleAdd: handleAdd,
    handleDelete: handleDelete,
    tableTitle: "Hospital",
    authToken: localStorage.getItem("Main Admintoken"),
    newData: hospitalData,
    keyToSearch: "Name",
    page: "hospital",
    keyToDelete: "HospitalID",
    columnsToFilter: ["AdminID", "ZipCode", "Location", "State"],
    items: items,
    keyToView: "HospitalID",
  };

  return (
    <>
      <div className="mb-10">
        <HospitalCards />
      </div>
      <div className="shadow-2xl">
        <GenTable {...tableprops} />
      </div>
    </>
  );
};

export default HospitalTable;
