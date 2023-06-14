export interface MessagesAppInterface {
  [service: string]: {
    code: string;
    area: string;
    service: string;
    title: string;
    description: string;
    type: string;
  };
}
