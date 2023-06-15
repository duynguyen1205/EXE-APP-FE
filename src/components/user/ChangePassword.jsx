import { Button, Col, Form, Input, Row, message, notification } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { callUserPassword } from "../../services/api";

const ChangePassword = () => {
  const user = useSelector((state) => state.account.user);
  const [isSubmit, setIsSubmit] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const {email, oldPass, newPass} = values;
    setIsSubmit(true);
    const res = await callUserPassword(email, oldPass, newPass);
    if(res && res.data) {
      message.success("Update password successfully")
      form.setFieldValue("oldPass", "");
      form.setFieldValue("newPass", "");
    }
    else {
      notification.error({
        message: "Update password failed",
        description: res.message
      })
    }
    setIsSubmit(false);
  };
  return (
    <div style={{ minHeight: 400 }}>
      <Row style={{textAlign: "center"}}>
        <Col md={12} sm={24}>
          <Form name="basic" form={form} onFinish={onFinish}  autoComplete="off">
            <Form.Item
              labelCol={{ span: 24 }} //whole column
              label="Email"
              name="email"
              initialValue={user.email}
            >
              <Input disabled={true} />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }} //whole column
              label="Old password"
              name="oldPass"
              rules={[
                {
                  required: true,
                  message: 'Please input your old password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }} //whole column
              label="New password"
              name="newPass"
              rules={[
                {
                  required: true,
                  message: 'Please input your new password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item

            >
              <Button type="primary" htmlType="submit" loading={isSubmit}>
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ChangePassword;
