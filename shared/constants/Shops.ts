import { RegionKey, Shop } from "../types/reservation.type";

export const shops: { [key in RegionKey]: Shop[] } = {
  gangnam: [
    {
      key: "keyescape-gn",
      value: "키이스케이프 강남",
    },
    {
      key: "keyescape-uzulike",
      value: "키이스케이프 우주라이크",
    },
    {
      key: "keyescape-theorm",
      value: "키이스케이프 더오름",
    },
    {
      key: "keyescape-memory",
      value: "키이스케이프 메모리컴퍼니",
    },
  ],
  gundae: [],
  hongdae: [],
  suwon: [],
};
