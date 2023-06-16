import React from 'react';
import { Button, Modal, Tabs } from 'antd';
import MomoPay from './MomoPay';
import BankPay from './BankPay';

const ModalPayment = (props) => {
    const items = [
        {
          key: "mono",
          label: "Mono Payment",
          children: <MomoPay sum={props.sum} />,
        },
        {
          key: "bank",
          label: "Bank payment",
          children: <BankPay sum={props.sum}/>,
        },
      ];
  return (
    <>
      <Modal title="Payment Method"    
      open={props.isModalOpen}
      footer={null}
      onCancel={() => props.setIsModalOpen(false) }
      maskClosable={false}
      width={"60vw"}
      centered>
         <Tabs defaultActiveKey="mono" items={items} />
      </Modal>
    </>
  );
}

export default ModalPayment;