export interface IFilter {
  name: string;
  key: string;
  values: IFilterValue[];
}

export interface IFilterValue {
  value: string;
  count: number;
}
