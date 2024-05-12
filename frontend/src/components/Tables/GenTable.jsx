import React from "react";
import { useEffect, useState } from "react";
import TableLayout from "../TableLayout/TableLayout";
import { useNavigate } from "react-router-dom";
import { FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Model from "../Model/Model";
import { searchByKey } from "@/utils/utils";
import PatientDetails from "../Deatils/PatientDetails";
const GenTable = ({
  details,
  handleEdit,
  handleAdd,
  handleDelete,
  options,
  tableTitle,
  page,
  keyToDelete,
  keyToSearch,
  handleSort,
  items,
  handleClick,
  authToken,
  sortingOptions,
  columnsToFilter,
  genderOptions,
  handleGender,
  genderPlaceHolder,
  filterKey,
  entries,
  ViewComponent,
  keyToView,
}) => {
  let operations = items || [];
  const [modalOpen, setModalOpen] = useState(false);
  const [editModelOpen, setEditModelOpen] = useState(false);
  const [singleData, setSingleData] = useState({});
  const [record, setRecord] = useState(null);
  const [data, setData] = useState(details);
  const [columnsData, setColumnsData] = useState([]);
  const [viewComponent, setViewComponent] = useState(false);
  const navigate = useNavigate();

  const updateData = (data) => {
    console.log(data);
    const firstItem = data[0];
    const extractedColumns = Object.keys(firstItem)
      .filter((key) => columnsToFilter && !columnsToFilter.includes(key))
      .map((key) => ({
        title: key.includes("ID") ? "#" : key,
        dataIndex: key,
        i: key,
      }));
    const extractedData = data.map((data, i) => {
      return {
        ...data,
        key: i,
      };
    });

    setData(extractedData);
    setColumnsData(extractedColumns);

    return { extractedColumns, extractedData };
  };

  const [search, setSearch] = useState("");
  const handleSearch = (val) => {
    setSearch(val);
    const filteredData = searchByKey(details, keyToSearch, val);
    console.log(filteredData);
    if (filteredData.length === 0) return;
    updateData(filteredData);
  };

  const add = async (formValues) => {
    const result = await handleAdd(formValues);
    if (result) {
      const { extractedColumns, extractedData } = updateData(result);
      // setData(extractedData);
      setData((prevData) => [...prevData, extractedData]);

      setColumnsData(extractedColumns);
      setModalOpen(false);
    }
  };
  const edit = async (formValues) => {
    const result = await handleEdit(formValues, record);
    if (result) {
      const { extractedColumns, extractedData } = updateData(result);
      setData((prevData) => [...prevData, extractedData]);
      // setData(extractedData);
      setColumnsData(extractedColumns);
      setEditModelOpen(false);
    }
  };
  const remove = async (id) => {
    const result = await handleDelete(id);
    if (result) {
      const { extractedColumns, extractedData } = updateData(result);
      setData((prevData) => [...prevData, extractedData]);
      // setData(extractedData);
      setColumnsData(extractedColumns);
    }
  };

  const sort = (val) => {
    const sortedData = handleSort(val, details);
    updateData(sortedData);
  };

  const gender = (val) => {
    const sortedData = handleGender(val, details);
    updateData(sortedData);
  };

  const handleMenuClick = async (record, menu) => {
    if (record) {
      setRecord(record);
      if (menu.key === "1") {
        navigate(`${window.location.pathname}/${record?.[keyToView]}`);
      } else if (menu.key === "2") {
        setSingleData(record);
        setEditModelOpen(true);
      } else if (menu.key === "3") {
        await remove(record?.[keyToDelete]);
      }
    }
  };

  const [filterDate, setFilterDate] = useState(null);

  const updateFilterDate = (dates) => {
    setFilterDate(dates);
    if (!dates || dates[0] === null || dates[1] === null) {
      updateData(details);
    }
  };

  const handleFilter = (dates) => {
    setFilterDate(dates);
    const filteredData = details.filter((data) => {
      const date = new Date(data[filterKey]);
      return date >= dates[0] && date <= dates[1];
    });
    if (filterDate) {
      const { extractedColumns, extractedData } = updateData(filteredData);
      setData(extractedData);
      setColumnsData(extractedColumns);
    }
    setData(null);
  };

  useEffect(() => {
    if (details?.length > 0) {
      updateData(details);
    }
  }, [details]);
  const tableprops = {
    columns: columnsData || null,
    data: data || null,
    search: search,
    handleSearch: keyToSearch && handleSearch,
    items: items && operations,
    holder: `Search ${tableTitle}...` || "",
    handleClick: handleClick ? handleClick : handleMenuClick,
    handleSort: handleSort && sort,
    handleGender: handleGender && gender,
    sortingOptions: sortingOptions || null,
    genderOptions: genderOptions || null,
    handleFilter: filterKey && handleFilter,
    updateFilterDate: filterKey && updateFilterDate,
    filterDate: filterKey && filterDate,
    entries: entries,
    ViewComponent: ViewComponent,
  };

  return (
    <div >
      {handleAdd && (
        <>
          <FloatButton
            icon={<PlusOutlined />}
            onClick={() => setModalOpen(true)}
            style={{ fontSize: "32px", width: "55px", height: "60px" }} // Adjust size as needed
            type="primary"
          />
          <Model
            title={`Add ${tableTitle}`}
            visible={modalOpen}
            onCancel={() => setModalOpen(false)}
            onOk={add}
            options={options}
            page={page}
            data={data}
            setModelOpen={setModalOpen}
          />
        </>
      )}
      {handleEdit && (
        <Model
          title={`${
            tableTitle === "Unassign"
              ? "Assign Doctors"
              : tableTitle === "Appointment"
              ? "Add Appointment"
              : page === "prescription"
              ? "Give Precription"
              : `Edit ${tableTitle}`
          }`}
          visible={editModelOpen}
          onCancel={() => setEditModelOpen(false)}
          initialValues={record}
          onOk={edit}
          options={options}
          page={page}
          data={data}
          setModelOpen={setEditModelOpen}
        />
      )}

      <TableLayout {...tableprops} />
    </div>
  );
};

export default GenTable;
