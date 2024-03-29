import React from "react";

import { Button, Col, Form, Input, Row, Space, theme } from "antd";

const AdvancedSearchForm = (props) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const formStyle = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 20,
    marginTop: 20,
  };
  const onFinish = (values) => {
    
    let query = "";
    if (values.fullName) {
      query += `&fullName=/${values.fullName}/i`;
    }
    if (values.email) {
      query += `&email=/${values.email}/i`;
    }
    if (values.phone) {
      query += `&phone=/${values.phone}/i`;
    }

    if (query) {
      props.handleSearch(query);  
    }
  };
  return (
    <Form
      form={form}
      name="advanced_search"
      style={formStyle}
      onFinish={onFinish}
      labelCol={{
        span: 24,
      }}
    >
      <Row gutter={24}>
        {
          <Col span={8}>
            <Form.Item name="fullName" label="Name">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
        }
        {
          <Col span={8}>
            <Form.Item name="email" label="Email">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
        }
        {
          <Col span={8}>
            <Form.Item name="phone" label="Phone">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
        }
      </Row>

      <div
        style={{
          textAlign: "right",
        }}
      >
        <Space size="small">
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
        </Space>
      </div>
    </Form>
  );
};

export default AdvancedSearchForm;
