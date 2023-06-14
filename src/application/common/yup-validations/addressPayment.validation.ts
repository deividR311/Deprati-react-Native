import * as Yup from 'yup';
import { phonePreffix } from '../../utils/regExp';

export const addressPaymentValidation = Yup.object().shape({
  firstName: Yup.string().required().max(30),
  idNumber: Yup.string()
    .required('El campo numeró de identificación es requerido')
    .min(8, 'El numero de documento debe tener mas de 5 caracteres')
    .max(14, 'El numero de documento debe ser de maximo 10 caracteres'),
  idType: Yup.string().required(),
  line1: Yup.string().required().max(34),
  line2: Yup.string().required().max(10),

  phonePreffix: Yup.string().required().matches(new RegExp(phonePreffix)),
  phone: Yup.string().required().min(7).max(8)
});
