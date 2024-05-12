import roleContext from "@/context/RoleContext/roleContext";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import TableLayout from "../TableLayout/TableLayout";

import { FloatButton, Form, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddHospital from "../Hospital/AddHospital";
import Model from "../Model/Model";
import HospitalModal from "../Hospital/HospitalModal";
import { searchByKey } from "@/utils/utils";

const GeneralTable = ({
  data,
  update,
  columnsData,
  handleEdit,
  handleAdd,
  handleDelete,
  options,
  tableTitle,
  newData,
  page,
  keyToDelete,
  keyToSearch,
  handleSort,
  handleFilter,
  items,
  handleClick,
}) => {
  let operations = items || [];

  const [modalOpen, setModalOpen] = useState(false);
  const [editModelOpen, setEditModelOpen] = useState(false);
  const [singleData, setSingleData] = useState({});
  const [record, setRecord] = useState(null);

  const updateData = (data) => {
    update(data);
  };

  const [search, setSearch] = useState("");
  const handleSearch = (val) => {
    setSearch(val);
    const filteredData = searchByKey(data, keyToSearch, val);
    console.log(filteredData);
    if (filteredData.length === 0) return;
    updateData(filteredData);
  };

  const add = async (formValues) => {
    await handleAdd(formValues);
  };
  const edit = async (formValues) => {
    console.log(record);
    await handleEdit(formValues, record);
  };
  const remove = async (id) => {
    await handleDelete(id);
  };

  const handleMenuClick = async (record, menu) => {
    if (record) {
      setRecord(record);
      if (menu.key === "2") {
        setSingleData(record);
        setEditModelOpen(true);
      } else if (menu.key === "3") {
        await remove(record?.[keyToDelete]);
      }
    }
  };

  const tableprops = {
    columns: columnsData || null,
    data: newData || null,
    search: search,
    handleSearch: handleSearch || null,
    items: operations || null,
    holder: `Search ${tableTitle}...` || "",
    handleClick: handleClick ? handleClick : handleMenuClick,
    handleSort: handleSort || null,
    handleFilter,
  };

  return (
    <>
      {" "}
      <FloatButton
        icon={<PlusOutlined />}
        className=" bg-blue-200"
        onClick={() => setModalOpen(true)}
        style={{
          right: 24,
          padding: "30px",
        }}
      />
      {handleAdd && (
        <Model
          title={`Add ${tableTitle}`}
          visible={modalOpen}
          onCancel={() => setModalOpen(false)}
          onOk={add}
          options={options}
          page={page}
          data={data}
        />
      )}
      {handleEdit && (
        <Model
          title={`${
            tableTitle === "Unassign" ? "Assign Doctors" : `Edit+ ${tableTitle}`
          }`}
          visible={editModelOpen}
          onCancel={() => setEditModelOpen(false)}
          initialValues={record}
          onOk={edit}
          options={options}
          page={page}
          data={data}
        />
      )}
      <TableLayout {...tableprops} />
    </>
  );
};

export default GeneralTable;
