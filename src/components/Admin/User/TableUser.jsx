import React, { useEffect, useState } from "react";
import { Table, Row, Col, Button, Space, Drawer } from "antd";
import { getAllUsers } from "../../../services/api";
import AdvancedSearchForm from "./inputSearch";
import { MdDelete } from "react-icons/md";
import {
  ReloadOutlined,
  CloudDownloadOutlined,
  CloudUploadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import UserDetail from "./UserDetail";
import AddUserModal from "./ModalAddUser";
import moment from "moment";

const TableUser = () => {
  const [listUser, setListUser] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState("");
  const [sortQuery, setSortQuery] = useState("");
  const [data, setDataUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      title: "Full Name",
      dataIndex: "fullName",
      sorter: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
    },
    {
      title:"Date updated",
      dataIndex: "createdAt",
      render: (text) => {
        return(
          moment(text).format('DD-MM-YYYY HH:mm:ss')
        )
      },
      sorter: true,
    },
    {
      title: "Action",
      render: (text, record, index) => {
        const style = { color: "red", fontSize: "1em" };
        return (
          <>
            <MdDelete style={style} />
          </>
        );
      },
    },
  ];

  // header
  const renderHeader = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <p>Table list user</p>
      <div>
        <Space>
          <Button type="primary" icon={<CloudUploadOutlined />}>
            Export
          </Button>
          <Button type="primary" icon={<CloudDownloadOutlined />}>
            Import
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            New User
          </Button>
          <Button
            type="ghost"
            onClick={() => {
              setSortQuery("");
              setFilters("");
            }}
          >
            <ReloadOutlined />
          </Button>
        </Space>
      </div>
    </div>
  );

  useEffect(() => {
    getUser();
  }, [current, pageSize, filters, sortQuery]);

  const getUser = async () => {
    let query = `current=${current}&pageSize=${pageSize}`;
    setIsLoading(true);
    if (filters) {
      query += `${filters}`;
    }
    if (sortQuery) {
      query += `${sortQuery}`;
    }
    const res = await getAllUsers(query);
    if (res && res?.data) {
      setListUser(res.data.result);
      setTotal(res.data.meta.total);
    }
    setIsLoading(false);
  };

  const onChange = (pagination, filters, sorter, extra) => {
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

  const handleSearch = (query) => {
    setFilters(query);
  };

  return (
    <>
      <Row gutter={[20, 20]}>
        {/* Gutter khoảng cách giữa cách cột là 20 px */}
        <Col span={24}>
          <AdvancedSearchForm handleSearch={handleSearch} />
        </Col>
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
            title={renderHeader}
            loading={isLoading}
          />
        </Col>
      </Row>

      <AddUserModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

      <UserDetail
        data={data}
        setDataUser={setDataUser}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        getUser={getUser}
      />
    </>
  );
};

export default TableUser;
