import GenTable from "./GenTable";
import { sortAscending, sortDescending } from "@/utils/utils";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMedicineCrud } from "@/hooks/useMedicineCrud";
import MedicineCards from "../Pages/HospitalAdmin/MedicineCards";

const MedicineTable = () => {
  const authToken = localStorage.getItem("Hospital Admintoken");
  const { add, edit, remove, data, isLoading, error } = useMedicineCrud();

  const items = [
    { key: 2, label: "Edit", icon: <EditOutlined /> },
    { key: 3, label: "Delete", icon: <DeleteOutlined /> },
  ];

  const sortingOptions = [
    { label: "Quantity", value: "quantity", key: 1 },
    { label: "Low Quantity", value: "lowQuantity", key: 2 },
    { label: "High Quantity", value: "highQuantity", key: 3 },
  ];

  const genderOptions = [
    { label: "Price", value: "price", key: 1 },
    { label: "Price Low To High", value: "low", key: 2 },
    { label: "Price High To Low", value: "high", key: 3 },
  ];

  const handleSort = (val, detail) => {
    let sortedData;
    if (sortingOptions) {
      if (val === "lowQuantity") {
        sortedData = sortAscending(detail, "Quantity");
      } else if (val === "highQuantity") {
        sortedData = sortDescending(detail, "Quantity");
      } else {
        return data;
      }
    }
    return sortedData;
  };

  const handleGender = (val, detail) => {
    let sortedData;
    if (genderOptions) {
      if (val === "low") {
        sortedData = sortAscending(detail, "Price");
      } else if (val === "high") {
        sortedData = sortDescending(detail, "Price");
      } else {
        return data;
      }
    }
    return sortedData;
  };

  const handleAdd = async (formValues) => {
    try {
      const result = await add(formValues);
      if (result?.data?.medicines) {
        return result?.data?.medicines;
      }
    } catch (err) {
    }
  };

  const handleEdit = async (formValues, record) => {
    const result = await edit(formValues, record?.["MedicineID"]);
    if (result?.data?.medicines) return result?.data?.medicines;
  };

  const handleDelete = async (id) => {
    try {
      const result = await remove(id);
      if (result?.medicines) return result?.medicines;
    } catch (err) {
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const tableprops = {
    details: data || null,
    tableTitle: "Medicine",
    authToken: authToken,
    keyToDelete: "MedicineID",
    items: items || null,
    handleSort: handleSort || null,
    keyToSearch: "Name",
    handleGender: handleGender,
    sortingOptions: sortingOptions,
    genderOptions: genderOptions,
    columnsToFilter: [""],
    handleAdd: handleAdd,
    handleDelete: handleDelete,
    handleEdit: handleEdit,
    page: "medicine",
  };

  return (
    <>
      <div className="mb-10">
        <MedicineCards />
      </div>
      <div className=" shadow-2xl">
        <GenTable {...tableprops} />
      </div>
    </>
  );
};

export default MedicineTable;
