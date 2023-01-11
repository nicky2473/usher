import styled from '@emotion/styled';
import { Button } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { SendOutlined, PlusOutlined } from '@ant-design/icons';
import ThemeSelectForm from '../../../components/reservation/secretgarden/ThemeSelectForm';

const Container = styled.div`
  padding: 20px;
`;

const Contents = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const AddFormButton = styled(Button)`
  position: absolute;
  right: 150px;
  bottom: 100px;
  width: 100px;
  height: 100px;
`;

const Reservation = styled(Button)`
  position: absolute;
  right: 30px;
  bottom: 100px;
  width: 100px;
  height: 100px;
`;

const Page = () => {
  const [formCounts, setFormCounts] = useState<number>(1);

  const itemRefs = useRef<unknown[]>([]);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, formCounts);
  }, [formCounts]);

  return (
    <Container>
      <Title>비밀의 화원</Title>
      <Contents>
        {new Array(formCounts).fill(0).map((_elem, index) => {
          return (
            <ThemeSelectForm
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
            />
          );
        })}
        <AddFormButton
          type='primary'
          icon={<PlusOutlined style={{ fontSize: '30px' }} />}
          shape='circle'
          onClick={() => {
            setFormCounts((prev) => prev + 1);
          }}
        />
        <Reservation
          type='primary'
          icon={<SendOutlined style={{ fontSize: '30px' }} />}
          shape='circle'
          onClick={() => {
            new Array(formCounts).fill(0).map((_elem, index) => {
              (itemRefs.current[index] as any).reservation();
            });
          }}
        />
      </Contents>
    </Container>
  );
};

export default Page;
