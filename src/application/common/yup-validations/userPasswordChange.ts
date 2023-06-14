import * as Yup from 'yup';

export const userPasswordChangeValidation = Yup.object().shape({
  oldPassword: Yup.string().required('El campo contraseña actual es requerido'),
  newPassword: Yup.string()
    .min(6, 'La contraseña debe contener minimo 6 caracteres')
    .required('El campo de nueva contraseña es requerido'),
  confirNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Las contraseñas no coinciden')
    .required('El campo confirmar contraseña es requerido')
});
