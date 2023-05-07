import React from "react";
import { Drawer, Badge, Descriptions } from "antd";
import moment from "moment/moment";
const UserDetail = (props) => {
  const data = props.data;
  const open = props.isOpen;
  const onClose = () => {
    props.setIsOpen(false);
    props.setDataUser(null);
  };

  return (
    <>
      <Drawer
        title="User Information"
        width={"55vw"}
        placement="right"
        onClose={onClose}
        open={open}
      >
        <Descriptions title="User Detail" bordered column={2}>
          <Descriptions.Item label="ID">{data?._id}</Descriptions.Item>
          <Descriptions.Item label="Full Name">
            {data?.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{data?.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{data?.phone}</Descriptions.Item>
      
          <Descriptions.Item label="Role" span={2}>
            <Badge status={data?.role === "ADMIN" ? "success" : "processing"} text={data?.role} />
          </Descriptions.Item>
          <Descriptions.Item label="Create At">
            {moment(data?.createdAt).format('DD-MM-YYYY HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="Update At">
          {moment(data?.updateAt).format('DD-MM-YYYY HH:mm:ss')}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};

export default UserDetail;
