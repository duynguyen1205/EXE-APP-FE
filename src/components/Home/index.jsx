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
  Spin,
} from "antd";
import "./home.scss";
import { useEffect, useState } from "react";
import { callFetchCategory, getAllBook } from "../../services/api";
import { useNavigate, useOutletContext } from "react-router-dom";

const Home = () => {
  const [searchTerm, setSearchTerm] = useOutletContext();
  const [listCategory, setListCategory] = useState([]);

  const [listBook, setListBook] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState("");
  const [sortQuery, setSortQuery] = useState("&sort=-sold");
  const [form] = Form.useForm();

  const navigate = useNavigate()
  const handleChangeFilter = (changedValues, values) => {
    // console.log(">>> check handleChangeFilter", changedValues, values);

    if (changedValues.category) {
      let listcate = values.category;
      if (listcate && listcate.length > 0) {
        const list = listcate.join(",");
        setFilters(`&category=${list}`);
      } else {
        setFilters("");
      }
    }
  };

  const onFinish = (values) => {
    if (values?.range?.from >= 0 && values?.range?.to >= 0) {
      console.log("hello");
      // tạo ra filter để price
      let price = `price>=${values?.range?.from}&price<=${values?.range?.to}`;
      // kiểm tra xem có cate không để gộp chung
      if (values?.category?.length) {
        const cate = values?.category?.join(",");
        price += `&category=${cate}`;
      }
      setFilters(price);
    }
  };

  const items = [
    {
      key: "&sort=-sold",
      label: `Popular`,
      children: <></>,
    },
    {
      key: "&sort=updateAt",
      label: `New Product`,
      children: <></>,
    },
    {
      key: "&sort=price",
      label: `Price Low To High`,
      children: <></>,
    },
    {
      key: "&sort=-price",
      label: `Price High To Low`,
      children: <></>,
    },
  ];

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await callFetchCategory();
      if (res && res.data) {
        const data = res.data.map((item) => {
          return { label: item, value: item };
        });
        setListCategory(data);
      }
    };
    fetchCategory();
  }, []);

  //books
  useEffect(() => {
    getBook();
  }, [current, pageSize, filters, sortQuery, searchTerm]);

  // get list book
  const getBook = async () => {
    console.log(searchTerm);
    let query = `current=${current}&pageSize=${pageSize}`;
    setIsLoading(true);
    if (filters) {
      query += `${filters}`;
    }
    if (sortQuery) {
      query += `${sortQuery}`;
    }
    if(searchTerm) {
      query += `&mainText=/${searchTerm}/i`;
    }
    const res = await getAllBook(query);
    if (res && res?.data) {
      setListBook(res.data.result);
      setTotal(res.data.meta.total);
    }
    setIsLoading(false);
  };
  const handleOnchangePage = (pagination) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
  };

  // display book name in url
  const nonAccentVietnamese = (str) => {
    str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
  };

  const convertSlug = (str) => {
    str = nonAccentVietnamese(str);
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from =
      "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
    const to =
      "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
    for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    return str;
  };

  const handleRedirectBook = (book) => {
    const slug = convertSlug(book.mainText);
    navigate(`/book/${slug}?id=${book._id}`)
  }
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
                  onClick={() => {
                    form.resetFields(), setFilters(""), setSearchTerm("");
                  }}
                  style={{ marginTop: 4 }}
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
                      {listCategory?.map((item, index) => {
                        return (
                          <Col
                            span={24}
                            key={`index-${index}`}
                            style={{ padding: "7px 0" }}
                          >
                            <Checkbox value={item.value}>{item.label}</Checkbox>
                          </Col>
                        );
                      })}
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
            <Spin spinning={isLoading} tip="Loading....">
              <div
                style={{
                  padding: "20px",
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                }}
              >
                <Row>
                  <Tabs
                    defaultActiveKey="&sort=-sold"
                    items={items}
                    onChange={(value) => {
                      setSortQuery(value);
                    }}
                    style={{ overflowX: "auto" }}
                  />
                </Row>
                <Row className="customize-row">
                  {listBook?.map((item, index) => {
                    return (
                      <div
                        className="column"
                        key={`book-${index}`}
                        onClick={() => handleRedirectBook(item)}
                      >
                        <div className="wrapper">
                          <div className="thumbnail">
                            <img
                              src={`${
                                import.meta.env.VITE_BACKEND_URL
                              }/images/book/${item.thumbnail}`}
                              alt="thumbnail book"
                            />
                          </div>
                          <div className="text" title={item.mainText}>
                            {item.mainText}
                          </div>
                          <div className="price">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(item?.price ?? 0)}
                          </div>
                          <div className="rating">
                            <Rate
                              value={5}
                              disabled
                              style={{ color: "#ffce3d", fontSize: 10 }}
                            />
                            <span>Solded {item.sold}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Row>
                <div style={{ marginTop: 30 }}></div>
                <Row style={{ display: "flex", justifyContent: "center" }}>
                  <Pagination
                    current={current}
                    total={total}
                    pageSize={pageSize}
                    responsive
                    onChange={(p, s) =>
                      handleOnchangePage({ current: p, pageSize: s })
                    }
                  />
                </Row>
              </div>
            </Spin>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
