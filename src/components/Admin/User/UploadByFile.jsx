import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Modal, message, Upload, Table } from "antd";

const { Dragger } = Upload;
const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 1000);
};
const propsUpload = {
  name: "file",
  multiple: false,
  maxCoubt: 1,
  customRequest: dummyRequest,
  //   action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  accept:
    ".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const UploadByFile = (props) => {
  const isModalOpen = props.uploadMD;

  const handleOk = () => {
    props.setUpLoadMd(false);
  };
  const handleCancel = () => {
    props.setUpLoadMd(false);
  };

  return (
    <>
      <Modal
        title="Import data user"
        width={"55vw"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        okText="Import"
        okButtonProps={{
          disabled: true,
        }}
        centered
      >
        <Dragger {...propsUpload}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single file. Strictly prohibited from uploading
            company data or other banned files.
          </p>
        </Dragger>
        <div style={{ paddingTop: 20 }}>
          <Table
            title={() => <span>Data upload</span>}
            columns={[
              { dataIndex: "fullName", title: "Full Name" },
              { dataIndex: "email", title: "Email" },
              { dataIndex: "phone", title: "Phone" },
            ]}
          ></Table>
        </div>
      </Modal>
    </>
  );
};
export default UploadByFile;
