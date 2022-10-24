import { Button } from "antd";
import React from "react";
import styled from "@emotion/styled";
import { SendOutlined } from "@ant-design/icons";

const Reservation = styled(Button)`
  position: absolute;
  right: 30px;
  bottom: 100px;
  width: 100px;
  height: 100px;
`;

const ReservationButton = () => {
  return (
    <Reservation
      type="primary"
      icon={<SendOutlined style={{ fontSize: "30px" }} />}
      shape="circle"
    />
  );
};

export default ReservationButton;
