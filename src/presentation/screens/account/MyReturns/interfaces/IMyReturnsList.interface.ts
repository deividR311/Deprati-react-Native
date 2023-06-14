export interface IMyReturnsListResponse {
  WarrantySimpleBannerComponent: MyReturnsListWarrantyComponent;
  titleMyReturnsParagraph: MyReturnsListComponent;
  MyReturnsListComponent: MyReturnsListComponent;
  RequestNewReturnComponent: MyReturnsListComponent;
}
export interface MyReturnsListWarrantyComponent {
  uid: string;
  typeCode: string;
  modifiedTime: Date;
  name: string;
  container: string;
  flexType?: string;
  childrenComponentsList: null;
  childrenComponents: ChildrenComponents;
  external?: string;
  media: Media;
  title?: string;
}

export interface MyReturnsListComponent {
  uid: string;
  typeCode: string;
  modifiedTime: Date;
  name: string;
  container: string;
  flexType?: string;
  childrenComponentsList: null;
  childrenComponents: ChildrenComponents;
  external?: string;
  media?: Media;
  title?: string;
}

export interface ChildrenComponents {}

export interface Media {
  code: string;
  mime: string;
  url: string;
  downloadUrl: string;
}
