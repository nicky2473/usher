export type SecretgardenZizumKey = 'secretgarden-midnight';

export const secretgardenMidnightTheme = [
  '비밀의 가족',
  '파리82',
  '팩토리 엠',
  '기다려, 금방 갈게',
] as const;
export type KeyescapeGnThemeKey = typeof secretgardenMidnightTheme[number];
