export type FilterResponse = {
  props: FilterType[];
  summary: {
    total: string;
    found: string;
  };
};

type FilterType = {
  type_id: string;
  type_name: string;
  groups: FilterGroupType;
};

type FilterGroupType = {
  __nogroup: FilterGroupItemType;
  chars: FilterGroupItemType;
  sections_objects: FilterGroupItemType;
};

type FilterGroupItemType = {
  group_id: string;
  tpl_key: string;
  variant: string | number;
  props: FilterPropsType;
};

type FilterPropsType = {
  [key: string]: FilterPropType;
};

export type FilterPropType = {
  prop_id: string;
  title: string;
  type: 'PRICE' | 'ENUM' | 'STRING';
  tpl_key: string;
  unit: string;
  filter_enabled: string;
  valuefield: string;
  variants: string[] | null;
  value: string | null;
  filter: FilterValuesType | PriceFilterType;
  show?: boolean;
};

type FilterValuesType = {
  [key: string]: FilterValueType;
};

type FilterValueType = {
  label: string;
  total_count: string;
  enabled: string | null;
  current_count: string;
};

// Для ценового фильтра
type PriceFilterType = {
  min: string;
  max: string;
  lt: string | null;
  gt: string | null;
  actual_min: string;
  actual_max: string;
};
