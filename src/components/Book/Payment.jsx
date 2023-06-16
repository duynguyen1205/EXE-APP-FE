import { DeleteTwoTone, LoadingOutlined } from "@ant-design/icons";
import {
  Col,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  message,
  notification,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callPlaceOrder } from "../../services/api";
import { doPlaceOrderAction } from "../../redux/order/orderSilce";
import ModalPayment from "./ModalPayment";

const Payment = (props) => {
  const carts = useSelector((state) => state.order.carts);
  const users = useSelector((state) => state.account.user);
  const [sum, setSum] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [value, setValue] = useState(1); // Giá trị ban đầu của radio button được chọn
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleChange = (e) => {
    setValue(e.target.value);
    if(e.target.value === 2) {
      setIsModalOpen(true);
    }
  };
  useEffect(() => {
    if (carts && carts.length > 0) {
      let sum = 0;
      carts.map((item) => {
        sum += item.quantity * item.detail.price;
      });
      setSum(sum);
    } else {
      setSum(0);
    }
  }, [carts]);

  const onFinish = async (values) => {
    setIsSubmit(true);
    const detailsOrder = carts.map((item) => {
      return {
        bookName: item.detail.mainText,
        quantity: item.quantity,
        _id: item._id,
      };
    });
    const data = {
      name: values.name,
      address: values.address,
      phone: values.phone,
      totalPrice: sum,
      detail: detailsOrder,
    };
    const res = await callPlaceOrder(data);
    if (res && res.data) {
      message.success("Order successfully");
      dispatch(doPlaceOrderAction());
      props.setCurrentStep(2);
    } else {
      notification.error({
        message: "Order failed",
        description: res.message,
      });
    }
    setIsSubmit(false);
  };
  return (
    <>
      <Row gutter={[20, 20]}>
        <Col md={17} xs={24}>
          {carts.map((book, index) => {
            return (
              <div className="payment-book" key={`index-${index}`}>
                <div className="payment-content">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                      book?.detail.thumbnail
                    }`}
                  />
                  <div className="title">
                    <div>{book?.detail.mainText}</div>
                  </div>
                  <div className="price">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(book.detail.price ?? 0)}
                  </div>
                  <div className="action">
                    <div className="quantity">
                      <span>Quantity: {book.quantity}</span>
                    </div>
                    <div className="sum">
                      Total:{" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(sum ?? 0)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Col>
        <Col md={7} xs={24}>
          <div
            className="payment-container"
            style={{ backgroundColor: "white" }}
          >
            <div className="form-payment">
              <Form
                onFinish={onFinish}
                form={form}
                name="basic"
                autoComplete="off"
                style={{ marginLeft: 20, marginRight: 20 }}
              >
                <Form.Item
                  labelCol={{ span: 24 }} //whole column
                  label="Full Name"
                  name="name"
                  initialValue={users.fullName}
                  rules={[{ required: true, message: "name cannot null" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  labelCol={{ span: 24 }} //whole column
                  label="Phone number"
                  name="phone"
                  initialValue={users.phone}
                  rules={[
                    {
                      required: true,
                      message: "Phone number must be filled",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  labelCol={{ span: 24 }}
                  name="address"
                  label="Address"
                  rules={[
                    {
                      required: true,
                      message: "Address must be filled",
                    },
                  ]}
                >
                  <TextArea rows={4} />
                </Form.Item>
              </Form>
            </div>
            <div className="info">
              <div
                className="method"
                style={{
                  marginBottom: 10,
                }}
              >
                <div style={{margin: 20}}>Payments:</div>
                <Radio.Group onChange={handleChange} style={{marginLeft:20, marginBottom: 10}} value={value}>
                  <Radio value={1}>Payment on delivery</Radio>
                  <Radio value={2}>Online payment</Radio>
                </Radio.Group>
              </div>
            </div>
            <Divider style={{ margin: "5px 0" }} />
            <div className="caculator">
              <span>Total Pay</span>
              <span className="currency">
                {" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(sum ?? 0)}
              </span>
            </div>
            <Divider style={{ margin: "5px 0" }} />
            <div className="button">
              <button
                onClick={() => {
                  form.submit();
                }}
                disabled={isSubmit}
              >
                {isSubmit && (
                  <span>
                    <LoadingOutlined />
                    &nbsp;
                  </span>
                )}
                Payment ({carts?.length ?? 0})
              </button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Payment modal */}
      <ModalPayment isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} sum={sum}/>
    </>
  );
};

export default Payment;
