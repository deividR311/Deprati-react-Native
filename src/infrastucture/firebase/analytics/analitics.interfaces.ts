export interface LogArgs {
  tag: string;
  attributes?: Record<string, unknown> | string;
  error?: Error;
}

/** @todo Put here! all event that you need tracking */
export enum AnalyticEvent {
  start_app = 'start_app',
  signup = 'sign_up',
  login = 'login',
  share = 'share',
  logout = 'logout',
  requests = 'request'
}

export interface RawAnalyticsLoggerArgs<T = Record<string, unknown> | string> {
  event: AnalyticEvent;
  deviceId: string;
  customerId?: string;
  username?: string;
  attributes?: T;
}
