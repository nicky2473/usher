import React, { useState } from "react";
import styled from "@emotion/styled";
import { Layout, Menu, MenuProps } from "antd";
import { CalendarOutlined, CarryOutOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

import { ReactComponent as Maze } from "../../public/svg/maze.svg";

const Container = styled(Layout.Sider)`
  color: white;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 auto;
  margin: 20px 0 20px -10px;
  gap: 5px;
  cursor: pointer;

  .logo-name {
    font-size: 30px;
  }
`;

const Sidebar = () => {
  const [selectedKey, setSelectedKey] = useState<string>("");

  const router = useRouter();

  const items: MenuProps["items"] = [
    {
      key: "reservation",
      icon: <CalendarOutlined />,
      label: `예약하기`,
      onClick: () => {
        setSelectedKey("reservation");
        router.push("/reservation");
      },
    },
    {
      key: "reservation-check",
      icon: <CarryOutOutlined />,
      label: "예약확인",
      onClick: () => {
        setSelectedKey("reservation-check");
        router.push("/reservation/check");
      },
    },
  ];

  return (
    <Container>
      <Logo
        onClick={() => {
          setSelectedKey("");
          router.push("/");
        }}
      >
        <Maze />
        <div className="logo-name">Usher</div>
      </Logo>
      <Menu
        theme="dark"
        mode="inline"
        items={items}
        selectedKeys={[selectedKey]}
      />
    </Container>
  );
};

export default Sidebar;
