import {
  KeyescapeGnThemeKey,
  KeyescapeTheormThemeKey,
  KeyescapeUzulikeThemeKey,
  KeyescapeZizumKey,
} from "../../types/shops/keyescape.type";

export const keyescapeZizumNum: { [key in KeyescapeZizumKey]: number } = {
  "keyescape-gn": 3,
  "keyescape-uzulike": 14,
  "keyescape-theorm": 16,
};

export const keyescapeGnThemeNum: { [key in KeyescapeGnThemeKey]: number } = {
  월야애담: 5,
  "살랑살랑 연구소": 6,
  그카지말라캤자나: 7,
};

export const keyescapeUzulikeThemeNum: {
  [key in KeyescapeUzulikeThemeKey]: number;
} = {
  US: 55,
  "WANNA GO HOME": 56,
};

export const keyescapeTheormThemeNum: {
  [key in KeyescapeTheormThemeKey]: number;
} = {
  네드: 48,
  엔제리오: 51,
};
