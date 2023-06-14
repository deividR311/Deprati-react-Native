import * as Yup from 'yup';
const regexEmail = /^[A-Za-z0-9_\-\\.]+@[A-Za-z0-9_]+\.?\w{1,3}\.\w{2,3}$/gi;

const emailTestValidation = Yup.string()
  .required('Este campo es obligatorio')
  .matches(regexEmail, 'El correo electrónico no es válido');

const signInValidation = Yup.object().shape({
  email: emailTestValidation,
  password: Yup.string().required('Este campo es obligatorio')
});

export const reviewScoreValidation = Yup.object().shape({
  title: Yup.string().required('Este campo es obligatorio'),
  comment: Yup.string().required('Este campo es obligatorio'),
  score: Yup.string().required('El selector de calificación es obligatorio')
});

const signUpValidation = Yup.object().shape({
  name: Yup.string().required('El campo nombre es requerido').max(35),
  lastnames: Yup.string().required('El campo apellido es requerido').max(35),
  id: Yup.string().required('El campo tipo de identificación es requerido'),
  numID: Yup.string()
    .required('El campo numeró de identificación es requerido')
    .min(5, 'El numero de documento debe tener mas de 5 caracteres')
    .max(13, 'El numero de documento debe ser de maximo 10 caracteres'),

  email: emailTestValidation,
  password: Yup.string()
    .required('El campo contraseña es requerido')
    .min(6, 'La contraseña debe contener minimo 6 caracteres'),
  confirPassword: Yup.string()
    .required('El campo confirmar contraseña es requerido')
    .min(6, 'La contraseña debe contener minimo 6 caracteres')
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
  country: Yup.string().required('El campo país es requerido'),
  region: Yup.string().when('country', {
    is: 'EC',
    then: Yup.string().required('El campo provincia es requerido'),
    otherwise: Yup.string()
  }),
  city: Yup.string().when('country', {
    is: 'EC',
    then: Yup.string().required('El campo ciudad es requerido'),
    otherwise: Yup.string()
  }),
  gender: Yup.string().required('Selecciona tu género'),

  terms: Yup.bool().oneOf(
    [true],
    'Por favor acepta los términos y condiciones'
  ),
  polities: Yup.bool().isTrue(
    'Por favor acepta las políticas de tratamiento de datos'
  )
});

const recoveryPasswordValidation = Yup.object().shape({
  email: emailTestValidation
});

export const supportTicketValidation = Yup.object().shape({
  subject: Yup.string().required('Este campo es obligatorio'),
  message: Yup.string().required('Este campo es obligatorio'),
  csTicketCategoryCode: Yup.string().required('Este campo es obligatorio')
});

export { signInValidation, recoveryPasswordValidation, signUpValidation };
