import { Table, Tag } from "antd";
import "./history.scss";
import { useEffect, useState } from "react";
import { getOrderHistory } from "../../services/api";
import { useSelector } from "react-redux";
import ReactJson from "react-json-view";
import moment from "moment";
const HistoryPage = () => {
  const [dataOrder, setData] = useState([]);
  const userId = useSelector((state) => state.account.user.id);
  const columns = [
    {
      title: "ID",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Time",
      dataIndex: "createdAt",
      render: (text) => {
        return moment(text).format("DD-MM-YYYY HH:mm:ss");
      },
    },
    {
      title: "Detail",
      dataIndex: "detail",
      render: (text) => {
        return (
          <>
            {
              <ReactJson
                name={"Book detai"}
                src={text}
                collapsed={true}
                displayDataTypes={false}
                displayObjectSize={false}
                enableClipboard={false}
              />
            }
          </>
        );
      },
    },
    {
      title: "Total Pay",
      dataIndex: "totalPrice",
      render: (text) => {
        return <>{text} đ</>;
      },
    },
    {
      title: "Status",
      dataIndex: "phone",
      render: (text) => {
        return <>{<Tag color="green">Success</Tag>}</>;
      },
    },
  ];

  const getOrder = async () => {
    const res = await getOrderHistory();
    const filteredData = res.data.filter((item) => item.userId === userId);
    setData(filteredData);
    localStorage.setItem("orderData", JSON.stringify(filteredData));
  };

  useEffect(() => {
    const storedData = localStorage.getItem("orderData");
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      getOrder();
    }
  }, []);
  return (
    <div className="history-container">
      <h3>Order History: </h3>
      <div className="table"></div>
      <Table columns={columns} dataSource={dataOrder} rowKey={"_id"} />
    </div>
  );
};

export default HistoryPage;
