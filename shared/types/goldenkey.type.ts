export type GoldenkeyZizumKey =
  | 'goldenkey-dongsung1'
  | 'goldenkey-dongsung2'
  | 'goldenkey-utopia';

export const goldenkeyDongsung1Theme = [
  '가이아 기적의땅',
  'X됐다',
  'JAIL.O',
  '타임스틸러',
] as const;
export type GoldenkeyDongsung1ThemeKey = typeof goldenkeyDongsung1Theme[number];

export const goldenkeyDongsung2Theme = [
  '지옥',
  '다시, 너에게',
  'HEAVEN',
  '냥탐정 셜록캣',
] as const;
export type GoldenkeyDongsung2ThemeKey = typeof goldenkeyDongsung2Theme[number];

export const goldenkeyUtopiaTheme = ['fl[ae]sh', 'NOW HERE'] as const;
export type GoldenkeyUtopiaThemeKey = typeof goldenkeyUtopiaTheme[number];
