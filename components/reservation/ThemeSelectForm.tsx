import React, { useEffect, useState } from "react";
import { Select, DatePicker, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import axios from "axios";
import * as cheerio from "cheerio";
import produce from "immer";
import qs from "qs";

import { RegionKey } from "../../shared/types/reservation.type";
import { regions } from "../../shared/constants/Regions";
import { shops } from "../../shared/constants/Shops";
import { themes } from "../../shared/constants/Themes";
import {
  keyescapeThemeNum,
  keyescapeZizumNum,
} from "../../shared/constants/shops/Keyescape";
import { KeyescapeZizumKey } from "../../shared/types/shops/keyescape.type";
import { toast } from "react-toastify";

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

const Reservation = styled(Button)`
  position: absolute;
  right: 30px;
  bottom: 100px;
  width: 100px;
  height: 100px;
`;

const ThemeSelectForm = () => {
  const [timeslots, setTimeslots] = useState<[string, string][]>([]);
  const [selectedRegion, setSelectedRegion] = useState<RegionKey>("gangnam");
  const [selectedShop, setSelectedShop] = useState<KeyescapeZizumKey | null>();
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<number>();

  const reservation = async () => {
    if (!selectedTheme || !selectedShop || !selectedDate) {
      toast.error("모든 폼 양식을 채워주세요.");

      return;
    }

    try {
      const { data: revMake } = await axios.post(
        `/api/web/home.php`,
        qs.stringify({
          zizum_num: keyescapeZizumNum[selectedShop],
          rev_days: selectedDate,
          theme_num: keyescapeThemeNum[selectedShop]?.[selectedTheme],
          theme_time_num: selectedTime,
          go: "rev.make2",
        })
      );

      const $revMake = cheerio.load(revMake);
      const spamCode = $revMake(".spam_code");
      const hiddenInputs = $revMake("input[type=hidden]");

      let prices = {} as any;

      hiddenInputs.each((index, el) => {
        if (index <= 2 || $revMake(el).attr("value") === "make") return;

        prices[`price${index - 2}`] = $revMake(el).attr("value");
        if (index === 4) prices["price"] = $revMake(el).attr("value");
      });

      const { data: revMake2 } = await axios.post(
        "/api/web/rev.act.php",
        qs.stringify({
          name: "조준호",
          mobile1: "010",
          mobile2: "6741",
          mobile3: "2473",
          person: 2,
          memo: "",
          str_spam: spamCode.text().trim(),
          ck_agree: "on",
          rev_days: selectedDate,
          theme_time_num: selectedTime,
          ...prices,
          act: "make",
        })
      );

      const $revMake2 = cheerio.load(revMake2);
      const content = $revMake2("meta[http-equiv=Refresh]").attr("content");
      const num = content?.slice(content.lastIndexOf("=") + 1);

      const { data: revKcp } = await axios.post(
        "/api/web/home.php",
        qs.stringify({
          go: "rev.kcp_pc",
          num,
        })
      );

      const $revKcp = cheerio.load(revKcp);
      const ckCode = $revKcp("input[name=ck_code]").attr("value");

      const { data: result } = await axios.get("/api/web/rev.make_mutong.php", {
        params: {
          go: "rev.kcp_pc",
          num,
          payment: "D",
          ck_code: ckCode,
        },
      });

      console.log(result);
      console.log("예약번호: ", ckCode);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!selectedTheme || !selectedShop || !selectedDate) return;

    setTimeslots([]);

    const getTimeslots = async () => {
      try {
        const { data } = await axios.get("/api/web/rev.theme_time.php", {
          params: {
            zizum_num: keyescapeZizumNum[selectedShop],
            rev_days: selectedDate,
            theme_num: keyescapeThemeNum[selectedShop]?.[selectedTheme],
          },
        });

        const $ = cheerio.load(data);
        const timeslots = $("li");

        timeslots.each((_index, el) => {
          // text() 메서드를 사용하기 위해 Node 객체인 el을 $로 감싸서 cheerio 객체로 변환
          const href = $(el).parent("a").attr("href");

          if (href) {
            setTimeslots(
              produce((draft) => {
                draft.push([$(el).text(), href.split("'")[1]]);
              })
            );
          }
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
        <Label>지역</Label>
        <Select
          value={selectedRegion}
          style={{ width: 200 }}
          onChange={(selected: RegionKey) => {
            setSelectedRegion(selected);
            setSelectedShop(null);
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
          onChange={(selected: KeyescapeZizumKey) => {
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
          {selectedShop &&
            themes[selectedShop]?.map((theme) => (
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
      <Contents>
        <Label>시간</Label>
        <Select
          style={{ width: 200 }}
          onChange={(selected: string) => {
            setSelectedTime(Number(selected.split(",")[1]));
          }}
        >
          {timeslots?.map(([timeslot, timeNum]) => (
            <Select.Option key={timeslot} value={`${timeslot},${timeNum}`}>
              {timeslot}
            </Select.Option>
          ))}
        </Select>
      </Contents>
      <Reservation
        type="primary"
        icon={<SendOutlined style={{ fontSize: "30px" }} />}
        shape="circle"
        onClick={() => {
          reservation();
        }}
      />
    </Container>
  );
};

export default ThemeSelectForm;
