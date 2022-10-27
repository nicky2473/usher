import { KeyescapeZizumKey } from '../../types/keyescape.type';

export const keyescapeZizumNum: { [key in KeyescapeZizumKey]: number } = {
  'keyescape-gn': 3,
  'keyescape-uzulike': 14,
  'keyescape-theorm': 16,
  'keyescape-memory': 18,
  'keyescape-hongdae': 10,
};

export const keyescapeThemeNum: { [key in KeyescapeZizumKey]: any } = {
  'keyescape-gn': {
    월야애담: 5,
    '살랑살랑 연구소': 6,
    그카지말라캤자나: 7,
  },
  'keyescape-uzulike': {
    US: 55,
    'WANNA GO HOME': 56,
  },
  'keyescape-theorm': {
    네드: 48,
    엔제리오: 51,
  },
  'keyescape-memory': {
    'FILM BY EDDY': 57,
  },
  'keyescape-hongdae': {
    '삐릿-뽀': 41,
    홀리데이: 45,
    고백: 43,
  },
};

export const keyescapeShops: { [key in KeyescapeZizumKey]: string } = {
  'keyescape-gn': '키이스케이프 강남',
  'keyescape-uzulike': '키이스케이프 우주라이크',
  'keyescape-theorm': '키이스케이프 더오름',
  'keyescape-memory': '키이스케이프 메모리컴퍼니',
  'keyescape-hongdae': '키이스케이프 홍대',
};
