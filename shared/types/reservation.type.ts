export type RegionKey = "gangnam" | "gundae" | "hongdae" | "suwon";

export interface Region {
  key: RegionKey;
  value: string;
}

export interface Shop {
  key: string;
  value: string;
}
