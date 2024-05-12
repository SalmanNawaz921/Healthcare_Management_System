import React from "react";
import {
  Table,
  Dropdown,
  Menu,
  Button,
  Space,
  message,
  Avatar,
  Tag,
} from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useState } from "react";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ConfigProvider } from "antd";

const DataTable = ({ columns, data, handleClick, items, entries }) => {
  const [currentRecord, setCurrentRecord] = useState(null);

  const handleMenuClick = (e) => {
    if (!currentRecord) return;
    // message.info(`"Click on menu item." ${e}`);
    handleClick(currentRecord, e);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  // const columnWidth = `${100 / columns.length}%`;

  const columnWidth = "200px";

  const columnsWithActions = columns.map((col, index) => {
    let column = { ...col }; // Create a copy of the column object

    if (col.dataIndex === "Gender") {
      col = {
        ...column,
        title: "Gender",
        key: "gender",
        render: (_, record) => (
          <Space size="middle">
            <Tag color={record.Gender === "Male" ? "blue" : "pink"}>
              {record.Gender}
            </Tag>
          </Space>
        ),
      };
    }
    if (col.dataIndex === "Status") {
      col = {
        ...column,
        title: "Status",
        key: "status",
        render: (_, record) => (
          <Space size="middle">
            <Tag
              color={
                record.Status === "Busy" ||
                record.Status === "Pending" ||
                record.Status === "Unpaid"
                  ? "red"
                  : "green"
              }
            >
              {record.Status}
            </Tag>
          </Space>
        ),
      };
    }

    if (col.dataIndex === "Condition") {
      col = {
        ...column,
        title: "Condition",
        key: "condition",
        render: (_, record) => (
          <Space size="middle">
            <Tag
              color={
                record.Condition === "Critical"
                  ? "red"
                  : record.Condition === "Mild"
                  ? "green"
                  : "lime"
              }
            >
              {record.Condition}
            </Tag>
          </Space>
        ),
      };
    }

    if (col.dataIndex.includes("Date")) {
      col = {
        ...column,
        key: "date",
        render: (_, record) => (
          <Space size="middle">
            {new Date(record[col.dataIndex]).toLocaleDateString()}
          </Space>
        ),
      };
    }

    if (index === 0) {
      col = {
        ...column,
        width: columnWidth,
      };
      if (col.dataIndex.includes("Full Name")) {
        col = {
          ...column,
          title: "Name",
          key: "avatar",
          render: (_, record) => (
            <Space size="middle">
              <Avatar src={record.avatar} />
              {record[col.dataIndex]}
            </Space>
          ),
        };
      }
    }

    return col;
  });

  if (items !== null && items !== undefined) {
    columnsWithActions.push({
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Dropdown
            menu={menuProps}
            trigger={["click"]}
            onOpenChange={(visible) => {
              if (visible) setCurrentRecord(record);
            }}
          >
            <Button type="link" className="bg-dry">
              <EllipsisOutlined style={{ fontSize: "12px", color: "black" }} />
            </Button>
          </Dropdown>
        </Space>
      ),
    });
  }
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#f8f9fa",
            rowHoverBg: "#f3f5f7",
            fontSize: "14px",
            fontFamily: "'Poppins', sans-serif",
          },
        },
      }}
    >
      <div className="data-table-container ">
        <Table
          columns={columnsWithActions}
          dataSource={entries ? data.slice(0, entries) : data}
          pagination={entries || data?.length <= 5 ? false : { pageSize: 5 }}
          scroll={{ x: true }}
          size="middle"
        />
      </div>
    </ConfigProvider>
  );
};

export default DataTable;
