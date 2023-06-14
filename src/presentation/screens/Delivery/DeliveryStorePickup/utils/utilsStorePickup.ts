import * as Yup from 'yup';

const storePickupValidation = Yup.object().shape({
  city: Yup.string().required('El campo ciudad es requerido'),
  store: Yup.string().required('El campo tienda es requerido'),
  fullName: Yup.string().notRequired(),
  numID: Yup.string().when(['fullName'], {
    is: (fullName?: string) => !!fullName,
    then: Yup.string().required('El campo nombre es requerido')
  }),
  otherwise: Yup.string().notRequired()
});

const MapAbrvDay = new Map([
  ['lunes', 'Lun'],
  ['martes', 'Mar'],
  ['miércoles', 'Miér'],
  ['jueves', 'Jue'],
  ['viernes', 'Vier'],
  ['sábado', 'Sáb'],
  ['domingo', 'Dom']
]);

export { storePickupValidation, MapAbrvDay };
