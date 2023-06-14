export interface AssociatedToTotalPriceWithTax {
  currencyIso: string;
  formattedValue: string;
  maxQuantity: number;
  minQuantity: number;
  priceType: string;
  value: number;
}

export interface Status {
  id: string;
}

export interface Attachment {
  filename: string;
  url: string;
}

export interface ModifiedFields {}

export interface TicketEvent {
  addedByAgent: boolean;
  attachments: Attachment[];
  author: string;
  displayText: string;
  modifiedFields: ModifiedFields;
  startDateTime: Date;
  text: string;
}

export interface BaseTicket {
  associatedTo: string;
  availableStatusTransitions: Status[];
  creationDate: string;
  csTicketCategoryName: string;
  id: string;
  lastModificationDate: string;
  status: Status;
  subject: string;
  ticketEvents: TicketEvent[];
}

export interface Ticket extends BaseTicket {
  associatedToTotalPriceWithTax: AssociatedToTotalPriceWithTax;
  associatedToTotalUnitCount: number;
  attachments: any[];
  cartId: string;
  customerId: string;
  message: string;
  messageHistory: string;
  ticketCategory: string;
}

export enum TicketState {
  NotApproved = 'NO_APROBADO',
  New = 'New',
  Pending = 'Open',
  Finished = 'Closed'
}

export interface DetailSupportTickets extends Ticket {}

export interface SupportTicket {
  tickets: BaseTicket[];
}

export interface CategorySupportTicket {
  code: string;
  name: string;
}

export interface CategorySupportTicketResponse {
  categories: CategorySupportTicket[];
}

export interface ReportSupportTicketBody {
  ticketRequest: {
    subject: string;
    message: string;
    status: string;
    associatedTo: string;
    csTicketCategoryCode: string;
  };
  image?: FormDataImage;
}

export interface FormDataImage {
  uri?: string;
  fileName?: string;
  type?: string;
}
