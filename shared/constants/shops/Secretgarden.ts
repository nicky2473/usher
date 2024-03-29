import { SecretgardenZizumKey } from '../../types/secretgarden.types';

export const secretgardenThemeNum: { [key in SecretgardenZizumKey]: any } = {
  'secretgarden-midnight': {
    '비밀의 가족': 43,
    파리82: 44,
    '팩토리 엠': 45,
    '기다려, 금방 갈게': 47,
  },
  'secretgarden-downtown': {
    BOSS: 75,
    프로메사: 72,
  },
};

export const secretgardenShops: { [key in SecretgardenZizumKey]: string } = {
  'secretgarden-midnight': '미드나잇 합정',
  'secretgarden-downtown': '다운타운 홍대',
};
