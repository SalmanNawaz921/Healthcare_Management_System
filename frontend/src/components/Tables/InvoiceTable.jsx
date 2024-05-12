import { useDeleteInvoiceMutation } from "@/redux/services/api/hospitalAdminApi";
import GenTable from "./GenTable";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { sortAscending, sortDescending, sortData } from "@/utils/utils";
import InvoiceCards from "../Card/InvoiceCards";
import { message } from "antd";
import { usePayInvoiceMutation } from "@/redux/services/api/patientApi";
const InvoiceTable = ({ data, error, isLoading, authToken, type }) => {
  // details,
  // handleEdit,
  // handleAdd,
  // handleDelete,
  // options,
  // tableTitle,
  // page,
  // keyToDelete,
  // keyToSearch,
  // handleSort,
  // handleFilter,
  // items,
  // handleClick,
  // authToken,

  const items = [
    type === "admin"
      ? { key: 3, label: "Delete", icon: <DeleteOutlined /> }
      : { key: 3, label: "Pay", icon: <CheckOutlined /> },
  ];

  const sortingOptions = [
    { label: "Sort By Date...", value: "sortDate" },
    { label: "Newest Date", value: "newestDate" },
    { label: "Oldest Date", value: "oldestDate" },
  ];

  const genderOptions = [
    { label: "Status", value: "status" },
    { label: "Paid", value: "paid" },
    { label: "Unpaid", value: "unpaid" },
  ];

  const handleSort = (val, detail) => {
    let sortedData;
    if (val === "newestDate") {
      sortedData = sortDescending(detail, "Created Date");
    } else if (val === "oldestDate") {
      sortedData = sortAscending(detail, "Created Date");
    } else {
      return data;
    }
    return sortedData;
  };

  const handleGender = (val, detail) => {
    let sortedData;
    if (genderOptions) {
      if (val === "paid") {
        sortedData = sortData(detail, "Status", "paid");
      } else if (val === "unpaid") {
        sortedData = sortData(detail, "Status", "unpaid");
      } else {
        return data;
      }
    }
    return sortedData;
  };

  const [deleteInvoice, { isLoading: isInvoiceLoading }] =
    useDeleteInvoiceMutation();
  const [payInvoice, { isLoading: isPaymentLoading }] = usePayInvoiceMutation();
  const handleDelete = async (id) => {
    if (type === "admin") {
      const result = await deleteInvoice({ authToken, id });
      if (result?.data) {
        message.success("Invoice deleted successfully");
        console.log(result?.data);
        return result?.data;
      }
      message.error("Error: Invoice cannot be deleted");
    } else if(type === "Patient") {
      const result = await payInvoice({ authToken:localStorage.getItem("Patienttoken"), id });
      if (result?.data) {
        message.success("Invoice paid successfully");
        // console.log(result?.data);
        // return result?.data;
      }
      else{
        message.error("Error: Invoice cannot be paid");

      }
    }
  };
  // const payInvoice

  const tableProps = {
    details: data || null,
    items: ( items) || null,
    tableTitle: "Invoices",
    handleSort: handleSort || null,
    filterKey: "Created Date",
    keyToSearch: "InvoiceID",
    keyToDelete: "InvoiceID",
    handleGender: handleGender,
    sortingOptions: sortingOptions,
    genderOptions: genderOptions,
    authToken: authToken,
    columnsToFilter: [""],
    handleDelete: handleDelete,
  };

  if (error) {
    return "Error";
  }
  if (isLoading) {
    return "Loading...";
  }

  return (
    <>
      <div className="mb-10">
        <InvoiceCards data={data} authToken={authToken} />
      </div>
      <div className="shadow-2xl">
        <GenTable {...tableProps} />
      </div>
    </>
  );
};

export default InvoiceTable;
