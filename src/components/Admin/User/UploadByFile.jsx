import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Modal, message, Upload, Table, notification } from "antd";
import * as XLSX from "xlsx";
import { createUserBulk } from "../../../services/api";
import book from "./book1.xlsx?url";
const { Dragger } = Upload;

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 1000);
};

const UploadByFile = (props) => {
  const isModalOpen = props.uploadMD;
  const [dataExcel, setDataExcel] = useState([]);
  const [fileList, setFileList] = useState([]);

  const handleSubmit = async () => {
    const data = dataExcel.map((item) => {
      item.password = "123456";
      return item;
    });
    const res = await createUserBulk(data);
    console.log(">>>>", res);
    if (res && res.data) {
      notification.success({
        description: `Sucesss: ${res.data.countSuccess}, Error: ${res.data.countError}`,
        message: "Import user success",
      });
      props.setUpLoadMd(false);
      setDataExcel([]);
      props.getUser();
      setFileList([]);
    } else {
      notification.error({
        description: res.message,
        message: "Something went wrong",
      });
    }
  };

  const handleCancel = () => {
    props.setUpLoadMd(false);
    setDataExcel([]);
    setFileList([]);
  };

  const propsUpload = {
    fileList,
    name: "file",
    multiple: false,
    maxCount: 1,
    customRequest: dummyRequest,
    //   action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    accept:
      ".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    onChange(info) {
      const { status } = info.file;
      setFileList(info.fileList);
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        if (info.fileList && info.fileList.length > 0) {
          const file = info.fileList[0].originFileObj;
          const render = new FileReader();
          render.readAsArrayBuffer(file);
          render.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const workSheet = workbook.Sheets["Sheet1"];
            const json = XLSX.utils.sheet_to_json(workSheet, {
              header: ["fullName", "email", "phone"],
              range: 1, // skip the header
            });
            if (json && json.length > 0) {
              setDataExcel(json);
            }
          };
        }
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <>
      <Modal
        title="Import data user"
        width={"55vw"}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        maskClosable={false}
        okText="Import"
        okButtonProps={{
          disabled: dataExcel.length < 1,
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
            Support for a single file. Only accept .csv, .xls, .xlsx or &nbsp;
            <a onClick={(e) => e.stopPropagation()} href={book} download>
              Download sample file
            </a>
          </p>
        </Dragger>
        <div style={{ paddingTop: 20 }}>
          <Table
            dataSource={dataExcel}
            title={() => <span>Data upload</span>}
            columns={[
              { dataIndex: "fullName", title: "Full Name" },
              { dataIndex: "email", title: "Email" },
              { dataIndex: "phone", title: "Phone" },
            ]}
            rowKey={"email"}
            pagination={{
              pageSize: 3,
            }}
          ></Table>
        </div>
      </Modal>
    </>
  );
};
export default UploadByFile;
