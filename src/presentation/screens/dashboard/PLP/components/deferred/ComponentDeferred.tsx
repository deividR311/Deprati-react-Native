import React, { useEffect, useState } from 'react';
//Libs
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet
} from 'react-native';
import { handleChangeColorBoldSize } from '../../../../../../application/utils/functionsChangeColor';
import { FONTS_FAMILY } from '../../../../../../application/common';
//Styles

interface ComponentDeferredProps {
  style?: StyleProp<ViewStyle>;
  styleContentCuotas?: StyleProp<ViewStyle>;
  styleCuotas?: StyleProp<TextStyle>;
  styleDescribe?: StyleProp<ViewStyle>;
  styleTextDescribe?: StyleProp<TextStyle>;
  deferred: string;
}
const cuotasText = 'Cuotas';
const describe = ' con Crédito De Prati Final a pagar: ';
export default function ComponentDeferred({
  style = {},
  styleContentCuotas = {},
  styleCuotas = {},
  styleDescribe = {},
  styleTextDescribe = {},
  deferred
}: ComponentDeferredProps) {
  const [creditInfo, setCreditInfoPlp] = useState({
    cuotas: '',
    valueCuota: '',
    totalCuota: ''
  });

  useEffect(() => {
    hanldeSeparateInformation();
  }, [deferred]);

  function hanldeSeparateInformation() {
    // const info = deferred.split('|')
    let [_cuotas, _valueCuota, _totalCuota] = deferred.split('|');

    setCreditInfoPlp({
      cuotas: _cuotas,
      valueCuota: _valueCuota,
      totalCuota: _totalCuota
    });
  }
  if (!deferred) return null;
  return (
    <View style={[styles.container, style]}>
      <View style={[styleContentCuotas]}>
        <Text style={[styles.cuotas, styleCuotas]}>
          {handleChangeColorBoldSize(creditInfo.cuotas, '#E3172C', 20)}
          {'\n'}
          {cuotasText}
        </Text>
      </View>
      {/* <View style={{ borderColor: '#E3172C', borderWidth: 1,height:'100%',marginHorizontal:5 }} /> */}

      <View style={[styles.contentDescribe, styleDescribe]}>
        <Text style={[styles.textDescribe, styleTextDescribe]}>
          {handleChangeColorBoldSize(creditInfo.valueCuota, '#E3172C', 14)}
          {describe}
          {creditInfo.totalCuota}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cuotas: {
    color: '#E3172C',
    textAlign: 'center',
    fontFamily: FONTS_FAMILY.Roboto
  },
  contentDescribe: {
    borderLeftColor: '#E3172C',
    borderLeftWidth: 2,
    paddingLeft: 6
  },
  textDescribe: {
    color: '#E3172C',
    fontFamily: FONTS_FAMILY.Roboto
  }
});
