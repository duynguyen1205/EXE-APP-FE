import { AntDesignOutlined, UploadOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Form, Input, Row, Upload, message, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { callUploadAvatar, callUserInfo } from "../../services/api";
import { useState } from "react";
import {
  doUpdateUserInfo,
  doUploadAvatar,
} from "../../redux/account/accountSilce";

const UserInfo = () => {
  const user = useSelector((state) => state.account.user);
  const [userAvatar, setUserAvatar] = useState(user?.avatar ?? "");
  const [isSubmit, setIsSubmit] = useState(false);
  const tempAvatar = useSelector((state) => state.account.tempAvatar);
  const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
    tempAvatar || user?.avatar
  }`;
  const dispatch = useDispatch();
  const handleUploadAvatar = async ({ file, onSuccess, onError }) => {
    const res = await callUploadAvatar(file);
    if (res && res.data) {
      const newAavatar = res.data.fileUploaded;
      dispatch(doUploadAvatar({ avatar: newAavatar }));
      file.status === "done"
      setUserAvatar(newAavatar)
      onSuccess("ok");
    } else {
      onError("Error");
    }
  };
  const onFinish = async (values) => {
    const _id = user.id;
    const {fullName, phone} = values;
    setIsSubmit(true);
    const res = await callUserInfo(_id, phone, fullName, userAvatar);
    if (res && res.data) {
      dispatch(doUpdateUserInfo({ avatar: userAvatar, phone, fullName }));
      message.success("Updated user info successfully")
      localStorage.removeItem("access_token");
    } else {
      notification.error({
        message: "Updae is not available",
        description: res.message,
      });
    }
    setIsSubmit(false);
  };
  const props = {
    name: "file",
    maxCount: 1,
    multiple: false,
    showUploadList: false,
    customRequest: handleUploadAvatar,
    onChange(info) {
        
      if (info.file.status !== "uploading") {
        console.log(info);
      }
      if (info.file.status === "done") {
        message.success("File uploaded successfully");
      } else if (info.file.status === "error") {
        message.error(`File upload failed.`);
      }
    },
  };
  return (
    <div style={{ minHeight: 400 }}>
      <Row>
        <Col sm={24} md={12}>
          <Col span={24}>
            <Avatar
              size={{ xs: 32, sm: 64, md: 80, lg: 128, xl: 160, xxl: 200 }}
              icon={<AntDesignOutlined />}
              src={urlAvatar}
              shape="circle"
            />
          </Col>
          <Col span={24}>
            <Upload {...props}>
              <Button style={{marginTop: 10}} icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Col>
        </Col>
        <Col sm={24} md={12}>
          <Form name="basic" onFinish={onFinish} autoComplete="off">
            <Form.Item
              labelCol={{ span: 24 }} //whole column
              label="Email"
              name="email"
              initialValue = {user.email}
            >
              <Input disabled={true} />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }} //whole column
              label="Full Name"
              name="fullName"
              initialValue = {user.fullName}
            >
              <Input />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }} //whole column
              label="Phone number"
              name="phone"
              initialValue = {user.phone}
            >
              <Input />
            </Form.Item>

            <Form.Item
            // wrapperCol={{ offset: 6, span: 16 }}
            >
              <Button type="primary" htmlType="submit" loading={isSubmit}>
                Update info
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default UserInfo;
