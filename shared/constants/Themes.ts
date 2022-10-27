import {
  keyescapeGnTheme,
  keyescapeHongdaeTheme,
  keyescapeMemoryTheme,
  keyescapeTheormTheme,
  keyescapeUzulikeTheme,
  KeyescapeZizumKey,
} from '../types/keyescape.type';
import {
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
};
