import { Col, Divider, InputNumber, Row, Empty, Button, Steps } from "antd";
import { useDispatch, useSelector } from "react-redux";
// import "./order.scss";
import { useEffect, useState } from "react";
import { DeleteTwoTone } from "@ant-design/icons";
import { deleteCarts, doUpdateCartAction } from "../../redux/order/orderSilce";
import { useNavigate } from "react-router-dom";

const ViewOrder = (props) => {
  const carts = useSelector((state) => state.order.carts);
  const [sum, setSum] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const handleOnChangeInput = (value, book) => {
    if (!value || value < 1) return;
    if (!isNaN(value)) {
      dispatch(
        doUpdateCartAction({ quantity: value, detail: book, _id: book._id })
      );
    }
  };
  return (
    <>
      {carts.length === 0 ? (
        <Empty
          style={{ marginTop: 100 }}
          description={<span>Nothing in your cart</span>}
        >
          <Button type="primary" onClick={() => navigate("/")}>
            Buy now
          </Button>
        </Empty>
      ) : (
        <Row gutter={[20, 20]}>
          <Col md={18} xs={24}>
            {carts.map((book, index) => {
              const currentBookPrice = book?.detail?.price ?? 0;
              return (
                <div className="order-book" key={`index-${index}`}>
                  <div className="book-content">
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
                        <InputNumber
                          onChange={(value) => handleOnChangeInput(value, book)}
                          value={book.quantity}
                        />
                      </div>
                      <div className="sum">
                        Total:{" "}
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(currentBookPrice * book.quantity  ?? 0)}
                      </div>
                      <DeleteTwoTone
                        style={{ cursor: "pointer" }}
                        twoToneColor="#eb2f96"
                        onClick={() => dispatch(deleteCarts({ _id: book._id }))}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </Col>
          <Col md={6} xs={24}>
            <div className="sum-container" style={{ backgroundColor: "white" }}>
              <div className="order-sum">
                <span>Provisional</span>
                <span>
                  {" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(sum ?? 0)}
                </span>
              </div>
              <Divider style={{ margin: "10px 0" }} />
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
              <Divider style={{ margin: "10px 0" }} />
              <div className="button">
                <button onClick={() => props.setCurrentStep(1)}>Buy Now ({carts?.length ?? 0})</button>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ViewOrder;
