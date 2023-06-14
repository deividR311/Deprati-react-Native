import React, { useEffect, useRef, useState } from 'react';
//Libs
import {
  View,
  Text,
  Image,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SvgUri } from 'react-native-svg';
import { size } from 'lodash';
//Styles
import { styles } from './stylesCarousel';
//interface
import { iComponentWelcome } from '../interface/iWelcome';
//Utils
import { getUrlImageHybris } from '../../../../application/utils/urls';
import { useNavigation } from '@react-navigation/native';
import { NAV } from '../../../../application/common/namesNav';
import { COLORS } from '../../../../application/common';
import layout from '../../../../application/common/layout';
import sleep from '../../../../application/utils/sleep';
interface Props {
  customProps: {
    childrenComponents: {
      DePratiWelcomeCarousel_Mobile: any;
    };
  };
}

export default function CarouselWelcome(props: Props) {
  const customProps =
    props.customProps.childrenComponents?.DePratiWelcomeCarousel_Mobile;

  const navigation = useNavigation();
  const refCarousel = useRef<FlatList>(null);

  const [activeDot, setActiveDot] = useState<number>(0);
  const [dragStar, setDragStar] = useState<number>(0);
  const [dragEnd, setDragEnd] = useState<number>(0);
  const [isEndIndex, setIsEndIndex] = useState<boolean>(false);
  const [isAuxEnd, setIsAuxEnd] = useState<boolean>(false);

  const SLIDER_CONFIG = {
    showsHorizontalScrollIndicator: false,
    horizontal: true,
    pagingEnabled: true
  };

  let dataCarousel: any[] = [];
  const myVar = customProps.childrenComponents;
  for (var key in myVar) {
    dataCarousel.push(myVar[key]);
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      if (isEndIndex && dragEnd === dragStar) {
        navigation.replace(NAV.DASHBOARD_NAVIGATION as never);
      }
    } else {
      if (isAuxEnd && isEndIndex && dragEnd >= layout.window.width) {
        navigation.replace(NAV.DASHBOARD_NAVIGATION as never);
      }
    }
  }, [isEndIndex, dragEnd]);

  function handleEnd(e: NativeSyntheticEvent<NativeScrollEvent>) {
    setDragEnd(e.nativeEvent.contentOffset.x);
  }

  function handleBegin(e: NativeSyntheticEvent<NativeScrollEvent>) {
    setDragStar(e.nativeEvent.contentOffset.x);
  }

  const renderItem = ({ item }: { item: iComponentWelcome }) => {
    return (
      <View style={styles.containerItem}>
        {item?.headline && (
          <Text style={styles.textHeadline}>{item.headline}</Text>
        )}
        {item?.media?.mime && (
          <View style={styles.containerImage}>
            {item.media.mime.includes('svg') ? (
              <SvgUri
                width="100%"
                height="100%"
                uri={getUrlImageHybris(item?.media?.url)}
              />
            ) : (
              <Image
                style={styles.image}
                source={{ uri: getUrlImageHybris(item?.media?.url) }}
              />
            )}
          </View>
        )}
        {item?.content && (
          <View style={styles.contentDescription}>
            <Text style={styles.textDescritption}>{item?.content}</Text>
          </View>
        )}
      </View>
    );
  };

  function handleGetIndex(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const x = e.nativeEvent.contentOffset.x;
    const index = Number((x / layout.window.width).toFixed(0));
    setActiveDot(index);
    handleGetEndIndex(index);
  }

  async function handleGetEndIndex(index: number) {
    if (index === size(dataCarousel) - 1) {
      await sleep(600);
      setIsAuxEnd(true);
      return;
    }

    setIsAuxEnd(false);
    return setIsEndIndex(false);
  }

  const onEndReached = (info: { distanceFromEnd: number }) => {
    if (info.distanceFromEnd < 1.5) setIsEndIndex(true);
  };

  const PaginationCarousel = ({ data }: { data: iComponentWelcome[] }) => {
    return (
      <View style={styles.containerPagination}>
        {data.map((_, index) => (
          <View
            style={[
              styles.contentPagination,
              {
                backgroundColor:
                  activeDot === index ? COLORS.BRAND : COLORS.GRAYBRAND
              }
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <>
      <FlatList
        ref={refCarousel}
        data={dataCarousel}
        onScroll={e => handleGetIndex(e)}
        renderItem={renderItem}
        onScrollBeginDrag={e => handleBegin(e)}
        onScrollEndDrag={e => handleEnd(e)}
        onEndReached={info => onEndReached(info)}
        {...SLIDER_CONFIG}
      />
      <PaginationCarousel data={dataCarousel} />
    </>
  );
}
