export type SecretgardenZizumKey = 'secretgarden-midnight';

export interface SecretgardenThemeTimeParams {
  zizum_num: number;
  rev_days: string;
  theme_num: number;
}

export const secretgardenMidnightTheme = [
  '비밀의 가족',
  '파리82',
  '팩토리 엠',
  '기다려, 금방 갈게',
] as const;
export type KeyescapeGnThemeKey = typeof secretgardenMidnightTheme[number];
