import React from "react";

import { Button, Col, Form, Input, Row, Space, theme } from "antd";

const BookSearchForm = (props) => {
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
    if (values.mainText) {
      query += `&mainText=/${values.mainText}/i`;
    }
    if (values.author) {
      query += `&author=/${values.author}/i`;
    }
    if (values.category) {
      query += `&category=/${values.category}/i`;
    }

    if (query) {
      props.handleSearchBook(query);  
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
            <Form.Item name="mainText" label="Book Name">
              <Input placeholder="Learn React" />
            </Form.Item>
          </Col>
        }
        {
          <Col span={8}>
            <Form.Item name="author" label="Author">
              <Input placeholder="Eric" />
            </Form.Item>
          </Col>
        }
        {
          <Col span={8}>
            <Form.Item name="category" label="Category">
              <Input placeholder="Coding" />
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

export default BookSearchForm;
