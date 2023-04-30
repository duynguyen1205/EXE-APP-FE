import { Button, Divider, Form, Input, message, notification } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { callRegister } from '../../services/api';
import './register.scss';
const RegisterPage = () => {
  const navigation = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const onFinish = async(values) => {
    const {fullName, email, password, phone} = values;
    setIsSubmit(true);
    const res = await callRegister(fullName, email, password, phone); 
    setIsSubmit(false)
    if(res?.data?._id) {
        message.success('Đăng ký tài khoản thành công!');
        navigation('/login')
    }
    else {
        notification.error({
            message: "Có lỗi xảy ra",
            description:
                res.message && Array.isArray(res.message) ? res.message[0] : res.message,
            duration: 5
        })
    }
  };
  return (
    <div className="register-page">
        <main className="main">
            <div className="container">
                <section className="wrapper">
                    <div className="heading">
                        <h2 className="text text-large">Register</h2>
                        <Divider />
                    </div>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            labelCol={{ span: 24 }} //whole column
                            label="Full Name"
                            name="fullName"
                            rules={[{ required: true, message: 'Họ tên không được để trống!' }]}
                        >
                            <Input />
                        </Form.Item>


                        <Form.Item
                            labelCol={{ span: 24 }} //whole column
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Email không được để trống!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            labelCol={{ span: 24 }} //whole column
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            labelCol={{ span: 24 }} //whole column
                            label="Phone number"
                            name="phone"
                            rules={[{ required: true, message: 'Số điện thoại không được để trống!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                        // wrapperCol={{ offset: 6, span: 16 }}
                        >
                          
                            <Button type="primary" htmlType="submit" loading={isSubmit} > 
                                Register
                            </Button>
                        </Form.Item>
                        <Divider>Or</Divider>
                        <p className="text text-normal">Already have account?
                            <span>
                                <Link to='/login' > Login </Link>
                            </span>
                        </p>
                    </Form>
                </section>
            </div>
        </main>
    </div>
)
};

export default RegisterPage;
