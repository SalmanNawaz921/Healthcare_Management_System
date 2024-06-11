import GenTable from "./GenTable";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useGetDepartmentsQuery } from "@/redux/services/api/hospitalAdminApi";
import DepartmentCards from "../Card/DepartmentCards";
import { useDepartmentCrud } from "@/hooks/useDepartmentCrud";
import { message } from "antd";

const DepartmentTable = () => {
  const authToken = localStorage.getItem("Hospital Admintoken");
  const { data, isLoading, error } = useGetDepartmentsQuery(authToken);
  const { add, edit, remove } = useDepartmentCrud();
  const items = [
    { key: 1, label: "View", icon: <EyeOutlined /> },
    { key: 2, label: "Edit", icon: <EditOutlined /> },
    { key: 3, label: "Delete", icon: <DeleteOutlined /> },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleAdd = async (formValues) => {
    try {
      const result = await add(formValues);
      if (result?.data?.department) {
        return result?.data?.department;
      }
      return data;
    } catch (err) {
    }
  };

  const handleEdit = async (formValues, record) => {
    const result = await edit(
      formValues,
      record?.["DepartmentID"],
      record?.["HospitalID"]
    );
    try {
      if (result?.data?.department) {
        return result?.data?.department;
      }
      return data;
    } catch (err) {
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await remove(id);
      if (result?.department) {
        return result?.department;
      }
      return data;
    } catch (err) {
    }
  };

  const tableprops = {
    tableTitle: "Department",
    authToken: authToken,
    keyToDelete: "DepartmentID",
    items: items || null,
    keyToSearch: "Name",
    columnsToFilter: ["HospitalID", "Hospital Name"],
    handleAdd: handleAdd,
    handleEdit: handleEdit,
    handleDelete: handleDelete,
    page: "department",
    details: data || null,
    keyToView: "DepartmentID",
  };

  return (
    <>
      <div className="mb-10">
        <DepartmentCards />
      </div>
      <div className="rounded-2xl shadow-2xl">
        <GenTable {...tableprops} />
      </div>
    </>
  );
};

export default DepartmentTable;
