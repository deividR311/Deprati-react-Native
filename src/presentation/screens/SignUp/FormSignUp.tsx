import { useFormik } from 'formik';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import {
  LayoutRectangle,
  SafeAreaView,
  ScrollView,
  Text,
  View
} from 'react-native';
import { useDispatch } from 'react-redux';
import { COLORS } from '../../../application/common/colors';
import { FONTS_SIZES } from '../../../application/common/fonts';
import useCountriesAndOthers from '../../../application/common/hooksCommons/useCountries';
import useOpenLinkInApp from '../../../application/common/hooksCommons/useOpenLinkInApp';
import { signUpValidation } from '../../../application/common/yup-validations/auth.validations';
import {
  enabledButton,
  setValuesSignUp
} from '../../../application/state-manager/services/signUp';
import { changeKeyboardNumDoc } from '../../../application/utils/changeKeyboardNumDoc';
import { IDTYPES } from '../../../application/utils/constants';
import { getUrlTerms, privacidadWeb } from '../../../application/utils/urls';
import CheckboxComp from '../../common-components/checkboxs';
import InputBase from '../../common-components/inputs/InputBase';
import PasswordInput from '../../common-components/inputs/PasswordInput';
import SelectInput from '../../common-components/inputs/SelectInput';
import RadioButtonComp from '../../common-components/radiosButton';
import ErrorText from '../../common-components/texts/ErrorText';
import { validateLengthDoc } from '../SignIn/validateLengthDoc';
import TextAndLink from './components/TextAndLink';
import { stylesSignUp } from './stylesSignUp';
import { FormLegend } from '../../common-components/legend/FormLegend';
import { useTranslation } from 'react-i18next';

