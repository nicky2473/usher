import React from 'react';
import styled from '@emotion/styled';
import { Layout, Menu, MenuProps } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

import { ReactComponent as Maze } from '../../public/svg/maze.svg';

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
  const router = useRouter();

  const subItems = [
    {
      key: 'keyescape',
      label: '키이스케이프',
      onClick: (e: any) => {
        router.push('/reservation/keyescape');
      },
    },
    {
      key: 'secretgarden',
      label: '비밀의 화원',
      onClick: (e: any) => {
        router.push('/reservation/secretgarden');
      },
    },
    {
      key: 'goldenkey',
      label: '황금열쇠',
      onClick: (e: any) => {
        router.push('/reservation/goldenkey');
      },
    },
    {
      key: 'pointnine',
      label: '포인트나인',
      onClick: (e: any) => {
        router.push('/reservation/pointnine');
      },
    },
  ];

  const items: MenuProps['items'] = [
    {
      key: 'reservation',
      icon: <CalendarOutlined />,
      label: `예약하기`,
      children: subItems,
    },
  ];

  if (router.pathname === '/') return null;
  return (
    <Container>
      <Logo
        onClick={() => {
          router.push('/');
        }}
      >
        <Maze />
        <div className='logo-name'>Usher</div>
      </Logo>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={['reservation']}
        defaultOpenKeys={['keyescape']}
        items={items}
      />
    </Container>
  );
};

export default Sidebar;
