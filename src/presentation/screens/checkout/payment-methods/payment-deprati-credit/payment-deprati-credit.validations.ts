import * as Yup from 'yup';
import { numberAccountAditional } from '../../../../../application/utils/regExp';

export const creditDePratiValidation = Yup.object().shape({
  numberAccount: Yup.string().required(),
  aditional: Yup.string().required().matches(new RegExp(numberAccountAditional))
});
