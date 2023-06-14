import * as Yup from 'yup';
import { phoneYup } from '../../../../application/utils/regExp';

export const deliveryThirdPartyValidation = Yup.object().shape({
  agency: Yup.mixed().required('El campo Agencia es requerido'),
  agencyName: Yup.mixed().required('El campo Agencia es requerido'),
  city: Yup.mixed().required('El campo Ciudad es requerido'),
  pointOfService: Yup.mixed().required('El campo Sucursal es requerido'),
  province: Yup.mixed().required('El campo Provincia es requerido'),
  retireName: Yup.mixed().required('El campo Nombre es requerido'),
  retirePhone: Yup.mixed().required('El campo Celular es requerido'),
  retireId: Yup.mixed().required('El campo Identificaci{on es requerido')
});
