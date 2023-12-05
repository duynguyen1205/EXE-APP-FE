import React, { useEffect, useState } from "react";
import {
  Table,
  Row,
  Col,
  Button,
  Space,
  message,
  notification,
  Popconfirm,
} from "antd";
import { deleteUserApi, getAllUsers } from "../../../services/api";
import AdvancedSearchForm from "./InputSearch.jsx";
import { MdDelete } from "react-icons/md";
import {
  ReloadOutlined,
  CloudDownloadOutlined,
  CloudUploadOutlined,
  PlusOutlined,
  EditTwoTone,
} from "@ant-design/icons";
import UserDetail from "./UserDetail";
import AddUserModal from "./ModalAddUser";
import moment from "moment";
import UploadByFile from "./UploadByFile";
import * as XLSX from "xlsx";
import UpdateUser from "./ModalUpdateUser";

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
  const [uploadMD, setUpLoadMd] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
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
      title: "Date updated",
      dataIndex: "updatedAt",
      render: (text) => {
        return moment(text).format("DD-MM-YYYY HH:mm:ss");
      },
      sorter: true,
    },
    {
      title: "Action",
      render: (text, record, index) => {
        const style = {
          color: "red",
          fontSize: "1em",
          margin: "0 20",
          cursor: "pointer",
        };
        return (
          <div>
            <Popconfirm
              title="Delete user"
              description="Are you sure to delete this user?"
              onConfirm={() => {
                deleteUser(record._id);
              }}
              okText="Yes"
              cancelText="No"
              placement="left"
            >
              <span>
                <MdDelete style={style} />
              </span>
            </Popconfirm>

            <EditTwoTone
              twoToneColor="#F57800"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setDataUpdate(record);
                setIsOpenUpdate(true);
              }}
            />
          </div>
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
          <Button
            type="primary"
            icon={<CloudUploadOutlined />}
            onClick={() => exportFile(listUser)}
          >
            Export
          </Button>
          <Button
            type="primary"
            icon={<CloudDownloadOutlined />}
            onClick={() => {
              setUpLoadMd(true);
            }}
          >
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
    setCurrent(1);
  };

  const exportFile = (data) => {
    if (data.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
      //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
      XLSX.writeFile(workbook, "ExportUser.xlsx");
    } else {
      message.error("Created user successfully");
    }
  };

  const deleteUser = async (id) => {
    const res = await deleteUserApi(id);
    console.log(res);
    if (res && res.data) {
      message.success("User deleted successfully");
      getUser()
    } else {
      notification.error({
        description: "Error",
        message: res.message,
      });
    }
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
      {/* Upload file  */}

      <UploadByFile
        uploadMD={uploadMD}
        setUpLoadMd={setUpLoadMd}
        getUser={getUser}
      />

      {/* Update user */}
      <UpdateUser
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        isOpenUpdate={isOpenUpdate}
        setIsOpenUpdate={setIsOpenUpdate}
        getUser={getUser}
      />
    </>
  );
};

export default TableUser;
