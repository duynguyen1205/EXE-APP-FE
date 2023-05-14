import React, { useEffect, useState } from "react";
import { Divider, Form, Input, Modal, message, notification } from "antd";
import { updateUser } from "../../../services/api";

const UpdateUser = (props) => {
  const isOpenUpdate = props.isOpenUpdate;
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const data = props.dataUpdate;
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    props.setIsOpenUpdate(false);
  };

  const onSubmit = async (values) => {
    const { _id, fullName, phone } = values;
    setIsSubmit(true);
    const res = await updateUser(_id, fullName, phone);
    if (res && res.data) {
      message.success("Update user successfully");
      props.setIsOpenUpdate(false);
      props.setDataUpdate(null)
      setIsSubmit(false);
      await props.getUser();
    } else {
      notification.error({
        message: "Have an error when update user",
        description: res.message,
      });
      setIsSubmit(false);
    }
  };
  // set up initial value for the form
  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);
  return (
    <>
      <Modal
        title="Update User"
        okText="Update"
        centered
        open={isOpenUpdate}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={isSubmit}
        maskClosable={false}
        forceRender
      >
        <Divider />
        <Form
          form={form}
          name="basic"
          style={{ maxWidth: 600 }}
          onFinish={onSubmit}
        >
        <Form.Item name="_id" hidden>
            <Input/>
        </Form.Item>
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
          >
            <Input disabled/>
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

export default UpdateUser;
