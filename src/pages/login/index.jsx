import { Link, useNavigate } from "react-router-dom";
import { Button, Divider, Form, message, notification } from "antd";
import { useState } from "react";
import "./loginCss.scss";
import "./util.scss";
import { login } from "../../services/api";
import { useDispatch } from "react-redux";
import { doLoginAction } from "../../redux/account/accountSilce";
const LoginPage = () => {
  const navigation = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [hasVal, setHasVal] = useState(false);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const { username, password } = values;
    setIsSubmit(true);
    const res = await login(username, password);
    setIsSubmit(false);
    if (res?.data) {
      dispatch(doLoginAction(res.data.user))
      localStorage.setItem("access_token", res.data.access_token);
      message.success("Đăng nhập thành công");
      navigation("/");
    } else {
      notification.error({
        message: "Có lỗi xảy ra vui lòng xem lại",
        description:
          res.message && Array.isArray(res.message)
            ? res.message[0]
            : res.message,
        duration: 5,
      });
    }
  };

  const handleBlur = (event) => {
    const inputValue = event.target.value.trim();
    if (inputValue !== "") {
      setHasVal(true);
    } else {
      setHasVal(false);
    }
  };
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <Form
            className="login100-form validate-form"
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
          >
            <span className="login100-form-title p-b-43">Login</span>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Tên đăng nhập không được để trống!",
                },
              ]}
            >
              <div className="wrap-input100">
                <input
                  className={`input100 ${hasVal ? "has-val" : ""}`}
                  onBlur={handleBlur}
                />
                <span className="focus-input100" />
                <span className="label-input100">User Name</span>
              </div>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Password không được để trống!" },
              ]}
            >
              <div className="wrap-input100">
                <input
                  className={`input100 ${hasVal ? "has-val" : ""}`}
                  onBlur={handleBlur}
                  type="password"
                />
                <span className="focus-input100" />
                <span className="label-input100">Password</span>
              </div>
            </Form.Item>

            <Form.Item>
              <div className="container-login100-form-btn">
                <Button
                  className="login100-form-btn"
                  type="primary"
                  htmlType="submit"
                  loading={isSubmit}
                >
                  Login
                </Button>
              </div>
            </Form.Item>
            <Divider>Or</Divider>
            <div className="text-center p-t-20 p-b-20">
              <span className="txt2">
                <Link to="/register"> Register here </Link>
              </span>
            </div>
          </Form>
          <div className="login100-more"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
