import * as Yup from 'yup';
import { useEffect, useState } from 'react';

export const useFormHandler = <T,>({
  initialValues,
  validationSchema
}: FormHandlerProps<T>) => {
  type ValueType = keyof typeof initialValues;
  const fieldNames = Object.keys(initialValues as Object) as ValueType[];
  const [formValues, setFormValues] = useState(initialValues);
  const [dirty, setFormDirty] = useState(false);

  const [formErrors, setFormErrors] = useState<
    Partial<Record<ValueType, Boolean>>
  >(
    fieldNames.reduce(
      (acc, k) => ({
        ...acc,
        [k as ValueType]: false
      }),
      {} as Partial<Record<ValueType, Boolean>>
    )
  );

  const setField = async (
    fieldName: keyof typeof initialValues,
    value: any,
    validateFields?: ValueType[]
  ) => {
    setFormValues({ ...formValues, [fieldName]: value });

    if (value === '' && !dirty) {
      setFormErrors({ ...formErrors, [fieldName]: false });
      return;
    }

    !dirty && setFormDirty(true);

    try {
      if (validateFields?.length) {
        const validateObject = fieldNames
          .filter(f => validateFields?.includes(f))
          .reduce(
            (acc, field) => ({
              ...acc,
              [field]: formValues[field]
            }),
            {} as Partial<T>
          );
        await validationSchema.validate({
          ...validateObject,
          [fieldName]: value
        });
      } else {
        await validationSchema.fields[fieldName].validate(value);
      }
      formErrors[fieldName] &&
        setFormErrors({ ...formErrors, [fieldName]: false });
    } catch (error) {
      console.log('>>> Fiels error: ', error);
      setFormErrors({ ...formErrors, [fieldName]: true });
    }
  };

  const setFieldError = (
    fieldName: keyof typeof initialValues,
    value: string = ''
  ) => {
    setFormErrors({ ...formErrors, [fieldName]: true });
    setFormValues({ ...formValues, [fieldName]: value });
  };

  const setState = (values: Partial<T>) => {
    setFormValues({ ...formValues, ...values });
  };

  const clearFieldError = (fieldName: keyof typeof initialValues) => {
    setFormErrors({ ...formErrors, [fieldName]: false });
  };

  const clearField = (fieldName: keyof typeof initialValues) => {
    setFormValues({ ...formValues, [fieldName]: initialValues[fieldName] });
    setFormErrors({ ...formErrors, [fieldName]: false });
  };

  const resetForm = () => {
    setFormValues(initialValues);
    setFormDirty(false);
    setFormErrors(
      fieldNames.reduce(
        (acc, k) => ({
          ...acc,
          [k as ValueType]: false
        }),
        {} as Partial<Record<ValueType, Boolean>>
      )
    );
  };

  return {
    setField,
    setFieldError,
    setState,
    clearField,
    clearFieldError,
    resetForm,
    formValues,
    formErrors,
    dirty
  };
};

interface FormHandlerProps<T> {
  initialValues: T;
  validationSchema: Yup.ObjectSchema<any>;
  setState?: (arg: Partial<T>) => void;
  setFieldError?: (arg: keyof T, value?: string) => void;
}
