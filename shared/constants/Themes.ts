import {
  goldenkeyDongsung1Theme,
  goldenkeyDongsung2Theme,
  goldenkeyUtopiaTheme,
  GoldenkeyZizumKey,
} from '../types/goldenkey.type';
import {
  keyescapeGnTheme,
  keyescapeHongdaeTheme,
  keyescapeMemoryTheme,
  keyescapeTheormTheme,
  keyescapeUzulikeTheme,
  KeyescapeZizumKey,
} from '../types/keyescape.type';
import {
  secretgardenDowntownTheme,
  secretgardenMidnightTheme,
  SecretgardenZizumKey,
} from '../types/secretgarden.types';

export const keyescapeThemes: { [key in KeyescapeZizumKey]: string[] } = {
  'keyescape-gn': [...keyescapeGnTheme],
  'keyescape-uzulike': [...keyescapeUzulikeTheme],
  'keyescape-theorm': [...keyescapeTheormTheme],
  'keyescape-memory': [...keyescapeMemoryTheme],
  'keyescape-hongdae': [...keyescapeHongdaeTheme],
};

export const secretgardenThemes: { [key in SecretgardenZizumKey]: string[] } = {
  'secretgarden-midnight': [...secretgardenMidnightTheme],
  'secretgarden-downtown': [...secretgardenDowntownTheme],
};

export const goldenkeyThemes: { [key in GoldenkeyZizumKey]: string[] } = {
  'goldenkey-dongsung1': [...goldenkeyDongsung1Theme],
  'goldenkey-dongsung2': [...goldenkeyDongsung2Theme],
  'goldenkey-utopia': [...goldenkeyUtopiaTheme],
};
