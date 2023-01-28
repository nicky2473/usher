export type SecretgardenZizumKey =
  | 'secretgarden-midnight'
  | 'secretgarden-downtown';

export const secretgardenMidnightTheme = [
  '비밀의 가족',
  '파리82',
  '팩토리 엠',
  '기다려, 금방 갈게',
] as const;
export type SecretgardenMidnightThemeKey =
  typeof secretgardenMidnightTheme[number];

export const secretgardenDowntownTheme = ['BOSS', '프로메사'] as const;
export type SecretgardenDowntownThemeKey =
  typeof secretgardenDowntownTheme[number];
