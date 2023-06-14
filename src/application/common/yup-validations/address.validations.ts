import * as Yup from 'yup';
import { phoneYup, prefffixPhoneNumber } from '../../utils/regExp';

export interface AddressFormFields {
  names?: string;
  numberHouse?: string;
  address?: string;
  province?: string;
  city?: string;
  prefffixCellNumber?: string | number;
  prefffixPhoneNumber?: string | number;
  cellPhone?: string | number;
  phone?: string | number;
  infoAdress?: string;
  country?: string;
}

export const addressDeliveryValidations = Yup.object<AddressFormFields>().shape(
  {
    names: Yup.string().required().max(50),
    address: Yup.string().required().max(140),
    numberHouse: Yup.string().required().max(10),
    country: Yup.string().required().max(255).optional(),
    city: Yup.string().required().max(90),
    province: Yup.mixed().required(),
    prefffixCellNumber: Yup.string().required().matches(new RegExp(phoneYup)),
    prefffixPhoneNumber: Yup.string()
      .optional()
      .matches(new RegExp(prefffixPhoneNumber)),
    cellPhone: Yup.string().required().min(8).max(8),
    phone: Yup.string().optional().notRequired().nullable().max(8),
    infoAdress: Yup.string().required().max(140)
  }
);
