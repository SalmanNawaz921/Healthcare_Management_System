import GenTable from "./GenTable";
import { sortAscending, sortDescending } from "@/utils/utils";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTreatmentCrud } from "@/hooks/useTreatmentCrud";
import TreatmentCards from "../Card/TreatmentCards";

const TreatmentTable = ({
  data,
  isLoading,
  error,
  authToken,
  type,
  noShow,
  purpose,
}) => {
  // const authToken = localStorage.getItem("Hospital Admintoken");
  const { add, edit, remove } = useTreatmentCrud();

  const items = [
    { key: 2, label: "Edit", icon: <EditOutlined /> },
    { key: 3, label: "Delete", icon: <DeleteOutlined /> },
  ];

  const sortingOptions = [
    { label: "Cost", value: "cost", key: 1 },
    { label: "Cost Low To High", value: "low", key: 2 },
    { label: "Cost High To Low", value: "high", key: 3 },
  ];

  const genderOptions = [
    { label: "Duration", value: "duration", key: 1 },
    { label: "Long Duration", value: "long", key: 2 },
    { label: "Short Duration", value: "short", key: 3 },
  ];

  const handleSort = (val, detail) => {
    let sortedData;
    if (sortingOptions) {
      if (val === "low") {
        sortedData = sortAscending(detail, "Cost");
      } else if (val === "high") {
        sortedData = sortDescending(detail, "Cost");
      } else {
        return data;
      }
    }
    return sortedData;
  };

  const handleGender = (val, detail) => {
    let sortedData;
    if (genderOptions) {
      if (val === "long") {
        sortedData = sortAscending(detail, "Duration");
      } else if (val === "short") {
        sortedData = sortDescending(detail, "Duration");
      } else {
        return data;
      }
    }
    return sortedData;
  };
  const handleAdd = async (formValues) => {
    try {
      const result = await add(formValues);
      if (result?.data?.treatments) return result?.data?.treatments;
    } catch (err) {
    }
  };

  const handleEdit = async (formValues, record) => {
    const result = await edit(formValues, record?.["TreatmentID"]);
    if (result?.data?.treatments) return result?.data?.treatments;
  };

  const handleDelete = async (id) => {
    try {
      const result = await remove(id);
      if (result?.treatments) return result?.treatments;
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
    tableTitle: "Treatment",
    authToken: authToken,
    keyToDelete: "TreatmentID",
    items: (purpose !== "department" && type !== "Doctor" && items) || null,
    handleSort: (!noShow && handleSort) || null,
    keyToSearch: purpose !== "department" && !noShow && "Name",
    handleGender: handleGender,
    sortingOptions: purpose !== "department" && !noShow && sortingOptions,
    genderOptions: purpose !== "department" && !noShow && genderOptions,
    columnsToFilter: ["DepartmentID"],
    handleAdd: purpose !== "department" &&type !== "Doctor" && handleAdd,
    handleDelete: handleDelete,
    handleEdit: handleEdit,
    page: "treatment",
    entries: noShow && 5,
  };

  return (
    <>
      {noShow
        ? null
        : purpose !== "department" && (
            <div className="mb-10">
              <TreatmentCards data={data} />
            </div>
          )}
      <div className={purpose!=="department" && "shadow-2xl"}>
        <GenTable {...tableprops} />
      </div>
    </>
  );
};

export default TreatmentTable;
