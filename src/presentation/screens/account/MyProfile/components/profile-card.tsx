import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Styles } from './profile-card.styles';
import { LocalStorageKey } from '../../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../../application/state-manager/services/localstorage/useLocalStorage';
import { GenderCodeEnum } from '../../../../../infrastucture/apis/user/user.interface';
import useCountriesAndOthers from '../../../../../application/common/hooksCommons/useCountries';
import { ProfileCardRow } from './profile-card-row';
import { capitalize } from '../../../../../application/utils/string-formater';

export const CardProfile: React.FC = () => {
  const { getCountries, getRegions, getCities, cities, regions, countries } =
    useCountriesAndOthers();
  const {
    localStorageData: { [LocalStorageKey.User]: UserData }
  } = useLocalStorage();

  const findLocationItemByCode = (
    combo: { label: string; value: string }[] = [],
    code?: string
  ) =>
    combo.find(
      option => option.value.toLocaleUpperCase() === code?.toLocaleUpperCase()
    )?.label;

  useEffect(() => {
    getCountries();
    getRegions();
  }, []);

  useEffect(() => {
    if (!UserData.provinceCode) return;
    getCities({
      region: UserData.provinceCode
    });
  }, [UserData.provinceCode]);

  return (
    <View style={Styles.container}>
      <View style={[Styles.cardProfile, Styles.shadow]}>
        <View style={[Styles.cardProfile_container]}>
          <Text style={[Styles.cardProfile_container_title]}>
            Datos de cuenta
          </Text>
          <ProfileCardRow
            title="Nombres y apellidos"
            text={capitalize(UserData.name, true)}
          />
          <ProfileCardRow
            title="Tipo de identificación"
            text={capitalize(
              UserData.documentTypeId === 'CEDULA'
                ? 'Cédula'
                : UserData.documentTypeId
            )}
          />
          <ProfileCardRow
            title="Número de documento"
            text={UserData.documentTypeNumber}
          />
          <ProfileCardRow
            title="Correo electrónico"
            text={UserData.displayUid}
          />
        </View>
      </View>
      <View style={[Styles.cardProfile, Styles.shadow]}>
        <View style={[Styles.cardProfile_container]}>
          <Text style={[Styles.cardProfile_container_title]}>
            Datos personales
          </Text>
          <ProfileCardRow
            title="Género"
            text={GenderCodeEnum[UserData?.genderCode] ?? ''}
          />
          <ProfileCardRow
            title="País"
            text={findLocationItemByCode(countries, UserData?.country?.isocode)}
          />
          {UserData?.country?.isocode === 'EC' && (
            <>
              {(UserData?.provinceCode ||
                UserData?.defaultAddress?.region?.name) && (
                <ProfileCardRow
                  title="Provincia"
                  text={findLocationItemByCode(
                    regions,
                    UserData?.provinceCode ||
                      UserData?.defaultAddress?.region?.name
                  )}
                />
              )}
              {(UserData?.cityCode || UserData?.defaultAddress?.town) && (
                <ProfileCardRow
                  title="Ciudad"
                  text={findLocationItemByCode(
                    cities,
                    UserData?.cityCode || UserData?.defaultAddress?.town
                  )}
                />
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default CardProfile;
