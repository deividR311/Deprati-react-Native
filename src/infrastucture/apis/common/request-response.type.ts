export interface ResponseBase {
  success: boolean;
  message?: string;
  errors?: string[] | null;
}

export interface RequestBodyBase {
  channel?: string;
  email?: string;
  ip?: string;
}
