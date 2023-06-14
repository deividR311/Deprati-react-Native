import { FormikErrors } from 'formik';
import { FormStorePickup } from '../../components/StorePickupComponent';

export interface IPersonal {
  errors: FormikErrors<IvaluesInfoPersonal>;
  values: IvaluesInfoPersonal;
  onError?: (
    errors: Partial<Record<keyof IvaluesInfoPersonal, boolean>>
  ) => void;
  onChangeText(
    name: keyof FormStorePickup,
    value: string,
    dependecies?: (keyof IvaluesInfoPersonal)[]
  ): void;
}

export interface IvaluesInfoPersonal {
  city: string;
  store: string;
  fullName: string;
  numID: string;
}
