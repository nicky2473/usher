import React, { useEffect, useState } from "react";
import { Select, DatePicker } from "antd";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import axios from "axios";
import * as cheerio from "cheerio";

import { RegionKey } from "../../shared/types/reservation.type";
import { regions } from "../../shared/constants/Regions";
import { shops } from "../../shared/constants/Shops";
import { themes } from "../../shared/constants/Themes";

const Container = styled.div`
  display: flex;
  gap: 20px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.div`
  font-size: 17px;
  font-weight: bold;
`;

const ThemeSelectForm = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionKey>("gangnam");
  const [selectedShop, setSelectedShop] = useState<string>("");
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");

  /* useEffect(() => {
    const go = async () => {
      try {
        const { data } = await axios.get("/api/web/rev.theme_time.php", {
          params: {
            zizum_num: 3,
            rev_days: "2022-09-30",
            theme_num: 6,
          },
        });

        const $ = cheerio.load(data);
        const elements = $(".rev4");

        elements.each((idx, el) => {
          // ❺ text() 메서드를 사용하기 위해 Node 객체인 el을 $로 감싸서 cheerio 객체로 변환
          console.log($(el).text());
        });
      } catch (error) {
        console.log(error);
      }
    };

    go();
  }, []); */

  return (
    <Container>
      <Contents>
        <Label>지역</Label>
        <Select
          value={selectedRegion}
          style={{ width: 200 }}
          onChange={(selected: RegionKey) => {
            setSelectedRegion(selected);
            setSelectedShop("");
            setSelectedTheme("");
          }}
        >
          {regions.map((region) => (
            <Select.Option key={region.key} value={region.key}>
              {region.value}
            </Select.Option>
          ))}
        </Select>
      </Contents>
      <Contents>
        <Label>매장</Label>
        <Select
          value={selectedShop}
          style={{ width: 200 }}
          onChange={(selected: string) => {
            setSelectedShop(selected);
            setSelectedTheme("");
          }}
        >
          {shops[selectedRegion].map((shop) => (
            <Select.Option key={shop.key} value={shop.key}>
              {shop.value}
            </Select.Option>
          ))}
        </Select>
      </Contents>
      <Contents>
        <Label>테마</Label>
        <Select
          value={selectedTheme}
          style={{ width: 200 }}
          onChange={(selected: string) => {
            setSelectedTheme(selected);
          }}
        >
          {themes[selectedShop]?.map((theme) => (
            <Select.Option key={theme} value={theme}>
              {theme}
            </Select.Option>
          ))}
        </Select>
      </Contents>
      <Contents>
        <Label>날짜</Label>
        <DatePicker
          style={{ width: 200 }}
          onChange={(_date, dateString) => {
            setSelectedDate(dateString);
          }}
          disabledDate={(current) =>
            current && current < dayjs().startOf("day")
          }
        />
      </Contents>
    </Container>
  );
};

export default ThemeSelectForm;
