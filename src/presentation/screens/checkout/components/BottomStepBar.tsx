import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Keyboard,
  SafeAreaView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  COLORS,
  FontStyles,
  FONTS_SIZES
} from '../../../../application/common';

interface BottomStepBarProps {
  title: string;
  step?: number;
  totalSteps?: number;
}

export const BottomStepBar: React.FC<BottomStepBarProps> = props => {
  const { step = 0, totalSteps = 0, title } = props;
  const stepCurrent = useMemo(() => {
    const tempCurrent = step + 1;
    return tempCurrent > totalSteps ? totalSteps : tempCurrent;
  }, [step]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FFFFFF01', '#FFFFFF20', '#0000001A']}
        style={styles.tabShadow}
      />
      <View style={styles.bottomNav}>
        <View style={styles.viewTitle}>
          <Text style={styles.titleBottom}>{title}</Text>
          <Text style={styles.stepText}>
            {`Paso ${stepCurrent} de ${totalSteps}`}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            {Array(totalSteps)
              .fill('step-')
              .map((key, index) => {
                return (
                  <View
                    key={key + index}
                    style={[
                      styles.lineStep,
                      {
                        backgroundColor:
                          stepCurrent - 1 === index
                            ? COLORS.BRAND
                            : COLORS.GRAYBRAND
                      }
                    ]}
                  />
                );
              })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: Platform.select({
      android: 70,
      ios: 80
    }),
    width: '100%',
    backgroundColor: COLORS.WHITE,
    zIndex: 2,
    elevation: 2
  },
  tabShadow: {
    position: 'absolute',
    bottom: Platform.select({
      android: 70,
      ios: 80
    }),
    width: '100%',
    height: 10
  },
  bottomNav: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60
  },
  stepText: {
    ...FontStyles.ProductDescription,
    color: FontStyles.DarkColor.color
  },
  viewTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  titleBottom: { ...FontStyles.Body_1 },
  lineStep: {
    height: 3,
    width: 40,
    marginTop: 4,
    marginHorizontal: 8,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    backgroundColor: COLORS.BRAND
  }
});
