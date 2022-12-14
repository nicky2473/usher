import { GoldenkeyZizumKey } from '../../types/goldenkey.type';

export const goldenkeyZizumNum: { [key in GoldenkeyZizumKey]: number } = {
  'goldenkey-dongsung1': 1,
  'goldenkey-dongsung2': 11,
  'goldenkey-utopia': 7,
};

export const goldenkeyShops: { [key in GoldenkeyZizumKey]: string } = {
  'goldenkey-dongsung1': '대구동성로점',
  'goldenkey-dongsung2': '대구동성로2호점',
  'goldenkey-utopia': '건대점(유토피아호)',
};
