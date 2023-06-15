import { Modal, Tabs } from "antd";
import UserInfo from "./UserInfo";
import ChangePassword from "./ChangePassword";

const ManagerAccount = (props) => {
  const items = [
    {
      key: "info",
      label: "Update Information",
      children: <UserInfo />,
    },
    {
      key: "password",
      label: "Change Password",
      children: <ChangePassword />,
    },
  ];
  return (
    <Modal
      title="Account Management"
      open={props.openModal}
      footer={null}
      onCancel={() => props.setOpenModal(false) }
      maskClosable={false}
      width={"60vw"}
      centered
    >
      <Tabs defaultActiveKey="info" items={items} />
    </Modal>
  );
};

export default ManagerAccount;
