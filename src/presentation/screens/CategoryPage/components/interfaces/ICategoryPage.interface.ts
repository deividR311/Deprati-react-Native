export interface IContentCategory {
  uid: string;
  typeCode: string;
  modifiedTime: Date;
  name: string;
  container: string;
  media: Media;
  title: string;
  category?: string;
  url?: string;
  urlLink?: string;
  childrenComponentsList: null;
  childrenComponents: ChildrenComponents;
  style?: {};
}

export interface ChildrenComponents {}

export interface Media {
  code: string;
  mime: string;
  altText: string;
  description: string;
  url: string;
  downloadUrl: string;
}
