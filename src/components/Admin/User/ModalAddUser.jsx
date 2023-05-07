import React, { useState } from "react";
import { Divider, Form, Input, Modal, message, notification } from "antd";
import { createUserByAdmin } from "../../../services/api";

const AddUserModal = (props) => {
  const isModalOpen = props.isModalOpen;
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);

  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    props.setIsModalOpen(false);
  };

  const onSubmit = async (values) => {
    const { fullName, email, password, phone } = values;
    setIsSubmit(true);
    const res = await createUserByAdmin(fullName, email, password, phone);
    if (res && res.data) {
      message.success("Created user successfully");
      form.resetFields();
      props.setIsModalOpen(false);
      setIsSubmit(false);
      await props.getUser();
    }
    else {
        notification.error({
            message: "Have an error when creating user",
            description: res.message,
        })
        setIsSubmit(false);
    }
  };
  return (
    <>
      <Modal
        title="Create New User"
        okText="Create"
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={isSubmit}
        maskClosable={false}
      >
        <Divider />
        <Form
          form={form}
          name="basic"
          style={{ maxWidth: 600 }}
          onFinish={onSubmit}
        >
          <Form.Item
            name="fullName"
            label="Full Name"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Please input the name of user!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Please input the email of user!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="password"
            labelCol={{ span: 24 }}
            type="password"
            rules={[
              {
                required: true,
                message: "Please input the password of the account!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Please input the phone number of the user!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default AddUserModal;
