import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { COLORS, FontStyles } from '../../../../../application/common';
import {
  GenderCodeType,
  UserUpdateRequestBody
} from '../../../../../infrastucture/apis/user/user.interface';
import useCountriesAndOthers from '../../../../../application/common/hooksCommons/useCountries';
import { LocalStorageKey } from '../../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../../application/state-manager/services/localstorage/useLocalStorage';
import Button from '../../../../common-components/buttons/Button';
import InputBase from '../../../../common-components/inputs/InputBase';
import SelectInput from '../../../../common-components/inputs/SelectInput';
import { Style } from './profile-form.styles';
import { useUpdateProfileRequest } from '../../../../../infrastucture/apis/user/user.api';
import { Popup } from '../../../../common-components/poppup';

export const ProfileForm: React.FC<{}> = () => {
  const navigator = useNavigation();
  const { getCountries, getRegions, getCities, cities, regions, countries } =
    useCountriesAndOthers();

  const {
    localStorageData: {
      [LocalStorageKey.User]: UserData,
      [LocalStorageKey.Token]: TOKEN
    }
  } = useLocalStorage();

  const [
    doUpdateProfile,
    {
      isLoading: isLoadingByUpdateProfile,
      isError: isErrorByUpdateProfile,
      isSuccess: isSuccessByUpdateProfile
    }
  ] = useUpdateProfileRequest();

  const [showSuccesPopup, setShowSuccessPopup] = React.useState(false);
  const [formIsDirty, setFormDirty] = React.useState(false);

  const [hasError, setError] = React.useState({
    firstName: false,
    lastName: false,
    region: false,
    city: false
  });

  const [formUserData, setFormUserData] = React.useState<UserUpdateRequestBody>(
    {
      typeId: UserData?.documentTypeId,
      firstName: UserData?.firstName,
      lastName: UserData?.lastName,
      genderCode: UserData?.genderCode,
      country: {
        isocode: UserData?.country?.isocode ?? '',
        name: UserData?.country?.name ?? ''
      },
      provinceCode:
        UserData?.provinceCode || UserData?.defaultAddress?.region?.isocode,
      cityCode: UserData?.cityCode || UserData?.defaultAddress?.town
    }
  );

  const [showRegionAndCity, setShowRegionAndCity] = React.useState(false);

  const getSelectItemDataByCode = (
    combo: { label: string; value: string }[],
    code?: string
  ) => {
    // !formIsDirty && setFormDirty(true)
    const item = combo.find(
      option => option.value.toLocaleLowerCase() === code?.toLocaleLowerCase()
    );
    return item || combo?.[0];
  };

  const handleChange = (field: 'firstName' | 'lastName', text: string) => {
    !formIsDirty && setFormDirty(true);
    setFormUserData({
      ...formUserData,
      [field]: text
    });
    if (text) {
      setError({
        ...hasError,
        [field]: false
      });
    }
  };
  const getGenderByCode = (code: GenderCodeType) => ({
    value: code,
    label: code.toLocaleUpperCase() === 'MALE' ? 'Masculino' : 'Femenino'
  });

  const onChangeGender = (code: string) => {
    !formIsDirty && setFormDirty(true);
    setFormUserData({
      ...formUserData,
      genderCode: code.toLocaleUpperCase()
    });
  };

  const onChangeCountry = (code: string) => {
    !formIsDirty && setFormDirty(true);
    const { label: name = '', value: isocode = '' } =
      getSelectItemDataByCode(countries, code) || {};
    setFormUserData({
      ...formUserData,
      country: {
        isocode: isocode ?? '',
        name
      }
    });
  };

  const onChangeProvince = (code: string) => {
    !formIsDirty && setFormDirty(true);
    setFormUserData({
      ...formUserData,
      provinceCode: code,
      cityCode: ''
    });
    setError({ ...hasError, region: false });
  };

  const onChangeCity = (code: string) => {
    !formIsDirty && setFormDirty(true);
    setFormUserData({
      ...formUserData,
      cityCode: code
    });
    setError({ ...hasError, city: false });
  };

  const onSaveChanges = () => {
    const regionsErrors = {
      ...hasError,
      region: !formUserData.provinceCode && showRegionAndCity,
      city: !formUserData.cityCode && showRegionAndCity
    };
    setError(regionsErrors);
    if (Object.values(regionsErrors).some(v => v === true)) return;
    doUpdateProfile({
      ...formUserData,
      userEmail: UserData.uid,
      token: TOKEN
    }).then(response => {
      if (Object.keys(response).includes('error')) {
        Alert.alert('Ups!', 'Ha ocurrido un error, intenta de nuevo.');
        return;
      }
      setShowSuccessPopup(true);
    });
  };

  const onCancel = () => {
    navigator.goBack();
  };

  useEffect(() => {
    getCountries();
    getRegions();
  }, []);

  useEffect(() => {
    if (!formUserData.provinceCode) return;
    getCities({
      region: formUserData.provinceCode
    });
  }, [formUserData.provinceCode]);

  useEffect(() => {
    if (!formUserData.country) return;

    setError({ ...hasError, region: false, city: false });

    if (formUserData.country.isocode === 'EC') {
      setShowRegionAndCity(true);
      return;
    }
    setShowRegionAndCity(false);
    setFormUserData({
      ...formUserData,
      provinceCode: '',
      cityCode: ''
    });
  }, [formUserData.country]);

  return (
    <View style={Style.container}>
      <ScrollView>
        <Text style={[FontStyles.Subtitle, Style.textLeft]}>
          Datos Personales
        </Text>
        <View style={[Style.row, Style.inputSpaceTop]}>
          <InputBase
            dense
            style={Style.rowItem}
            label="Nombres"
            value={formUserData.firstName}
            onChangeText={text => handleChange('firstName', text)}
            onEndEditing={(e: any) =>
              setError({ ...hasError, firstName: !e.nativeEvent.text })
            }
            error={hasError.firstName}
          />
          <View style={Style.rowItemSpace} />
          <InputBase
            dense
            style={Style.rowItem}
            label="Apellido"
            value={formUserData.lastName}
            onChangeText={(text: string) => handleChange('lastName', text)}
            onEndEditing={(e: any) =>
              setError({ ...hasError, lastName: !e.nativeEvent.text })
            }
            error={hasError.lastName}
          />
        </View>
        <View style={[Style.inputSpaceTop]}>
          <SelectInput
            label="Tipo de identificación"
            items={[
              {
                label: UserData.documentTypeId,
                value: UserData.documentTypeId
              }
            ]}
            disabled={true}
            value={{
              label: UserData.documentTypeId,
              value: UserData.documentTypeId
            }}
            onChange={() => undefined}
          />
        </View>
        <InputBase
          dense
          style={Style.inputSpaceTop}
          label="Número de documento"
          value={UserData.documentTypeNumber}
          disabled={true}
        />
        <View style={[Style.inputSpaceTop]}>
          <SelectInput
            label="Género"
            items={[
              {
                label: 'Masculino',
                value: 'MALE'
              },
              {
                label: 'Femenino',
                value: 'FEMALE'
              }
            ]}
            onChange={onChangeGender}
            value={getGenderByCode(formUserData.genderCode as GenderCodeType)}
          />
        </View>
        <View style={[Style.inputSpaceTop]}>
          <SelectInput
            label="País"
            items={countries}
            onChange={onChangeCountry}
            value={getSelectItemDataByCode(
              countries,
              formUserData.country.isocode
            )}
          />
        </View>
        {!!showRegionAndCity && (
          <>
            <View style={[Style.inputSpaceTop]}>
              <SelectInput
                label="Provincia"
                items={regions}
                onChange={onChangeProvince}
                value={getSelectItemDataByCode(
                  regions,
                  formUserData.provinceCode
                )}
                error={hasError.region}
              />
            </View>
            <View style={[Style.inputSpaceTop]}>
              <SelectInput
                label="Ciudad"
                items={cities}
                onChange={onChangeCity}
                value={
                  getSelectItemDataByCode(cities, formUserData.cityCode) ||
                  cities?.[0]
                }
                error={hasError.city}
              />
            </View>
          </>
        )}
        <Button
          containerStyle={{
            width: '100%'
          }}
          backgroundColor={COLORS.BRAND}
          linkName={`GUARDAR CAMBIOS`}
          textColor={FontStyles.LightColor.color}
          onPress={onSaveChanges}
          disabled={
            isLoadingByUpdateProfile ||
            Object.values(hasError).some(v => v === true) ||
            !formIsDirty
          }
          showActivityIndicator={isLoadingByUpdateProfile}
          activityIndicator={{
            color: FontStyles.LightColor.color
          }}
        />
        <Button
          containerStyle={{
            width: '100%',
            borderWidth: 1,
            borderColor: COLORS.DARK
          }}
          backgroundColor={COLORS.WHITE}
          linkName="CANCELAR"
          textColor={FontStyles.DarkColor.color}
          onPress={onCancel}
          marginTop={12}
          activityIndicator={{
            color: FontStyles.LightColor.color
          }}
        />
        <View style={Style.rowItemSpace} />
      </ScrollView>
      <Popup
        visible={showSuccesPopup}
        icon={'check-circle'}
        iconColor={COLORS.GREENOK}
        title={'¡Tu cuenta ha sido actualizada con éxito!'}
        showCloseButton={true}
        hideButton={true}
        closeAction={() => navigator.goBack()}
      />
    </View>
  );
};
