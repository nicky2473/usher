import React from "react";
import styled from "@emotion/styled";
import { Layout } from "antd";

const CustomFooter = styled(Layout.Footer)`
  margin: 0 auto;
`;

const Footer = () => {
  return <CustomFooter>Usher ©2022 Created by David Juno Cho</CustomFooter>;
};

export default Footer;
