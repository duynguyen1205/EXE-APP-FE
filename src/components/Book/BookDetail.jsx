import { Row, Col, Rate, Divider, Button } from "antd";
import ImageGallery from "react-image-gallery";
import "./book.scss";
import { useRef, useState } from "react";
import ModalGallery from "./ModalGallery";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { BsCartPlus } from "react-icons/bs";
import BookLoader from "./BookLoader";
const BookDeatail = (props) => {
  const dataBook = props;

  const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const refGallery = useRef(null);

  const images = dataBook?.data?.items ?? [];
  const handleOnClickImage = () => {
    //get current index onClick
    // alert(refGallery?.current?.getCurrentIndex());
    setIsOpenModalGallery(true);
    setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0);
    // refGallery?.current?.fullScreen()
  };
  console.log(dataBook);
  const onChange = (value) => {
    console.log("changed", value);
  };
  return (
    <div style={{ background: "#efefef", padding: "20px 0" }}>
      <div
        className="bookpage-container"
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          minHeight: "calc(100vh - 150px)",
        }}
      >
        <div style={{ padding: "20px", background: "#fff", borderRadius: 5 }}>
          {dataBook && dataBook.data._id ? (
            <Row gutter={[20, 20]}>
              <Col md={10} sm={0} xs={0}>
                <ImageGallery
                  ref={refGallery}
                  items={images}
                  showPlayButton={false} //hide play button
                  showFullscreenButton={false} //hide fullscreen button
                  renderLeftNav={() => <></>} //left arrow === <> </>
                  renderRightNav={() => <></>} //right arrow === <> </>
                  slideOnThumbnailOver={true} //onHover => auto scroll images
                  onClick={() => handleOnClickImage()}
                />
              </Col>
              <Col md={14} sm={24}>
                <Col md={0} sm={24} xs={24}>
                  <ImageGallery
                    ref={refGallery}
                    items={images}
                    showPlayButton={false} //hide play button
                    showFullscreenButton={false} //hide fullscreen button
                    renderLeftNav={() => <></>} //left arrow === <> </>
                    renderRightNav={() => <></>} //right arrow === <> </>
                    showThumbnails={false}
                  />
                </Col>
                <Col span={24}>
                  <div className="author">
                    Author: <a href="#">{dataBook.data.author}</a>{" "}
                  </div>
                  <div className="title">{dataBook.data.mainText}</div>
                  <div className="rating">
                    <Rate
                      value={5}
                      disabled
                      style={{ color: "#ffce3d", fontSize: 12 }}
                    />
                    <span className="sold">
                      <Divider type="vertical" />
                      Sold {dataBook.data.sold}
                    </span>
                    <span className="sold">
                      <Divider type="vertical" />
                     <span style={{fontWeight:"bolder"}}>Remaining: </span>  {dataBook.data.quantity}
                    </span>
                  </div>
                  <div className="price">
                    <span className="currency">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(dataBook.data.price ?? 0)}
                    </span>
                  </div>
                  <div className="delivery">
                    <div>
                      <span className="left">Delivery</span>
                      <span className="right">Free ship</span>
                    </div>
                  </div>
                  <div className="quantity">
                    <span className="left">Quantity</span>
                    <span className="right">
                      <button>
                        <MinusOutlined />
                      </button>
                      <input defaultValue={1} />
                      <button>
                        <PlusOutlined />
                      </button>
                    </span>
                  </div>
                  <div className="buy">
                    <button className="cart">
                      <BsCartPlus className="icon-cart" />
                      <span>Thêm vào giỏ hàng</span>
                    </button>
                    <button className="now">Mua ngay</button>
                  </div>
                </Col>
              </Col>
            </Row>
          ) : (
            <BookLoader />
          )}
        </div>
      </div>
      <ModalGallery
        isOpen={isOpenModalGallery}
        setIsOpen={setIsOpenModalGallery}
        currentIndex={currentIndex}
        items={images}
        title={"hardcode"}
      />
    </div>
  );
};

export default BookDeatail;
