import {
  View,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  useWindowDimensions
} from 'react-native';
import React, { useMemo, useState } from 'react';
import { COLORS } from '../../../../application/common/colors';
import useComponentContent from '../../../../application/common/hooksCommons/useComponentContent';
import CardPoints from './CardPoint';
import Point from './Point';
export const WIDTH_IMG = 1080;
export const HEIGHT_IMG = 1920;

const Points = ({ story }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [showCard, setShowCard] = useState<boolean>(false);
  const [pointCurrent, setPointCurrent] = useState();
  const [child] = story?.childrenComponentsList;

  const { loading: loadingPoints, componentContent } =
    useComponentContent(child);

  const { width, height } = useWindowDimensions();
  const normalizedPoint = (point: number, isWidth: boolean) => {
    try {
      const pointNumber = Number(point);
      if (!isWidth) {
        // top manejar en porcentaje por dimensiones de pantalla
        const normalizeHeight = pointNumber / HEIGHT_IMG;
        const convertInPorcent = normalizeHeight * (100 - 3);
        return `${convertInPorcent}%`;
      }

      if (isWidth) {
        // ok
        const normalizeWidth = pointNumber / WIDTH_IMG;
        return normalizeWidth * (width - 24);
      }
      return pointNumber;
    } catch (error) {}
    return 0;
  };

  const componentList = useMemo(() => {
    if (!loadingPoints) {
      const { componentList, childrenComponents } = componentContent;
      const result = componentList?.map(component => {
        const point = childrenComponents[component];
        const { x, y } = point;
        let top = normalizedPoint(y, false);
        let left = normalizedPoint(x, true);
        return { ...point, top, left };
      });
      setLoading(false);
      return result ?? [];
    }

    return [];
  }, [loadingPoints]);

  const showCardCurrent = point => {
    setShowCard(true);
    if (pointCurrent?.uid === point?.uid) {
      setShowCard(false);
      setPointCurrent(null);
    } else {
      setPointCurrent(point);
    }
  };

  if (loading) return <ActivityIndicator size="large" color={COLORS.WHITE} />;

  return (
    <View style={[styles.container]}>
      {componentList?.map((point, index) => {
        return (
          <Point
            key={`point_${index}`}
            point={point}
            showCardHandle={showCardCurrent}
            showCard={pointCurrent?.uid === point?.uid && showCard}
          />
        );
      })}
      {pointCurrent && showCard && (
        <CardPoints point={pointCurrent} showCard={showCard} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 1080 / 1920
  },
  container_temp: {
    position: 'absolute',
    width: '50%',
    height: '50%',
    backgroundColor: 'rgba(255, 0, 0, 0.3)'
  }
});

export default Points;
