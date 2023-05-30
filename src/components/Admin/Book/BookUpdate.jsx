import React, { useEffect, useState } from 'react';
import { Col, Divider, Form, Input, InputNumber, message, Modal, notification, Row, Select, Upload } from 'antd';
import { callFetchCategory, callUploadBookImg, updateBook } from '../../../services/api';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid';

const BookUpdate = (props) => {
    const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } = props;
    const [isSubmit, setIsSubmit] = useState(false);

    const [listCategory, setListCategory] = useState([])
    const [form] = Form.useForm();


    const [loading, setLoading] = useState(false);
    const [loadingSlider, setLoadingSlider] = useState(false);

    const [imageUrl, setImageUrl] = useState("");

    const [dataThumbnail, setDataThumbnail] = useState([])
    const [dataSlider, setDataSlider] = useState([])

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const [initForm, setInitForm] = useState(null);

    useEffect(() => {
        const fetchCategory = async () => {
            const res = await callFetchCategory();
            if (res && res.data) {
                const d = res.data.map(item => {
                    return { label: item, value: item }
                })
                setListCategory(d);
            }
        }
        fetchCategory();
    }, [])

    useEffect(() => {
        if (dataUpdate?._id) {
            const arrThumbnail = [
                {
                    uid: uuidv4(),
                    name: dataUpdate.thumbnail,
                    status: 'done',
                    url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`,
                }
            ]

            const arrSlider = dataUpdate?.slider?.map(item => {
                return {
                    uid: uuidv4(),
                    name: item,
                    status: 'done',
                    url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                }
            })

            const init = {
                _id: dataUpdate._id,
                mainText: dataUpdate.mainText,
                author: dataUpdate.author,
                price: dataUpdate.price,
                category: dataUpdate.category,
                quantity: dataUpdate.quantity,
                sold: dataUpdate.sold,
                thumbnail: { fileList: arrThumbnail },
                slider: { fileList: arrSlider }
            }
            setInitForm(init);
            setDataThumbnail(arrThumbnail);
            setDataSlider(arrSlider);
            form.setFieldsValue(init);
        }
        return () => {
            form.resetFields();
        }
    }, [dataUpdate])


    const onFinish = async (values) => {
        if (dataThumbnail.length === 0) {
            notification.error({
                message: 'Lỗi validate',
                description: 'Vui lòng upload ảnh thumbnail'
            })
            return;
        }

        if (dataSlider.length === 0) {
            notification.error({
                message: 'Lỗi validate',
                description: 'Vui lòng upload ảnh slider'
            })
            return;
        }


        const { mainText, author, price, sold, quantity, category } = values;
        const thumbnail = dataThumbnail[0].name;
        const slider = dataSlider.map(item => item.name);
        const _id = dataUpdate._id;
        const res = await updateBook( _id,thumbnail, slider, mainText, author, price, sold, quantity, category);
        setIsSubmit(true)
        if(res && res.data) {
            message.success("Update successfully");
            form.resetFields();
            setDataThumbnail([]);
            setDataSlider([]);
            setOpenModalUpdate(false);
            await props.getBook();
          }
          else {
            notification.error({
                message: "Update error",
                description: res.message
            })
          }
        setIsSubmit(false)
    };


    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange = (info, type) => {
        if (info.file.status === 'uploading') {
            type ? setLoadingSlider(true) : setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                type ? setLoadingSlider(false) : setLoading(false);
                setImageUrl(url);
            });
        }
    };


    const handleUploadFileThumbnail = async ({ file, onSuccess, onError }) => {
        const res = await callUploadBookImg(file);
        if (res && res.data) {
            setDataThumbnail([{
                name: res.data.fileUploaded,
                uid: file.uid
            }])
            onSuccess('ok')
        } else {
            onError('Have an error when upload file');
        }
    };

    const handleUploadFileSlider = async ({ file, onSuccess, onError }) => {
        const res = await callUploadBookImg(file);
        if (res && res.data) {
            //copy previous state => upload multiple images
            setDataSlider((dataSlider) => [...dataSlider, {
                name: res.data.fileUploaded,
                uid: file.uid
            }])
            onSuccess('ok')
        } else {
            onError('Have an error when upload file');
        }
    };

    const handleRemoveFile = (file, type) => {
        if (type === 'thumbnail') {
            setDataThumbnail([])
        }
        if (type === 'slider') {
            const newSlider = dataSlider.filter(x => x.uid !== file.uid);
            setDataSlider(newSlider);
        }
    }

    const handlePreview = async (file) => {
        if (file.url && !file.originFileObj) {
            setPreviewImage(file.url);
            setPreviewOpen(true);
            setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
            return;
        }
        // getBase64(file.originFileObj, (url) => {
        //     setPreviewImage(url);
        //     setPreviewOpen(true);
        //     setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
        // });
    };

    return (
        <>
          <Modal
            title="Update book"
            open={openModalUpdate}
            onOk={() => {
              form.submit();
            }}
            onCancel={() => {
              form.resetFields();
              setOpenModalUpdate(false);
              setDataUpdate(null);
              setInitForm(null);
            }}
            forceRender 
            okText={"Update book"}
            cancelText={"Cancel"}
            confirmLoading={isSubmit}
            width={"50vw"}
            //do not close when click fetchBook
            maskClosable={false}
            centered
          >
            <Divider />
    
            <Form form={form} name="basic" onFinish={onFinish} autoComplete="off" >
              <Row gutter={15}>
                <Col span={12}>
                  <Form.Item
                    labelCol={{ span: 24 }}
                    label="Book's Name"
                    name="mainText"
                    rules={[
                      { required: true, message: "Please enter a display name!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    labelCol={{ span: 24 }}
                    label="Author"
                    name="author"
                    rules={[{ required: true, message: "Please input author!" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    labelCol={{ span: 24 }}
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: "Please input price!" }]}
                  >
                    <InputNumber
                      min={0}
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      addonAfter="VND"
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    labelCol={{ span: 24 }}
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: "Please select category!" }]}
                  >
                    <Select
                      // defaultValue={null}
                      showSearch
                      allowClear
                      //  onChange={handleChange}
                      options={listCategory}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    labelCol={{ span: 24 }}
                    label="Quantity"
                    name="quantity"
                    rules={[{ required: true, message: "Please enter quantity!" }]}
                  >
                    <InputNumber min={1} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    labelCol={{ span: 24 }}
                    label="Sold"
                    name="sold"
                    initialValue={0}
                  >
                    <InputNumber
                      min={0}
                        // defaultValue={0}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    labelCol={{ span: 24 }}
                    label="Thumbnail Photo"
                    name="thumbnail"
                  >
                    <Upload
                      name="thumbnail"
                      listType="picture-card"
                      className="avatar-uploader"
                      maxCount={1}
                      multiple={false}
                      customRequest={handleUploadFileThumbnail}
                      beforeUpload={beforeUpload}
                      onChange={handleChange}
                      onPreview={handlePreview}
                      onRemove={(file) => handleRemoveFile(file, "thumbnail")}
                      defaultFileList={initForm?.thumbnail?.fileList ?? []}
                    >
                      <div>
                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    </Upload>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    labelCol={{ span: 24 }}
                    label="Slider Photos"
                    name="slider"
                  >
                    <Upload
                      multiple
                      name="slider"
                      listType="picture-card"
                      className="avatar-uploader"
                      customRequest={handleUploadFileSlider}
                      beforeUpload={beforeUpload}
                      onChange={(info) => handleChange(info, "slider")}
                      onRemove={(file) => handleRemoveFile(file, "slider")}
                      onPreview={handlePreview}
                      defaultFileList={initForm?.slider?.fileList ?? []}
                    >
                      <div>
                        {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Modal>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={() => setPreviewOpen(false)}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </>
      );
};

export default BookUpdate;


