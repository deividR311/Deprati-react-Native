export interface IMyReturnableOrdersResponse {
  defaultPage: boolean;
  name: string;
  template: string;
  typeCode: string;
  uid: string;
  timestamp: number;
  components: IComponentsSolicit;
  slots: Slots;
}

export interface IComponentsSolicit {
  BottomMyReturnableOrdersParagraphComponent: BottomMyReturnableOrdersParagraphComponent;
  MyReturnableOrdersListComponent: BottomMyReturnableOrdersParagraphComponent;
  Footer1MyReturnableOrdersParagraphComponent: BottomMyReturnableOrdersParagraphComponent;
  SearchReturnableOrderComponent: BottomMyReturnableOrdersParagraphComponent;
  Footer2MyReturnableOrdersParagraphComponent: BottomMyReturnableOrdersParagraphComponent;
  WarrantySimpleBannerComponent: BottomMyReturnableOrdersParagraphComponent;
  titleMyReturnableOrdersParagraph: BottomMyReturnableOrdersParagraphComponent;
}

export interface BottomMyReturnableOrdersParagraphComponent {
  uid: string;
  typeCode: string;
  modifiedTime: Date;
  name: string;
  container: string;
  content: string;
  childrenComponentsList: null;
  childrenComponents: ChildrenComponents;
  flexType?: string;
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

export interface Slots {
  Section1: string[];
  Section2: string[];
  TopHeaderSlot: string[];
}
