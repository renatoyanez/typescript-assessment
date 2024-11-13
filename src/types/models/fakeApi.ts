export interface IFakeApiData {
  company: string;
  country: string;
  state: string;
  city: string;
  zipcode: string | number // Evaluate as a real zip code;
  employees: number;
  revenue: number;
  website: string;
  sales_rep: string;
  last_contacted: string // date;
  purchased: boolean;
  notes: string;
}

export type TFakeApiDataList = IFakeApiData[]
