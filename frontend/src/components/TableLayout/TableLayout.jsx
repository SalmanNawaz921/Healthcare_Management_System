import DataTable from "../DataTable/DataTable";
import { Button, ConfigProvider, Input, Select } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
const TableLayout = ({
  data,
  error,
  isLoading,
  handleSort,
  handleGender,
  handleFilter,
  updateFilterDate,
  handleSearch,
  items,
  handleClick,
  columns,
  search,
  sortingOptions,
  filterDate,
  genderOptions,
  holder,
  entries,
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            selectorBg: "#f8f9fa",
          },
        },
      }}
    >
      <div className="bg-white  px-14 py-4  rounded-2xl">
        <div
          className={`${
            genderOptions
              ? "grid lg:grid-cols-5 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 mb-4"
              : "flex justify-between items-center mb-4 flex-wrap gap-3"
          }`}
        >
          {handleSearch && (
            <Input
              placeholder={holder ? holder : `Search...`}
              className={`${
                genderOptions
                  ? "h-14 w-full text-sm text-main border border-border bg-dry rounded-md px-4"
                  : "w-[300px] h-14  text-sm text-main border  bg-[#f8f9fa] rounded-md px-4"
              }`}
              value={search}
              style={{ border: "2px solid #f8f9fa", borderRadius: "10px" }}
              onChange={(e) => handleSearch(e.target.value)}
            />
          )}

          {sortingOptions && (
            <Select
              placeholder="Sort by..."
              className={`${
                genderOptions
                  ? "h-14 w-full text-sm text-main border border-border bg-dry rounded-md"
                  : "w-[300px] h-14  text-sm text-main border  bg-[#f8f9fa] rounded-md"
              }`}
              options={sortingOptions}
              style={{
                backgroundColor: "#f8f9fa",
                borderColor: "#f8f9fa",
                borderRadius: "10px",
                border: "2px solid #f8f9fa", // Add border style here
              }}
              dropdownStyle={{ backgroundColor: "#f8f9fa" }}
              onChange={(val) => handleSort(val)}
            />
          )}
          {genderOptions && (
            <Select
              placeholder={genderOptions?.[0].label}
              className="h-14 w-full text-sm text-main rounded-md"
              options={genderOptions}
              dropdownStyle={{ backgroundColor: "#f8f9fa" }}
              onChange={(val) => handleGender(val)}
            ></Select>
          )}
          {handleFilter && (
            <>
              <RangePicker
                className="h-14 w-full text-sm text-main rounded-md bg-dry border border-border"
                format="YYYY-MM-DD"
                onChange={(defaultValue) => updateFilterDate(defaultValue)}
                value={filterDate}
                style={{ border: "2px solid #f8f9fa", borderRadius: "10px" }}
              />
              <Button
                icon={<FilterOutlined />}
                className="w-full h-14 flex-rows gap-4 hover:opacity-80 transitions bg-subMain text-white text-sm font-medium px-2"
                style={{ borderRadius: "10px", border: "2px solid #f8f9fa" }}
                // onClick={() => handleSearch(search)}
                onClick={() => handleFilter(filterDate)}
              >
                Filter
              </Button>
            </>
          )}
        </div>
        <div s>
          {/* <h2 className="text-xl font-poppins">Patients</h2> */}
          <DataTable
            columns={columns}
            data={data}
            items={items}
            handleClick={handleClick}
            entries={entries}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default TableLayout;
