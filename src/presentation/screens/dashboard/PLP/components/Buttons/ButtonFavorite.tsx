import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IconButton } from 'react-native-paper';
import { COLORS } from '../../../../../../application/common';
import { ILoadingFavorite } from '../../interfaces';
import { LocalStorageKey } from '../../../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../../../application/state-manager/services/localstorage/useLocalStorage';
import useFavorite from '../../../../favorite/Favorites/hook/useFavorite.hook';
import sleep from '../../../../../../application/utils/sleep';

interface ButtonFavoriteProps {
  code: string;
  // dataProduct: Product
  isFavorite?: boolean;
  onAddFavorite(code: string, fav?: boolean): void;
  loadingFavorite: ILoadingFavorite;
}
export default function ButtonFavorite({
  code,
  isFavorite,
  onAddFavorite: handleIsLogin,
  loadingFavorite
}: ButtonFavoriteProps) {
  const { loadingAdd, loadingDelete } = loadingFavorite;
  const [isLoading, setIsLoadingFavorite] = useState<boolean>(false);
  const [isLoadingPetition, setIsLoadingPetition] = useState<boolean>(false);
  const { addFavorite } = useFavorite({ showPopUpSuccess: false });

  const {
    localStorageData: { [LocalStorageKey.IsLogin]: IS_LOGIN }
  } = useLocalStorage();

  useEffect(() => {
    if (!isLoadingPetition && !loadingAdd && !loadingDelete) {
      sleep(200).then(() => {
        setIsLoadingFavorite(false);
      });
    }
  }, [isLoadingPetition, loadingFavorite]);

  const handleOnPress = () => {
    if (!isLoading) {
      if (!IS_LOGIN) {
        handleIsLogin(code, isFavorite ?? false);
      } else {
        setIsLoadingFavorite(true);
        setIsLoadingPetition(true);
        addFavorite(code, isFavorite ?? false).then(() => {
          setIsLoadingPetition(false);
        });
      }
    }
  };

  return (
    <View>
      <IconButton
        testID="plp-button-favorite"
        icon={() =>
          isLoading ? (
            <ActivityIndicator
              testID="plp-loading-favorite"
              size="small"
              color={COLORS.DARKBRAND}
              style={{ display: isLoading ? 'flex' : 'none' }}
            />
          ) : (
            <Icon
              testID="plp-icon-favorite"
              name={!isFavorite ? 'favorite-border' : 'favorite'}
              size={22}
              color={!isFavorite ? COLORS.DARK : COLORS.DARKBRAND}
            />
          )
        }
        color={'red'}
        size={20}
        onPress={() => {
          if (!isLoading) handleOnPress();
        }}
      />
    </View>
  );
}
