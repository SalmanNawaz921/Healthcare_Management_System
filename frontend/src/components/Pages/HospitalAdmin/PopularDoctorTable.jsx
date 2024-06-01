import GenTable from "@/components/Tables/GenTable";

const PopularDoctorTable = ({ items ,details,loading,error,authToken}) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const tableprops = {
    details: details,
    tableTitle: "Doctor",
    authToken: authToken,
    page: "doctor",
    columnsToFilter: ["DoctorID", "PatientID"],
    entries: 5,
  };

  return (
    <>
      <GenTable {...tableprops} />
    </>
  );
};

export default PopularDoctorTable;
