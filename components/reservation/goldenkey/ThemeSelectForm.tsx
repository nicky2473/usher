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

import { toast } from 'react-toastify';
import { GoldenkeyZizumKey } from '../../../shared/types/goldenkey.type';
import {
  goldenkeyShops,
  goldenkeyZizumNum,
} from '../../../shared/constants/shops/Goldenkey';
import { goldenkeyThemes } from '../../../shared/constants/Themes';

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
  const [selectedShop, setSelectedShop] = useState<GoldenkeyZizumKey | null>();
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string | null>();

  useImperativeHandle(ref, () => {
    const cancel = async () => {
      try {
        const { data: cancel } = await axios.post(
          '/goldenkey/core/res/rev.act.php',
          qs.stringify({
            name: '조준호',
            mobile: '010-6741-2473',
            ck_code: 89218,
            act: 'cancel',
          })
        );

        console.log(cancel);
      } catch (error) {
        console.log(error);
      }
    };

    const reservation = async () => {
      if (!selectedTheme || !selectedShop || !selectedDate || !selectedTime) {
        toast.error('모든 폼 양식을 채워주세요.');

        return;
      }

      let theme_time_num;

      try {
        try {
          const { data } = await axios.get('/goldenkey/layout/res/home.php', {
            params: {
              rev_days: selectedDate,
              s_zizum: goldenkeyZizumNum[selectedShop],
              go: 'rev.make',
            },
          });

          const $ = cheerio.load(data);
          const theme = $(`.h3_theme:contains(${selectedTheme})`);
          const time = theme
            .parent('.theme_Title')
            .siblings('.time_Area')
            .children('ul')
            .children('li')
            .children('a')
            .children(`.time:contains(${selectedTime})`);
          const href = time.parent('a').attr('href');
          theme_time_num = href?.slice(href.lastIndexOf('=') + 1);
        } catch (error) {
          console.log(error);
        }

        const { data: revMake } = await axios.get(
          `/goldenkey/layout/res/home.php`,
          {
            params: {
              go: 'rev.make.input',
              rev_days: selectedDate,
              theme_time_num,
            },
          }
        );

        const $revMake = cheerio.load(revMake);
        const hiddenInputs = $revMake('input[type=hidden]');

        let params = {} as any;

        hiddenInputs.each((_index, el) => {
          const name = $revMake(el).attr('name') ?? '';

          params[name] = $revMake(el).attr('value');
        });

        const { data: revAct } = await axios.post(
          '/goldenkey/core/res/rev.act.php',
          qs.stringify({
            name: '조준호',
            mobile1: '010',
            mobile2: '6741',
            mobile3: '2473',
            person: 2,
            ck_agree: 'on',
            ...params,
          })
        );

        const $revAct = cheerio.load(revAct);
        const content = $revAct('meta[http-equiv=Refresh]').attr('content');
        const num = content?.slice(content.lastIndexOf('=') + 1);

        const { data: revKcp } = await axios.get(
          '/goldenkey/layout/res/home.php',
          {
            params: {
              go: 'rev.kcp',
              num,
            },
          }
        );

        const $revKcp = cheerio.load(revKcp);
        const ck_code = $revKcp('input[name=ck_code]').attr('value');

        const { data: result } = await axios.get(
          '/goldenkey/core/res/rev.make.mutong.php',
          {
            params: {
              payment: 'D',
              num,
              ck_code,
              layout_folder: 'layout/res',
            },
          }
        );

        const { data: message } = await axios.get(
          '/goldenkey/core/res/rev.make.exe.php',
          {
            params: {
              num,
              ck_code,
              layout_folder: 'layout/res',
            },
          }
        );

        console.log(result);
        console.log(message);
        console.log('예약번호: ', ck_code);
      } catch (error) {
        console.log(error);
      }
    };

    return { cancel, reservation };
  });

  useEffect(() => {
    setSelectedTime(null);
  }, [selectedTheme, selectedShop, selectedDate]);

  useEffect(() => {
    if (!selectedTheme || !selectedShop || !selectedDate) return;

    const getTimeslots = async () => {
      try {
        const { data } = await axios.get('/goldenkey/layout/res/home.php', {
          params: {
            rev_days: selectedDate,
            s_zizum: goldenkeyZizumNum[selectedShop],
            go: 'rev.make',
          },
        });

        const $ = cheerio.load(data);
        const theme = $(`.h3_theme:contains(${selectedTheme})`);
        const timeslots = theme
          .parent('.theme_Title')
          .siblings('.time_Area')
          .children('ul')
          .children('li');

        timeslots.each((_index, el) => {
          // text() 메서드를 사용하기 위해 Node 객체인 el을 $로 감싸서 cheerio 객체로 변환
          const href = $(el).children('a').attr('href');
          const time = $(el).children('a').children('.time').text().trim();

          console.log(href, time);
        });
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
          <Label>매장</Label>
          <Select
            value={selectedShop}
            style={{ width: 200 }}
            onChange={(selected: GoldenkeyZizumKey) => {
              setSelectedShop(selected);
              setSelectedTheme('');
            }}
          >
            {Object.keys(goldenkeyShops).map((shopKey) => (
              <Select.Option key={shopKey} value={shopKey}>
                {goldenkeyShops[shopKey as GoldenkeyZizumKey]}
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
              goldenkeyThemes[selectedShop]?.map((theme) => (
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
