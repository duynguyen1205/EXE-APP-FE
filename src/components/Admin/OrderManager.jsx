import React, { useEffect, useState } from "react";
import { Table, Row, Col, Button, Space, Popconfirm } from "antd";
import { getOrderHistoryAdmin } from "../../services/api";
import moment from "moment";

const OrderManager = () => {
  const [listUser, setListUser] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sortQuery, setSortQuery] = useState("");
  // columns
  const columns = [
    {
      title: "id",
      dataIndex: "_id",
      render: (text, record, index) => (
        <a
          onClick={() => {
            setDataUser(record);
            setIsOpen(true);
          }}
          style={{ color: "Highlight" }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Total bill",
      dataIndex: "totalPrice",
      render: (text) => {
        return <>{text} đ</>;
      },
      sorter: true
    },
    {
      title: "Full Name",
      dataIndex: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Date updated",
      dataIndex: "updatedAt",
      render: (text) => {
        return moment(text).format("DD-MM-YYYY HH:mm:ss");
      },
      sorter: true,
    },
  ];

  useEffect(() => {
    getUser();
  }, [current, pageSize, sortQuery]);

  const getUser = async () => {
    let query = `current=${current}&pageSize=${pageSize}`;
    setIsLoading(true);
    if (sortQuery) {
      query += `${sortQuery}`;
    }
    const res = await getOrderHistoryAdmin(query);
    if (res && res?.data) {
      setListUser(res.data.result);
      setTotal(res.data.meta.total);
    }
    setIsLoading(false);
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log(sorter.field);
    if (pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
    if (sorter && sorter.field) {

      if (sorter.order === "ascend") {
        setSortQuery(`&sort=${sorter.field}`);
      } else if (sorter.order === "descend") {
        setSortQuery(`&sort=-${sorter.field}`);
      } else {
        setSortQuery("");
      }
    }
    console.log("parms: ", pagination, filters, sorter, extra);
  };

  return (
    <>
      <Row gutter={[20, 20]}>
        {/* Gutter khoảng cách giữa cách cột là 20 px */}
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={listUser}
            onChange={onChange}
            rowKey={"_id"}
            pagination={{
              current: current,
              pageSize: pageSize,
              showSizeChanger: true,
              total: total,
              showTotal: (total, range) => {
                return (
                  <div>
                    {range[0]} - {range[1]} on {total} rows
                  </div>
                );
              },
            }}
            title={() => "Table list order"}
            loading={isLoading}
          />
        </Col>
      </Row>
    </>
  );
};

export default OrderManager;
