export interface iWelcome {
  component: iComponentWelcome[];
  pagination: iPaginationWelcome;
  sorts: any[];
}

export interface iComponentWelcome {
  uid: string;
  typeCode: string;
  modifiedTime: string;
  name: string;
  container: string;
  external: string;
  media: iMedia;
  headline: string;
  content: string;
  urlLink: string;
}

export interface iMedia {
  code: string;
  mime: string;
  url: string;
  downloadUrl: string;
}

export interface iPaginationWelcome {
  count: number;
  page: number;
  totalCount: number;
  totalPages: number;
}
