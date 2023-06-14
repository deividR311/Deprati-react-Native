import { BasicContentResponse } from './content.type';

export interface CustomerServiceResponse extends BasicContentResponse {
  data: DataCustomerService;
}

export interface DataCustomerService {
  customerService: CustomerService;
  creditServices?: CreditService;
}

export interface CreditService {
  content: {
    id: string;
    presentationOrder: number;
    link?: string;
    title: string;
    description?: string;
    image1: string;
    showFlag?: boolean;
  }[];
}
export interface CustomerService {
  title: string;
  legend: string;
  phones: Phone[];
  items: Item[];
  whatsappMessage: string;
  whatsappPhoneNumber: string;
}

export interface Item {
  id: string;
  presentationOrder: number;
  link: null | string;
  title: string;
  description: null;
  image1: string;
  showFlag?: boolean;
}

export interface Phone {
  cityName: string;
  position: number;
  number: string;
  imageUrl: string;
}
