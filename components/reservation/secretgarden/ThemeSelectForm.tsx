import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { Select, DatePicker, Input } from 'antd';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import axios from 'axios';
import * as cheerio from 'cheerio';
import qs from 'qs';

import { secretgardenThemes } from '../../../shared/constants/Themes';
import { toast } from 'react-toastify';
import { SecretgardenZizumKey } from '../../../shared/types/secretgarden.types';
import {
  secretgardenShops,
  secretgardenThemeNum,
} from '../../../shared/constants/shops/Secretgarden';

const Container = styled.div`
  border: solid 1px rgba(197, 197, 197, 0.5);
  padding: 20px;
  border-radius: 10px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.div`
  font-size: 17px;
  font-weight: bold;
`;

const ThemeSelectForm = forwardRef((_props, ref) => {
  const [selectedShop, setSelectedShop] =
    useState<SecretgardenZizumKey | null>();
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  useImperativeHandle(ref, () => {
    const reservation = async () => {
      if (!selectedTheme || !selectedShop || !selectedDate || !selectedTime) {
        toast.error('모든 폼 양식을 채워주세요.');

        return;
      }

      try {
        const { data: mySpam } = await axios.post(
          '/secretgarden/bbsbb/myspam.php'
        );

        const $mySpam = cheerio.load(mySpam);
        const spamNames = $mySpam('span');

        let WKey = '';

        spamNames.each((_index, el) => {
          WKey += $mySpam(el).text();
        });

        const { data: reservationData } = await axios.post(
          `/secretgarden/reservation_02.html`,
          qs.stringify({
            prdno: secretgardenThemeNum[selectedShop]?.[selectedTheme],
            rdate: selectedDate,
            rtime: selectedTime,
          })
        );

        const $reservationData = cheerio.load(reservationData);

        const players = $reservationData('#players option:nth-child(1)').attr(
          'value'
        );
        const booking_num = $reservationData('input[name=booking_num]').attr(
          'value'
        );
        const next_time = $reservationData('input[name=next_time]').attr(
          'value'
        );

        const { data: reservation } = await axios.post(
          `/secretgarden/reservation_02.php`,
          qs.stringify({
            doing: 'insert',
            productno: secretgardenThemeNum[selectedShop]?.[selectedTheme],
            derv_date: selectedDate,
            derv_time: selectedTime,
            booking_num,
            next_time,
            players,
            o_name: '조준호',
            o_hand_ph01: '010',
            o_hand_ph02: '6741',
            o_hand_ph03: '2473',
            paytype: 1,
            passwd: '3550',
            comment: '',
            WKey,
            privacy: 'Y',
          })
        );

        console.log(reservation);
      } catch (error) {
        console.log(error);
      }
    };

    return { reservation };
  });

  useEffect(() => {
    setSelectedTime('');
  }, [selectedTheme, selectedShop, selectedDate]);

  return (
    <Container>
      <Contents>
        <div>
          <Label>매장</Label>
          <Select
            value={selectedShop}
            style={{ width: 200 }}
            onChange={(selected: SecretgardenZizumKey) => {
              setSelectedShop(selected);
              setSelectedTheme('');
            }}
          >
            {Object.keys(secretgardenShops).map((shopKey) => (
              <Select.Option key={shopKey} value={shopKey}>
                {secretgardenShops[shopKey as SecretgardenZizumKey]}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div>
          <Label>테마</Label>
          <Select
            value={selectedTheme}
            style={{ width: 200 }}
            onChange={(selected: string) => {
              setSelectedTheme(selected);
            }}
          >
            {selectedShop &&
              secretgardenThemes[selectedShop]?.map((theme) => (
                <Select.Option key={theme} value={theme}>
                  {theme}
                </Select.Option>
              ))}
          </Select>
        </div>
        <div>
          <Label>날짜</Label>
          <DatePicker
            style={{ width: 200 }}
            onChange={(_date, dateString) => {
              setSelectedDate(dateString);
            }}
            disabledDate={(current) =>
              current && current < dayjs().startOf('day')
            }
          />
        </div>
        <div>
          <Label>시간</Label>
          <Input
            style={{ width: 200 }}
            placeholder='HH:mm'
            onBlur={(e) => {
              setSelectedTime(e.target.value);
            }}
          />
        </div>
      </Contents>
    </Container>
  );
});

ThemeSelectForm.displayName = 'ThemeSelectForm';

export default ThemeSelectForm;
