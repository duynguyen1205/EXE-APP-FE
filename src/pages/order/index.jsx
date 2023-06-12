import { Button, Result, Steps } from "antd";
import "./order.scss";
import {
  LoadingOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import ViewOrder from "../../components/Book/ViewOrder";
import Payment from "../../components/Book/Payment";
import { useNavigate } from "react-router-dom";
const OrderPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const placeOrderStatus = currentStep === 1 ? "process" : "finish";
  const placeOrderIcon = currentStep === 1 ? <LoadingOutlined /> : null;
  const navigate = useNavigate();
  return (
    <div style={{ background: "#efefef", padding: "20px 0" }}>
      <div
        className="order-contanier"
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          minHeight: "calc(100vh - 150px)",
        }}
      >
        <div className="steps-order">
          <Steps
            size="small"
            current={currentStep}
            status="finish"
            items={[
              {
                title: "Order",
              },
              {
                title: "Place an order",
                status: placeOrderStatus,
                icon: placeOrderIcon,
              },
              {
                title: "Payment",
              },
            ]}
          />
        </div>

        {currentStep === 0 && <ViewOrder setCurrentStep={setCurrentStep} />}
        {currentStep === 1 && <Payment setCurrentStep={setCurrentStep} />}
        {currentStep === 2 && (
          <Result
            icon={<SmileOutlined />}
            title="Your order has been placed successfully"
            extra={<Button type="primary" onClick={()=> navigate("/history")}>View order history</Button>}
          />
        )}
      </div>
    </div>
  );
};

export default OrderPage;
