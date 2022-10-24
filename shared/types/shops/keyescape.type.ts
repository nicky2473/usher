export type KeyescapeZizumKey =
  | "keyescape-gn"
  | "keyescape-uzulike"
  | "keyescape-theorm"
  | "keyescape-memory";

export interface KeyescapeThemeTimeParams {
  zizum_num: number;
  rev_days: string;
  theme_num: number;
}

export const keyescapeGnTheme = [
  "월야애담",
  "살랑살랑 연구소",
  "그카지말라캤자나",
] as const;
export type KeyescapeGnThemeKey = typeof keyescapeGnTheme[number];

export const keyescapeUzulikeTheme = ["US", "WANNA GO HOME"] as const;
export type KeyescapeUzulikeThemeKey = typeof keyescapeUzulikeTheme[number];

export const keyescapeTheormTheme = ["네드", "엔제리오"] as const;
export type KeyescapeTheormThemeKey = typeof keyescapeTheormTheme[number];

export const keyescapeMemoryTheme = ["FILM BY EDDY"] as const;
export type KeyescapeMemoryThemeKey = typeof keyescapeMemoryTheme[number];
