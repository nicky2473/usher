import {
  keyescapeGnTheme,
  keyescapeMemoryTheme,
  keyescapeTheormTheme,
  keyescapeUzulikeTheme,
} from "../types/shops/keyescape.type";

export const themes: { [key: string]: string[] } = {
  "keyescape-gn": [...keyescapeGnTheme],
  "keyescape-uzulike": [...keyescapeUzulikeTheme],
  "keyescape-theorm": [...keyescapeTheormTheme],
  "keyescape-memory": [...keyescapeMemoryTheme],
};