const FormSignUp = forwardRef<FormSignUpRef, FormSignUpProps>((props, ref) => {
  const { t } = useTranslation();
  const scrollRef = useRef<any>();
  const openUrl = useOpenLinkInApp();
  const { regions, cities, countries, getCountries, getRegions, getCities } =
    useCountriesAndOthers();
  const dispatch = useDispatch();
  const [checkComunicaciones, setcheckComunicaciones] = useState(false);
  const [globalError, setGlobalError] = useState(false);
  const [coordFields, setCoordFields] = useState({});

  const {
    values,
    errors,
    setFieldValue,
    touched,
    handleBlur,
    handleChange,
    isValid
  } = useFormik({
    initialValues: {
      name: '',
      lastnames: '',
      id: '',
      numID: '',
      email: '',
      password: '',
      confirPassword: '',
      country: '',
      region: '',
      city: '',
      gender: '',
      terms: false,
      polities: false
    },
    initialErrors: {},
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: false,
    validationSchema: signUpValidation,
    onSubmit: () => undefined
  });
  useLayoutEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && values.terms) {
      dispatch(enabledButton(true));
      dispatch(setValuesSignUp({ ...values, newsLetter: checkComunicaciones }));
      return;
    }
    dispatch(setValuesSignUp({ ...values, newsLetter: checkComunicaciones }));
    dispatch(enabledButton(false));
  }, [errors, values]);

  useEffect(() => {
    if (!isValid) props?.setIsError?.(true);

    if (props.isPressNext && !isValid) {
      scrollHandler();
      setGlobalError(true);
    } else if (props.isPressNext && isValid) props?.setIsError?.(false);
  }, [props.isPressNext, isValid]);

  const onChange = (name: string, value: string | boolean) => {
    setFieldValue(name, value);
    dispatch(setValuesSignUp({ ...values, newsLetter: checkComunicaciones }));
  };

  useImperativeHandle(ref, () => ({
    onChange
  }));

  const indexECSelect = useMemo(() => {
    if (countries?.length > 0) {
      const index = countries.findIndex(country => country?.value === 'EC');
      if (index >= 0) {
        onChange('country', 'EC');
        getRegions();
      }
      return index;
    }
    return -1;
  }, [countries]);

  const handleVerify = (key: any) => {
    // @ts-ignore
    if (errors[key] && (touched[key] || globalError)) return true;
    return false;
  };

  const scrollHandler = () => {
    try {
      const keysNameError = Object.keys(errors);
      if (keysNameError?.length > 0) {
        const coordsMin = Object.entries(coordFields)
          ?.filter(([nameField]) => {
            return keysNameError.includes(nameField);
          })
          ?.map(([_, value]) => {
            return value;
          })
          ?.sort((a, b) => a - b);
        scrollRef.current?.scrollTo({
          x: 0,
          y: coordsMin[0] ?? 8,
          animated: true
        });
      }
    } catch (error) {}
  };

  const layoutHandler = (name: string, layout: LayoutRectangle) => {
    setCoordFields(prevState => ({
      ...prevState,
      [name]: layout?.y ?? 0
    }));
  };

  return (
    <ScrollView ref={scrollRef}>
      <SafeAreaView
        style={{ marginHorizontal: 16, flex: 1, paddingBottom: 26 }}>
        <FormLegend
          text="Por favor complete los siguientes campos."
          subtitle="* Todos los campos son obligatorios."
        />

        <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 16 }}>
          <View
            style={{ width: '52%', marginBottom: 6 }}
            onLayout={({ nativeEvent }) => {
              layoutHandler('name', nativeEvent.layout);
            }}>
            <InputBase
              key={'Nombre'}
              value={values.name}
              // error={touched.name && errors.name ? true : false}
              error={handleVerify('name')}
              label="Nombre"
              style={stylesSignUp.inputRow}
              maxLength={35}
              theme={undefined}
              onChangeText={(text: string) => onChange('name', text)}
              onChange={handleChange('name')}
              onBlur={handleBlur('name')}
            />
          </View>
          <View
            style={{ width: '50%' }}
            onLayout={({ nativeEvent }) => {
              layoutHandler('lastnames', nativeEvent.layout);
            }}>
            <InputBase
              key={'Apellido'}
              value={values.lastnames}
              // error={errors.lastnames && touched.lastnames ? true : false}
              error={handleVerify('lastnames')}
              label="Apellido"
              maxLength={35}
              style={stylesSignUp.inputRow}
              theme={undefined}
              onChangeText={(text: string) => onChange('lastnames', text)}
              onChange={handleChange('lastnames')}
              onBlur={handleBlur('lastnames')}
            />
          </View>
        </View>
        <SelectInput
          items={IDTYPES}
          // error={errors.id && touched.id ? true : false}
          error={handleVerify('id')}
          onChange={(text: string) => {
            onChange('id', text);
            handleChange('id');
            handleBlur('id');
          }}
          value={values.id}
          label="Tipo de identificación"
          onLayout={({ nativeEvent }) => {
            layoutHandler('id', nativeEvent.layout);
          }}
        />
        <View
          onLayout={({ nativeEvent }) => {
            layoutHandler('numID', nativeEvent.layout);
          }}>
          <InputBase
            value={values.numID}
            label="Número de identificación"
            // error={touched.numID && errors.numID ? true : false}
            error={handleVerify('numID')}
            style={stylesSignUp.inputStyle}
            keyboardType={changeKeyboardNumDoc(values.id)}
            theme={undefined}
            maxLength={validateLengthDoc(values.id)}
            onChangeText={(text: string) => onChange('numID', text)}
            onChange={handleChange('numID')}
            onBlur={handleBlur('numID')}
          />
        </View>
        <View
          onLayout={({ nativeEvent }) => {
            layoutHandler('email', nativeEvent.layout);
          }}>
          <InputBase
            value={values.email}
            label="Correo electrónico"
            // error={touched.email && errors.email ? true : false}
            error={handleVerify('email')}
            style={stylesSignUp.inputStyle}
            keyboardType="email-address"
            theme={undefined}
            onChangeText={(text: string) => onChange('email', text)}
            onChange={handleChange('email')}
            onBlur={handleBlur('email')}
          />
        </View>
        <View
          onLayout={({ nativeEvent }) => {
            layoutHandler('password', nativeEvent.layout);
          }}>
          <PasswordInput
            isVisible
            value={values.password}
            // error={touched.password && errors.password ? true : false}
            error={handleVerify('password')}
            label="Contraseña"
            style={stylesSignUp.inputStyle}
            onChangeText={(text: string) => onChange('password', text)}
            onChange={handleChange('password')}
            onBlur={handleBlur('password')}
          />
        </View>

        <View
          onLayout={({ nativeEvent }) => {
            layoutHandler('confirPassword', nativeEvent.layout);
          }}>
          <PasswordInput
            isVisible
            value={values.confirPassword}
            // error={touched.confirPassword && errors.confirPassword ? true : false}
            error={handleVerify('confirPassword')}
            label="Confirmar contraseña"
            style={{ ...stylesSignUp.inputStyle, marginBottom: 18 }}
            onChangeText={(text: string) => onChange('confirPassword', text)}
            onChange={handleChange('confirPassword')}
            onBlur={handleBlur('confirPassword')}
          />
        </View>
        <SelectInput
          error={Object.keys(errors).includes('country')}
          items={countries ?? []}
          onChange={async (text: string) => {
            onChange('country', text);
            if (text === 'EC') {
              getRegions();
            }
          }}
          valueByIndex={indexECSelect}
          value={values.country}
          label="País"
          onLayout={({ nativeEvent }) => {
            layoutHandler('country', nativeEvent.layout);
          }}
        />
        {values.country === 'EC' && (
          <>
            <SelectInput
              styles={{ marginTop: 16 }}
              error={handleVerify('region')}
              items={regions ?? []}
              onChange={async (text: string) => {
                onChange('region', text);
                getCities({
                  region: text
                });
              }}
              value={values.region}
              label="Provincia"
              onLayout={({ nativeEvent }) => {
                layoutHandler('region', nativeEvent.layout);
              }}
            />

            <SelectInput
              styles={{ marginTop: 16 }}
              error={handleVerify('city')}
              items={cities ?? []}
              onChange={(text: string) => onChange('city', text)}
              value={values.city}
              label="Ciudad"
              onLayout={({ nativeEvent }) => {
                layoutHandler('city', nativeEvent.layout);
              }}
            />
          </>
        )}
        <Text style={stylesSignUp.labelTitle}>Género</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 30
          }}
          onLayout={({ nativeEvent }) => {
            layoutHandler('gender', nativeEvent.layout);
          }}>
          <RadioButtonComp
            label="Masculino"
            color={COLORS.BRAND}
            value="masculino"
            // value={values.gender === 'masculino' ? 'masculino' : 'femenino'}
            status={values.gender === 'masculino' ? 'checked' : 'unchecked'}
            onPress={() => onChange('gender', 'masculino')}
            textStyle={{
              fontSize: FONTS_SIZES.label,
              color: COLORS.DARK
            }}
            onBlur={() => handleBlur('gender')}
          />

          <RadioButtonComp
            label="Femenino"
            color={COLORS.BRAND}
            value="femenino"
            // value={values.gender === 'masculino' ? 'masculino' : 'femenino'}
            status={values.gender === 'femenino' ? 'checked' : 'unchecked'}
            onPress={() => onChange('gender', 'femenino')}
            textStyle={{
              fontSize: FONTS_SIZES.label,
              color: COLORS.DARK
            }}
            onBlur={() => handleBlur('gender')}
          />
        </View>
        {/* {touched.gender && errors.gender && <ErrorText text={errors.gender} />} */}
        {handleVerify('gender') && <ErrorText text={errors.gender} />}

        <CheckboxComp
          onPress={() => setcheckComunicaciones(!checkComunicaciones)}
          color={COLORS.BRAND}
          status={checkComunicaciones ? 'checked' : 'unchecked'}
          styleContainer={stylesSignUp.checkboxContainer}
          textStyle={{
            ...stylesSignUp.termsText,
            width: '90%'
          }}
          label="Deseo recibir comunicación de ofertas y novedades"
        />
        <View
          onLayout={({ nativeEvent }) => {
            layoutHandler('terms', nativeEvent.layout);
          }}>
          <CheckboxComp
            onPress={() => onChange('terms', !values.terms)}
            color={COLORS.BRAND}
            status={values.terms ? 'checked' : 'unchecked'}
            styleContainer={stylesSignUp.checkboxContainer}
            textStyle={{
              fontSize: FONTS_SIZES.label,
              color: COLORS.DARK,
              width: '100%'
            }}
            label={
              <TextAndLink
                textStyle={stylesSignUp.termsText}
                textLinkStyle={stylesSignUp.termsLink}
                text={t('acceptThe')}
                textLink={t('termsAndConditions')}
                onPress={() => {
                  openUrl(getUrlTerms());
                }}
              />
            }
            onBlur={() => handleBlur('terms')}
          />
        </View>
        <View
          onLayout={({ nativeEvent }) => {
            layoutHandler('polities', nativeEvent.layout);
          }}>
          <CheckboxComp
            onPress={() => onChange('polities', !values.polities)}
            color={COLORS.BRAND}
            status={values.polities ? 'checked' : 'unchecked'}
            styleContainer={stylesSignUp.checkboxContainer}
            textStyle={{
              fontSize: FONTS_SIZES.label,
              color: COLORS.DARK,
              width: '100%'
            }}
            label={
              <TextAndLink
                textStyle={stylesSignUp.termsText}
                textLinkStyle={stylesSignUp.termsLink}
                text="Acepto las "
                textLink="Políticas de tratamiento de datos"
                onPress={() => openUrl(privacidadWeb)}
              />
            }
            onBlur={() => handleBlur('polities')}
          />
        </View>
        {(handleVerify('terms') || handleVerify('polities')) && (
          <View style={{ marginTop: 16 }}>
            <ErrorText text={`${t('aceptOwnTermAndConditions')}`} />
          </View>
        )}
        <View style={{ marginHorizontal: 15, marginTop: 16 }}>
          <TextAndLink
            textAlign="left"
            textStyle={stylesSignUp.termsText}
            textLinkStyle={stylesSignUp.termsLink2}
            text="Para crear una cuenta en De Prati debes aceptar los "
            textLink={`Términos y Condiciones.`}
            onPress={() => openUrl(getUrlTerms())}
          />
        </View>
        <View
          style={{
            marginHorizontal: 15,
            marginTop: 8,
            marginBottom: 24
          }}>
          <TextAndLink
            textAlign="left"
            textStyle={stylesSignUp.termsText}
            textLinkStyle={stylesSignUp.termsLink2}
            text={t('privacyProtection')}
            textLink="Política de privacidad De Prati."
            onPress={() => openUrl(privacidadWeb)}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
});

type FormSignUpProps =
  | {
      setIsError?(x: boolean): void;
      isPressNext: boolean;
    }
  | undefined;
export type FormSignUpRef = {
  onChange(name: string, value: string): void;
};
export default FormSignUp;
