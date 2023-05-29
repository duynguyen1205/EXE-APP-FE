import React, { useEffect, useState } from "react";
import { Drawer, Badge, Descriptions, Divider, Modal, Upload } from "antd";
import moment from "moment/moment";
import { v4 as uuidv4 } from 'uuid';

const BookDetail = (props) => {
  const data = props.data;
  const open = props.isOpen;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => {
    setPreviewOpen(false); 
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const onClose = () => {
    props.setIsOpen(false);
    props.setDataBook(null);
  };
  useEffect(() => {
    if(data) {
      let imgThumbnail = {}, imgSilder = [];
      if(data.thumbnail) {
        imgThumbnail = {
          uid: uuidv4(),
          name: data.thumbnail,
          status: "done",
          url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${data.thumbnail}`,
        }
      }
      if(data.slider && data.slider.length > 0) {
        data.slider.map(item => {
          imgSilder.push({
            uid: uuidv4(),
            name: item,
            status: "done",
            url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
          })
        })
      }
      setFileList([imgThumbnail, ...imgSilder])
    }
  }, [data]);
  return (
    <>
      <Drawer
        title="Book Information"
        width={"55vw"}
        placement="right"
        onClose={onClose}
        open={open}
      >
        <Descriptions title="Book Detail" bordered column={2}>
          <Descriptions.Item label="ID">{data?._id}</Descriptions.Item>
          <Descriptions.Item label="Book Name">
            {data?.mainText}
          </Descriptions.Item>
          <Descriptions.Item label="Author">{data?.author}</Descriptions.Item>
          <Descriptions.Item label="Price">{data?.price} VND</Descriptions.Item>
          <Descriptions.Item label="Quantity">{data?.quantity}</Descriptions.Item>
          <Descriptions.Item label="Sold">{data?.sold}</Descriptions.Item>
          <Descriptions.Item label="Category" span={2}>
            <Badge status="processing" text={data?.category} />
          </Descriptions.Item>
          <Descriptions.Item label="Create At">
            {moment(data?.createdAt).format("DD-MM-YYYY HH:mm:ss")}
          </Descriptions.Item>
          <Descriptions.Item label="Update At">
            {moment(data?.updatedAt).format("DD-MM-YYYY HH:mm:ss")}
          </Descriptions.Item>
        </Descriptions>
        <Divider orientation="left">Book image</Divider>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          showUploadList={{ showRemoveIcon: false }}
        ></Upload>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
          centered
        >
          <img
            alt="example"
            style={{
              width: "100%",
            }}
            src={previewImage}
          />
        </Modal>
      </Drawer>
    </>
  );
};

export default BookDetail;
