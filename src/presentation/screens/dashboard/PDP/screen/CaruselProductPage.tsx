import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Platform
} from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { COLORS } from '../../../../../application/common';
import { getUrlImageHybris } from '../../../../../application/utils/urls';
import { imageFilterCaruosel, imageSortCaruosel } from '../utils/images';
import { SafeAreaView } from 'react-native-safe-area-context';

const CaruselProductPage = () => {
  const route = useRoute();
  const { imageCarusel: imageCaruselParams, indexItem } = route.params;
  const [activeDot, setActiveDot] = useState<number>(indexItem);
  const refCarousel = useRef(null);
  const navigation = useNavigation();

  const widthScreen = Dimensions.get('screen').width;
  const heightScreen = Dimensions.get('screen').height;
  const widthBanner = widthScreen;
  const BANNER_CONFIG = {
    sliderWidth: widthScreen,
    itemWidth: widthBanner,
    inactiveSlideOpacity: 0.8,
    removeClippedSubviews: false,
    enableMomentum: true
  };

  const imageCarusel = useMemo(() => {
    const images = imageCaruselParams
      ?.filter(imageFilterCaruosel)
      .sort(imageSortCaruosel);
    return images;
  }, [imageCaruselParams]);

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View style={styles.container}>
        <ImageBackground
          resizeMode={'contain'}
          source={{
            uri: getUrlImageHybris(item?.url)
          }}
          style={[
            styles.carousel_container_img,
            { height: heightScreen, aspectRatio: 0.475 }
          ]}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Carousel
        ref={refCarousel}
        data={imageCarusel}
        renderItem={renderItem}
        firstItem={activeDot}
        layout={'stack'}
        onSnapToItem={index => setActiveDot(index)}
        {...BANNER_CONFIG}
      />
      <View style={styles.container__pagination}>
        <Pagination
          activeDotIndex={activeDot}
          dotsLength={imageCarusel.length ?? 0}
          dotStyle={[styles.container__pagination_dotActive]}
          inactiveDotOpacity={0.2}
          inactiveDotScale={1}
        />
      </View>
      <TouchableOpacity
        style={styles.close}
        onPress={() => navigation.goBack()}>
        <Icon name="close" size={20} color={COLORS.DARK} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.WHITE
  },
  close: {
    borderRadius: 25,
    position: 'absolute',
    top: Platform.select({
      android: 20,
      ios: 80
    }),
    right: 20,
    width: 40,
    backgroundColor: COLORS.WHITE,
    height: 40,
    elevation: 5,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE
  },
  carousel_container_img: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.GRAYBRAND
  },
  container__pagination: {
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 2,
    bottom: Platform.select({
      android: 80,
      ios: 140
    })
  },
  container__pagination_dotActive: {
    elevation: 4,
    zIndex: 2,
    width: 10,
    height: 10,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: COLORS.DARK70
  }
});

export default CaruselProductPage;
