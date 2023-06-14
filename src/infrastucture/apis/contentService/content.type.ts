export interface BasicContentResponse {
  success: boolean;
  message: string | null;
  errors: string[] | null;
}

export interface ContentRequest {
  content: string;
}

export interface ContentExpirationDateResponse extends BasicContentResponse {
  data: DataContentExpirationDate;
}

export interface DataContentExpirationDate {
  expirationDateContent: ExpirationDateContent;
}
export interface ExpirationDateContent {
  legend: string;
  popup_title: string;
  popup_paragraphs: string[];
  popup_accept_action: string;
  popup_cancel_action: string;
}
