import { FilterTwoTone, ReloadOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Form,
  Checkbox,
  Divider,
  InputNumber,
  Button,
  Rate,
  Tabs,
  Pagination,
} from "antd";
import "./home.scss";
const Home = () => {
  const [form] = Form.useForm();
  const handleChangeFilter = (changedValues, values) => {
    console.log(">>> check handleChangeFilter", changedValues, values);
  };

  const onFinish = (values) => {};

  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: `Phổ biến`,
      children: <></>,
    },
    {
      key: "2",
      label: `Hàng Mới`,
      children: <></>,
    },
    {
      key: "3",
      label: `Giá Thấp Đến Cao`,
      children: <></>,
    },
    {
      key: "4",
      label: `Giá Cao Đến Thấp`,
      children: <></>,
    },
  ];
  return (
    <div style={{ background: "#efefef", padding: "20px 0" }}>
      <div
        className="homepage-container"
        style={{ maxWidth: 1440, margin: "0 auto" }}
      >
        <Row gutter={[20, 20]}>
          <Col md={5} sm={0} xs={0}>
            <div
              style={{
                padding: "20px",
                backgroundColor: "#fff",
                borderRadius: 5,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>
                  <FilterTwoTone />
                  <span style={{ fontWeight: 500 }}> Filter Search</span>
                </span>
                <ReloadOutlined
                  title="Reset"
                  onClick={() => form.resetFields()}
                  style={{marginTop: 4}}
                />
              </div>
              <Divider />
              <Form
                onFinish={onFinish}
                form={form}
                onValuesChange={(changedValues, values) =>
                  handleChangeFilter(changedValues, values)
                }
              >
                <Form.Item
                  name="category"
                  label="List of categories"
                  labelCol={{ span: 24 }}
                >
                  <Checkbox.Group>
                    <Row>
                      <Col span={24}>
                        <Checkbox value="A">A</Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="B">B</Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="C">C</Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="D">D</Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="E">E</Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="F">F</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                </Form.Item>
                <Divider />
                <Form.Item label="Price" labelCol={{ span: 24 }}>
                  <Row gutter={[10, 10]} style={{ width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Col xl={12} md={24}>
                        <Form.Item name={["range", "from"]}>
                          <InputNumber
                            name="from"
                            min={0}
                            placeholder="đ From"
                            formatter={(value) =>
                              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xl={2} md={0}>
                        <div> - </div>
                      </Col>
                      <Col xl={12} md={24}>
                        <Form.Item name={["range", "to"]}>
                          <InputNumber
                            name="to"
                            min={0}
                            placeholder="đ To"
                            formatter={(value) =>
                              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                    </div>
                  </Row>
                  <div>
                    <Button
                      onClick={() => form.submit()}
                      style={{ width: "100%" }}
                      type="primary"
                    >
                      Áp dụng
                    </Button>
                  </div>
                </Form.Item>
                <Divider />
                <Form.Item label="Đánh giá" labelCol={{ span: 24 }}>
                  <div>
                    <Rate
                      value={5}
                      disabled
                      style={{ color: "#ffce3d", fontSize: 15 }}
                    />
                    <span className="ant-rate-text"></span>
                  </div>
                  <div>
                    <Rate
                      value={4}
                      disabled
                      style={{ color: "#ffce3d", fontSize: 15 }}
                    />
                    <span className="ant-rate-text">trở lên</span>
                  </div>
                  <div>
                    <Rate
                      value={3}
                      disabled
                      style={{ color: "#ffce3d", fontSize: 15 }}
                    />
                    <span className="ant-rate-text">trở lên</span>
                  </div>
                  <div>
                    <Rate
                      value={2}
                      disabled
                      style={{ color: "#ffce3d", fontSize: 15 }}
                    />
                    <span className="ant-rate-text">trở lên</span>
                  </div>
                  <div>
                    <Rate
                      value={1}
                      disabled
                      style={{ color: "#ffce3d", fontSize: 15 }}
                    />
                    <span className="ant-rate-text">trở lên</span>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </Col>
          <Col md={19} xs={24}>
            <div
              style={{
                padding: "20px",
                backgroundColor: "#fff",
                borderRadius: "5px",
              }}
            >
              <Row>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
              </Row>
              <Row className="customize-row">
                <div className="column">
                  <div className="wrapper">
                    <div className="thumbnail">
                      <img
                        src="http://localhost:8080/images/book/3-931186dd6dcd231da1032c8220332fea.jpg"
                        alt="thumbnail book"
                      />
                    </div>
                    <div className="text">
                      Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn Và
                      Sáng Suốt Hơn
                    </div>
                    <div className="price">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(70000)}
                    </div>
                    <div className="rating">
                      <Rate
                        value={5}
                        disabled
                        style={{ color: "#ffce3d", fontSize: 10 }}
                      />
                      <span>Đã bán 1k</span>
                    </div>
                  </div>
                </div>

                <div className="column">
                  <div className="wrapper">
                    <div className="thumbnail">
                      <img
                        src="http://localhost:8080/images/book/3-931186dd6dcd231da1032c8220332fea.jpg"
                        alt="thumbnail book"
                      />
                    </div>
                    <div className="text">
                      Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn Và
                      Sáng Suốt Hơn
                    </div>
                    <div className="price">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(70000)}
                    </div>
                    <div className="rating">
                      <Rate
                        value={5}
                        disabled
                        style={{ color: "#ffce3d", fontSize: 10 }}
                      />
                      <span>Đã bán 1k</span>
                    </div>
                  </div>
                </div>

                <div className="column">
                  <div className="wrapper">
                    <div className="thumbnail">
                      <img
                        src="http://localhost:8080/images/book/3-931186dd6dcd231da1032c8220332fea.jpg"
                        alt="thumbnail book"
                      />
                    </div>
                    <div className="text">
                      Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn Và
                      Sáng Suốt Hơn
                    </div>
                    <div className="price">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(70000)}
                    </div>
                    <div className="rating">
                      <Rate
                        value={5}
                        disabled
                        style={{ color: "#ffce3d", fontSize: 10 }}
                      />
                      <span>Đã bán 1k</span>
                    </div>
                  </div>
                </div>

                <div className="column">
                  <div className="wrapper">
                    <div className="thumbnail">
                      <img
                        src="http://localhost:8080/images/book/3-931186dd6dcd231da1032c8220332fea.jpg"
                        alt="thumbnail book"
                      />
                    </div>
                    <div className="text">
                      Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn Và
                      Sáng Suốt Hơn
                    </div>
                    <div className="price">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(70000)}
                    </div>
                    <div className="rating">
                      <Rate
                        value={5}
                        disabled
                        style={{ color: "#ffce3d", fontSize: 10 }}
                      />
                      <span>Đã bán 1k</span>
                    </div>
                  </div>
                </div>

                <div className="column">
                  <div className="wrapper">
                    <div className="thumbnail">
                      <img
                        src="http://localhost:8080/images/book/3-931186dd6dcd231da1032c8220332fea.jpg"
                        alt="thumbnail book"
                      />
                    </div>
                    <div className="text">
                      Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn Và
                      Sáng Suốt Hơn
                    </div>
                    <div className="price">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(70000)}
                    </div>
                    <div className="rating">
                      <Rate
                        value={5}
                        disabled
                        style={{ color: "#ffce3d", fontSize: 10 }}
                      />
                      <span>Đã bán 1k</span>
                    </div>
                  </div>
                </div>

                <div className="column">
                  <div className="wrapper">
                    <div className="thumbnail">
                      <img
                        src="http://localhost:8080/images/book/3-931186dd6dcd231da1032c8220332fea.jpg"
                        alt="thumbnail book"
                      />
                    </div>
                    <div className="text">
                      Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn Và
                      Sáng Suốt Hơn
                    </div>
                    <div className="price">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(70000)}
                    </div>
                    <div className="rating">
                      <Rate
                        value={5}
                        disabled
                        style={{ color: "#ffce3d", fontSize: 10 }}
                      />
                      <span>Đã bán 1k</span>
                    </div>
                  </div>
                </div>
              </Row>
              <Divider />
              <Row style={{ display: "flex", justifyContent: "center" }}>
                <Pagination defaultCurrent={6} total={500} responsive />
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
