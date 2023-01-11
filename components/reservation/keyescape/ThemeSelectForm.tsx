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

import { keyescapeThemes } from '../../../shared/constants/Themes';
import {
  keyescapeShops,
  keyescapeThemeNum,
  keyescapeZizumNum,
} from '../../../shared/constants/shops/Keyescape';
import { KeyescapeZizumKey } from '../../../shared/types/keyescape.type';
import { toast } from 'react-toastify';

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
  const [themeTimeNumber, setThemeTimeNumber] = useState<Map<string, number>>(
    new Map()
  );

  const [selectedShop, setSelectedShop] = useState<KeyescapeZizumKey | null>();
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string | null>();
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  useImperativeHandle(ref, () => {
    const reservation = async () => {
      if (!selectedTheme || !selectedShop || !selectedDate || !selectedTime) {
        toast.error('모든 폼 양식을 채워주세요.');

        return;
      }

      try {
        const { data: revMake } = await axios.post(
          `/api/web/home.php`,
          qs.stringify({
            zizum_num: keyescapeZizumNum[selectedShop],
            rev_days: selectedDate,
            theme_num: keyescapeThemeNum[selectedShop]?.[selectedTheme],
            theme_time_num: themeTimeNumber.get(selectedTime),
            go: 'rev.make2',
          })
        );

        const $revMake = cheerio.load(revMake);
        const spamCode = $revMake('.spam_code');
        const hiddenInputs = $revMake('input[type=hidden]');

        let prices = {} as any;

        hiddenInputs.each((index, el) => {
          if (index <= 2 || $revMake(el).attr('value') === 'make') return;

          prices[`price${index - 2}`] = $revMake(el).attr('value');
          if (index === 4) prices['price'] = $revMake(el).attr('value');
        });

        const phoneNumber = phone.split('-');

        const { data: revMake2 } = await axios.post(
          '/api/web/rev.act.php',
          qs.stringify({
            name,
            mobile1: phoneNumber[0],
            mobile2: phoneNumber[1],
            mobile3: phoneNumber[2],
            person: 2,
            memo: '',
            str_spam: spamCode.text().trim(),
            ck_agree: 'on',
            rev_days: selectedDate,
            theme_time_num: themeTimeNumber.get(selectedTime),
            ...prices,
            act: 'make',
          })
        );

        const $revMake2 = cheerio.load(revMake2);
        const content = $revMake2('meta[http-equiv=Refresh]').attr('content');
        const num = content?.slice(content.lastIndexOf('=') + 1);

        const { data: revKcp } = await axios.post(
          '/api/web/home.php',
          qs.stringify({
            go: 'rev.kcp_pc',
            num,
          })
        );

        const $revKcp = cheerio.load(revKcp);
        const ckCode = $revKcp('input[name=ck_code]').attr('value');

        const { data: result } = await axios.get(
          '/api/web/rev.make_mutong.php',
          {
            params: {
              go: 'rev.kcp_pc',
              num,
              payment: 'D',
              ck_code: ckCode,
            },
          }
        );

        console.log(result);
        console.log('예약번호: ', ckCode);

        if (ckCode) {
          toast.info(`예약번호: ${ckCode}`, {
            autoClose: false,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    return { reservation };
  });

  useEffect(() => {
    setSelectedTime(null);
  }, [selectedTheme, selectedShop, selectedDate]);

  useEffect(() => {
    if (!selectedTheme || !selectedShop || !selectedDate) return;

    const getTimeslots = async () => {
      try {
        const { data } = await axios.get('/api/web/rev.theme_time.php', {
          params: {
            zizum_num: keyescapeZizumNum[selectedShop],
            rev_days: selectedDate,
            theme_num: keyescapeThemeNum[selectedShop]?.[selectedTheme],
          },
        });

        const $ = cheerio.load(data);
        const timeslots = $('li');

        let themeTimeNumberMap = new Map();
        timeslots.each((_index, el) => {
          // text() 메서드를 사용하기 위해 Node 객체인 el을 $로 감싸서 cheerio 객체로 변환
          const href = $(el).parent('a').attr('href');
          const time = $(el).text().trim();

          console.log(href, time);

          themeTimeNumberMap.set(time, Number(href?.split("'")[1]));
        });

        setThemeTimeNumber(themeTimeNumberMap);

        console.log(themeTimeNumberMap);
      } catch (error) {
        console.log(error);
      }
    };

    getTimeslots();
  }, [selectedTheme, selectedShop, selectedDate]);

  return (
    <Container>
      <Contents>
        <div>
          <Label>이름</Label>
          <Input
            style={{ width: 200 }}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <Label>전화번호</Label>
          <Input
            style={{ width: 200 }}
            placeholder='000-0000-0000'
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>
        <div>
          <Label>매장</Label>
          <Select
            value={selectedShop}
            style={{ width: 200 }}
            onChange={(selected: KeyescapeZizumKey) => {
              setSelectedShop(selected);
              setSelectedTheme('');
            }}
          >
            {Object.keys(keyescapeShops).map((shopKey) => (
              <Select.Option key={shopKey} value={shopKey}>
                {keyescapeShops[shopKey as KeyescapeZizumKey]}
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
              keyescapeThemes[selectedShop]?.map((theme) => (
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
            onChange={(e) => {
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
