import { Row, Col, Rate, Divider, Button, notification, message } from "antd";
import ImageGallery from "react-image-gallery";
import "./book.scss";
import { useRef, useState } from "react";
import ModalGallery from "./ModalGallery";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { BsCartPlus } from "react-icons/bs";
import BookLoader from "./BookLoader";
import { useDispatch } from "react-redux";
import { doAddToCartAction } from "../../redux/order/orderSilce";
const BookDeatail = (props) => {
  const dispatch = useDispatch();
  const dataBook = props;

  const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ currentQuantity, setCurrentQuantity ] = useState(1);
  const refGallery = useRef(null);

  const images = dataBook?.data?.items ?? [];
  const handleOnClickImage = () => {
    //get current index onClick
    // alert(refGallery?.current?.getCurrentIndex());
    setIsOpenModalGallery(true);
    setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0);
    // refGallery?.current?.fullScreen()
  };
  const onChangeButton = (value) => {
    if (value === "PLUS") {
      if (currentQuantity >= dataBook.data.quantity) {
        notification.error({
          message: "Invalid quantity",
          description: "Maximum quantity",
        });
        return
      } else {
        setCurrentQuantity(currentQuantity + 1)
      }
    }
    if (value === "MINUS") {
      if (currentQuantity - 1 <= 0) {
        notification.error({
          message: "Invalid quantity",
          description: "Can not change quantity to 0",
        });
        return
      }
      else {
        setCurrentQuantity(currentQuantity - 1)
      }
    }
  };
  const handleInput = (value) => {
    // + biến thành số
    if(!isNaN(value)) { // not a number
      if(+value > 0 && +value < +dataBook.data.quantity) {
        setCurrentQuantity(+value)
      }
    }
  }
  const handleAddBook = (quantity, dataBook) => {
      dispatch(doAddToCartAction({ quantity, detail: dataBook.data, _id: dataBook.data._id }));
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
                      <span style={{ fontWeight: "bolder" }}>
                        Remaining:{" "}
                      </span>{" "}
                      {dataBook.data.quantity}
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
                      <button onClick={()=> onChangeButton("MINUS")}>
                        <MinusOutlined />
                      </button>
                      <input onChange={(event) => handleInput(event.target.value)} value={currentQuantity} />
                      <button onClick={()=> onChangeButton("PLUS")}>
                        <PlusOutlined />
                      </button>
                    </span>
                  </div>
                  <div className="buy">
                    <button
                      className="cart"
                      onClick={() => handleAddBook(currentQuantity, dataBook)}
                    >
                      <BsCartPlus className="icon-cart" />
                      <span>Add to carts </span>
                    </button>
                    <button className="now">Buy now</button>
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
