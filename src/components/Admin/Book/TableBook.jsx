import { Button, Col, Popconfirm, Row, Space, Table, message, notification } from "antd";
import BookSearchForm from "./BookSearch";
import { MdDelete } from "react-icons/md";
import {
  CloudUploadOutlined,
  EditTwoTone,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { deleteBook, getAllBook } from "../../../services/api";
import moment from "moment";
import BookDetail from "./BookDetail";
import ModalAddBook from "./ModalAddBook";
import BookUpdate from "./BookUpdate";

const TableBook = () => {
  const [listBook, setListBook] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState("");
  const [sortQuery, setSortQuery] = useState("&sort=-updatedAt");
  const [dataBook, setDataBook] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (text, record) => (
        <a
          onClick={() => {
            setDataBook(record);
            setIsOpen(true);
          }}
          style={{ color: "Highlight" }}
        >
          {text}
        </a>
      ),
    },

    {
      title: "Product Name",
      dataIndex: "mainText",
      sorter: true,
    },

    {
      title: "Creator",
      dataIndex: "category",
      sorter: true,
    },

    {
      title: "Author",
      dataIndex: "author",
      sorter: true,
    },

    {
      title: "Price",
      dataIndex: "price",
      width: 100,
      render: (text) => {
        return <>{text} đ</>;
      },
      sorter: true,
    },

    {
      title: "Date Updated",
      dataIndex: "updatedAt",
      render: (text) => {
        return moment(text).format("DD-MM-YYYY HH:mm:ss");
      },
      sorter: true,
    },

    {
      title: "Action",
      width: 100,
      render: (text, record, index) => {
        const style = {
          color: "red",
          fontSize: "1em",
          margin: "0 10",
          cursor: "pointer",
        };
        return (
          <div>
            <Popconfirm
              title="Delete user"
              description="Are you sure to delete this book?"
              onConfirm={() => {
                handleDeleteBook(record._id);
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
                setOpenModalUpdate(true);
                setDataBook(record);
              }}
            />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getBook();
  }, [current, pageSize, filters, sortQuery]);

  const renderHeader = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <p>Table list Product</p>
      <div>
        <Space>
          <Button
            type="primary"
            icon={<CloudUploadOutlined />}
            // onClick={() => exportFile(listUser)}
          >
            Export
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            New Product
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
  // get list book
  const getBook = async () => {
    let query = `current=${current}&pageSize=${pageSize}`;
    setIsLoading(true);
    if (filters) {
      query += `${filters}`;
    }
    if (sortQuery) {
      query += `${sortQuery}`;
    }
    const res = await getAllBook(query);
    if (res && res?.data) {
      setListBook(res.data.result);
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

  const handleSearchBook = (query) => {
    setFilters(query);
  };

  const handleDeleteBook = async (id) => {
    const res = await deleteBook(id);
    if(res && res.data) {
      message.success("Delete Book Sucessfully");
      getBook();
    }
    else {
      notification.error({
        message: "Error deleting",
        description: res.message
      })
    }
  }
  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <BookSearchForm handleSearchBook={handleSearchBook} />
        </Col>
        <Col span={24}>
          <Table
            title={renderHeader}
            columns={columns}
            dataSource={listBook}
            rowKey={"_id"}
            loading={isLoading}
            onChange={onChange}
            pagination={{
              current: current,
              pageSize: pageSize,
              showSizeChanger: true,
              total: total,
              loading: { isLoading },
              showTotal: (total, range) => {
                return (
                  <div>
                    {range[0]} - {range[1]} on {total} rows
                  </div>
                );
              },
            }}
          ></Table>
        </Col>
      </Row>

      {/* View detail */}

      <BookDetail
        data={dataBook}
        setDataBook={setDataBook}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* Create new book */}
      <ModalAddBook
        openModalCreate={isModalOpen}
        setOpenModalCreate={setIsModalOpen}
        getBook={getBook}
      />
      {/* Update book !important */}

      <BookUpdate
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        dataUpdate = {dataBook}
        setDataUpdate = {setDataBook}
        getBook={getBook}
      />
    </>
  );
};

export default TableBook;
