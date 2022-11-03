import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { Layout } from 'antd';
import eruda from 'eruda';

const CustomFooter = styled(Layout.Footer)`
  text-align: center;
`;

const Footer = () => {
  useEffect(() => {
    eruda.init();
  }, []);

  return <CustomFooter>Usher ©2022 Created by David Juno Cho</CustomFooter>;
};

export default Footer;
