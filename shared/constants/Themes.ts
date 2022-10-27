import {
  keyescapeGnTheme,
  keyescapeHongdaeTheme,
  keyescapeMemoryTheme,
  keyescapeTheormTheme,
  keyescapeUzulikeTheme,
  KeyescapeZizumKey,
} from '../types/keyescape.type';

export const themes: { [key in KeyescapeZizumKey]: string[] } = {
  'keyescape-gn': [...keyescapeGnTheme],
  'keyescape-uzulike': [...keyescapeUzulikeTheme],
  'keyescape-theorm': [...keyescapeTheormTheme],
  'keyescape-memory': [...keyescapeMemoryTheme],
  'keyescape-hongdae': [...keyescapeHongdaeTheme],
};
