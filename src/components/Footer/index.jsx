import "./footer.scss";
import {
  FacebookFilled,
  InstagramOutlined,
  PhoneOutlined,
  HomeOutlined,
  MailOutlined,
} from "@ant-design/icons";
const Footer = () => {
  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <h3>
          Ci<span>Made</span>
        </h3>

        <p className="footer-links">
          <a href="#" className="link-1">
            Home
          </a>

          <a href="#">Blog</a>

          <a href="#">Pricing</a>

          <a href="#">About</a>

          <a href="#">Faq</a>

          <a href="#">Contact</a>
        </p>

        <p className="footer-company-name">Company CiMade © 2023</p>
      </div>

      <div className="footer-center">
        <div style={{ display: "flex", marginBottom: 10  }}>
          <div style={{ marginRight: 10 }}>
            <HomeOutlined />
          </div>

          <p>
            <span>Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ,</span> Thủ Đức City
          </p>
        </div>

        <div style={{ display: "flex", marginBottom: 10 }}>
          <div style={{ marginRight: 10 }}>
            <PhoneOutlined />
          </div>

          <p>096 5027959</p>
        </div>

        <div style={{ display: "flex", marginBottom: 10  }}>
          <div style={{ marginRight: 10 }}>
            <MailOutlined />
          </div>

          <p>
            <a href="mailto:CiMade@gmail.com">CiMade@gmail.com</a>
          </p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span>About the company</span>
          Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce
          euismod convallis velit, eu auctor lacus vehicula sit amet.
        </p>

        <div className="footer-icons">
          <a href="#">
            <FacebookFilled />
          </a>
          <a href="#">
            <InstagramOutlined />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
