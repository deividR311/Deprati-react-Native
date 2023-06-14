interface IMedia {
  code?: string;
  mime?: string;
  url?: string;
  downloadUrl?: string;
}
export interface IChildrenComponent {
  media?: IMedia;
  videoId?: string;
  uid?: string;
  typeCode?: string;
  modifiedTime?: string;
  name?: string;
  container?: boolean;
  external?: boolean;
  urlLink?: string;
}
