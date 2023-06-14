import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Platform,
  useWindowDimensions,
  NativeModules
} from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import { COLORS } from '../../../application/common/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontStyles } from '../../../application/common/fonts';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getUrlImageHybris } from '../../../application/utils/urls';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Points from './components/Points';

const Stories = () => {
  const route = useRoute();
  const { customProps, indexItem } = route.params;
  const { childrenComponentsList, childrenComponents } = customProps;
  const refCarousel = useRef(null);
  const navigation = useNavigation();
  const [activeDot, setActiveDot] = useState<number>(indexItem);
  const { width: widthScreen, height: heightScreen } = useWindowDimensions();
  const { StatusBarManager } = NativeModules;
  const heightStatusBar = StatusBarManager.HEIGHT ?? 0;

  const widthBanner = widthScreen;
  const BANNER_CONFIG = {
    autoplay: __DEV__ ? false : true,
    //autoplayDelay: 5000,
    autoplayInterval: 6000,
    sliderWidth: widthScreen,
    itemWidth: widthBanner,
    inactiveSlideOpacity: 0.8,
    removeClippedSubviews: false,
    enableMomentum: true
  };

  const stories = useMemo(() => {
    const result = childrenComponentsList.map(component => {
      const content = childrenComponents[component];
      return content;
    });
    return result;
  }, [childrenComponentsList]);

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View style={styles.container}>
        <ImageBackground
          resizeMode="stretch"
          resizeMethod="resize"
          borderRadius={4}
          source={{
            uri: getUrlImageHybris(item?.image?.url)
          }}
          style={[styles.storie]}>
          <Points story={item} />
        </ImageBackground>
        <Text style={styles.storie_title}>{item.title}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Carousel
        ref={refCarousel}
        data={stories}
        renderItem={renderItem}
        firstItem={indexItem}
        onSnapToItem={index => setActiveDot(index)}
        {...BANNER_CONFIG}
      />
      <View
        style={[
          styles.container__pagination,
          {
            top: Platform.select({
              android: -10,
              ios: heightStatusBar - 10
            })
          }
        ]}>
        <Pagination
          activeDotIndex={activeDot}
          dotsLength={stories.length ?? 0}
          dotStyle={[
            styles.container__pagination_dotActive,
            { width: widthScreen / stories.length - 20 }
          ]}
          inactiveDotOpacity={0.2}
          inactiveDotScale={1}
        />
      </View>
      <TouchableOpacity
        style={[
          styles.close,
          {
            top: Platform.select({
              android: 50,
              ios: heightStatusBar + 50
            })
          }
        ]}
        onPress={() => navigation.goBack()}>
        <Icon name="close" size={20} color={COLORS.DARK} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.DARK
  },
  close: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    position: 'absolute',
    right: 0,
    width: 40,
    backgroundColor: COLORS.DEPRATYGRAY,
    height: 40,
    elevation: 2,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  container__pagination: {
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 2,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container__pagination_dotActive: {
    width: 100,
    height: 4,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: COLORS.WHITE
  },
  storie: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    aspectRatio: 1080 / 1920
  },
  storie_title: {
    position: 'absolute',
    zIndex: 2,
    elevation: 2,
    bottom: 0,
    ...FontStyles.H3_Headline,
    paddingHorizontal: 24,
    paddingVertical: 8,
    width: '100%',
    color: COLORS.WHITE,
    textAlign: 'left',
    height: '10%',
    backgroundColor: COLORS.DARK
  }
});

export default Stories;
