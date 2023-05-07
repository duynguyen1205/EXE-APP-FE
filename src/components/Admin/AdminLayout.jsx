import {
  MenuUnfoldOutlined,
  UserOutlined,
  MenuFoldOutlined,
  TeamOutlined,
  AppstoreOutlined,
  ExceptionOutlined,
  DollarCircleOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Dropdown, Space, message, Avatar } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./admin.scss";
import { callLogout } from "../../services/api";
import { doLogoutAction } from "../../redux/account/accountSilce";
const { Content, Footer, Sider } = Layout;
const items = [
  {
    label: <Link to="/admin">Dashboard</Link>,
    key: "dashboard",
    icon: <AppstoreOutlined />,
  },
  {
    label: <span>Manager User</span>,
    icon: <UserOutlined />,
    children: [
      {
        label: <Link to="/admin/user">CRUD</Link>,
        key: "crud",
        icon: <TeamOutlined />,
      },
      {
        label: "Files",
        key: "Files",
        icon: <TeamOutlined />,
      },
    ],
  },
  {
    label: <Link to="/admin/book">Manager Books</Link>,
    key: "book",
    icon: <ExceptionOutlined />,
  },
  {
    label: <Link to="/admin/order">Manager Order</Link>,
    key: "order",
    icon: <DollarCircleOutlined />,
  },
];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);
  const user = useSelector((state) => state.account.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const res = await callLogout();
    if (res && res.data) {
      dispatch(doLogoutAction());
      message.success("Logged out successfully");
      navigate("/");
    }
  };

  const itemDropdown = [
    {
      label: <label>Account Manager</label>,
      key: "account",
    },
    {
      label: <a href="/">Home Page</a>,
      key: "homepage",
    },
    {
      label: (
        <label style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
          Log out
        </label>
      ),
      key: "logout",
    },
  ];

  const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`;

    return (
      <Layout
        style={{
          minHeight: "100vh",
        }}
        className="layout-admin"
      >
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div style={{ height: 32, margin: 16, textAlign: "center" }}>Admin</div>
          <Menu
            defaultSelectedKeys={[activeMenu]}
            mode="inline"
            items={items}
            onClick={(e) => setActiveMenu(e.key)}
          />
        </Sider>
  
        <Layout className="site-layout">
          <div className="admin-header">
            <span>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                { className: "trigger", onClick: () => setCollapsed(!collapsed) }
              )}
            </span>
  
            <Dropdown
              menu={{
                items: itemDropdown,
              }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                <Avatar src={urlAvatar}/>
                  {user?.fullName}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <Outlet />
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );

};
export default AdminLayout;
