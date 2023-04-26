import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotPermited = () => {
  const navigation = useNavigate()
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={() => navigation("/")}>
          Back Home
        </Button>
      }
    />
  );
};

export default NotPermited;
