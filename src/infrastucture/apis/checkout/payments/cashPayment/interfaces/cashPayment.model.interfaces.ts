export interface GetBankingModel {
  component: IComponent[];
  pagination: IPagination;
  sorts: ISort[];
}

export interface IComponent {
  uid: string;
  typeCode: string;
  modifiedTime: string;
  name: string;
  container: string;
  content: string;
}

export interface IPagination {
  count: number;
  page: number;
  totalCount: number;
  totalPages: number;
}

export interface ISort {
  code: string;
  name: string;
  selected: boolean;
}

export interface IHtml {
  html: string;
}
