import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { Layout } from 'antd';

const CustomFooter = styled(Layout.Footer)`
  text-align: center;
`;

const Footer = () => {
  return <CustomFooter>Usher ©2022 Created by David Juno Cho</CustomFooter>;
};

export default Footer;
