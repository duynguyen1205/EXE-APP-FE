import React, { useState } from "react";
import { SiSololearn } from "react-icons/si";
import { FiShoppingCart } from "react-icons/fi";
import { VscSearchFuzzy } from "react-icons/vsc";
import { Divider, Badge, Drawer, message, Avatar, Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useNavigate } from "react-router";
import { callLogout } from "../../services/api";
import "./header.scss";
import { doLogoutAction } from "../../redux/account/accountSilce";
import { Link } from "react-router-dom";
import { LoginOutlined } from "@ant-design/icons";
import ManagerAccount from "../user/ManagerAcount";
const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const isAuthenticated = useSelector((state) => state.account.isAuthorized);
  const user = useSelector((state) => state.account.user);
  const carts = useSelector((state) => state.order.carts);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const res = await callLogout();
    if (res && res.data) {
      dispatch(doLogoutAction());
      message.success("Log out successfully");
      navigate("/");
    }
  };
  let items = [
    {
      label: (
        <label
          style={{ cursor: "pointer" }}
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Account Manager
        </label>
      ),
      key: "account",
    },
    {
      label: (
        <label
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/history")}
        >
          Order History
        </label>
      ),
      key: "order_history",
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
  if (user?.role === "ADMIN") {
    // đẩy lên đầu tiên khác với push
    items.unshift({
      label: <Link to="/admin">Admin page</Link>,
      key: "admin",
    });
  }
  const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
    user?.avatar
  }`;
  const orderNumber = useSelector((state) => state.order.carts);
  const cartIsEmpty = carts.length === 0;

  const content = (
    <div className="popover-cart-body">
      {cartIsEmpty ? (
        <div className="image-cart">
          <p>Nothing in your cart</p>
        </div>
      ) : (
        <div className="popover-cart-content">
          {carts?.map((book, index) => {
            return (
              <div className="book" key={`book-${index}`}>
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                    book?.detail.thumbnail
                  }`}
                />
                <div>{book?.detail.mainText}</div>
                <div className="price">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(book.detail.price ?? 0)}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="popover-cart-footer">
        <button onClick={() => navigate("/order")}>View detail</button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="header-container">
        <header className="page-header">
          <div className="page-header__top">
            <div
              className="page-header__toggle"
              onClick={() => {
                setOpenDrawer(true);
              }}
            >
              ☰
            </div>
            <div className="page-header__logo">
              <span className="logo" onClick={() => navigate("/")}>
                <SiSololearn className="rotate icon-react" /> CiMade
                <VscSearchFuzzy className="icon-search" />
              </span>
              <input
                className="input-search"
                type={"text"}
                placeholder="Search "
              />
            </div>
          </div>
          <nav className="page-header__bottom">
            <ul id="navigation" className="navigation">
              <li className="navigation__item">
                <Popover
                  content={content}
                  title="New products added"
                  placement="topRight"
                  arrow={true}
                  className="popover-carts"
                  rootClassName="popover-carts"
                >
                  <Badge
                    count={orderNumber?.length ?? 0}
                    showZero
                    size={"small"}
                  >
                    <FiShoppingCart className="icon-cart" />
                  </Badge>
                </Popover>
              </li>
              <li className="navigation__item mobile">
                <Divider type="vertical" />
              </li>
              <li className="navigation__item mobile">
                {!isAuthenticated ? (
                  <span onClick={() => navigate("/login")}>
                    {" "}
                    <LoginOutlined style={{ fontSize: 20, color: "red" }} />
                  </span>
                ) : (
                  <Dropdown menu={{ items }} trigger={["click"]}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        <Avatar src={urlAvatar} />
                        {user?.fullName}
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                )}
              </li>
            </ul>
          </nav>
        </header>
      </div>
      <Drawer
        title="Menu chức năng"
        placement="left"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <p>Account Management</p>
        <Divider />

        <p>Logout</p>
        <Divider />
      </Drawer>

      {/* Account managermen */}
      <ManagerAccount openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default Header;
