export interface Section {
  item_id: string;
  __path: Array<{
    item_id: string;
    url: string;
    title: string;
  }>;
  type_id: string;
  title: string;
  short_title: string | null;
  modify_ts: string;
  create_ts: string | null;
  imgs: string[];
  imgs_detail: string[];
  faq: Record<string, unknown> | unknown[];
  enable: string;
  url: string;
  manual_url: string;
  p_sect_id: string;
  c: string;
  sections?: Section[];
}

export interface SectionsResponse {
  sections: Section[];
  current: Section | null;
}
