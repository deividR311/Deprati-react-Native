export type PageType = 'CategoryPage' | 'ProductPage' | 'ContentPage';
export interface ContentPageRequest {
  pageType: PageType;
  pageLabelOrId?: string;
  fields?: string;
  code?: string;
}
export interface ContentPageResponse {
  defaultPage: boolean;
  name: string;
  template: string;
  title: string;
  typeCode: string;
  uid: string;
  contentSlots: contentSlotsDto;
  [key: string]: any;
}

export interface contentSlotsDto {
  contentSlot: sectionSlotDto[];
}

export interface sectionSlotDto {
  components: {
    component: ComponentDto[];
  };
  name: string;
  position: string;
  slotId: string;
  slotShared: boolean;
}

export interface ComponentDto {
  uid: string;
  typeCode: string;
  modifiedTime: string;
  name: string;
  container: boolean;
  [key: string]: any;
}

export interface ComponentDtoRequest {
  componentIds: string | string[];
  fields?: string;
  pageSize?: number;
}
export interface ComponentDtoResponse {
  component: ComponentDto[];
  pagination: {
    count: number;
    page: number;
    totalCount: number;
    totalPages: number;
  };
  sorts: any[];
}
