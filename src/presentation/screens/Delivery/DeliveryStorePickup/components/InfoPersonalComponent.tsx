import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { stylesPersonal } from './stylesComponent.stylesheet';
import { IPersonal } from '../interfaces';
import InputBase from '../../../../common-components/inputs/InputBase';
import {
  alphaNumeric,
  ALPHA_NUMERIC_WITH_SPACE_AND_ACCENTS_STRICT
} from '../../../../../application/utils/regExp';

const TITLE = 'DATOS DE LA PERSONA\nQUE VA A RETIRAR';

export default function InfoPersonalComponent({
  errors,
  values,
  onChangeText,
  onError
}: IPersonal) {
  const { fullName = '', numID = '' } = values;
  const [isDirty, setDirty] = useState({
    fullName: false,
    numID: false
  });
  const [hasError, setError] = useState({
    fullName: !!errors?.fullName,
    numID: !!errors?.numID
  });

  useEffect(() => {
    if (
      hasError.fullName !== !!errors.fullName ||
      hasError.numID !== !!errors.numID
    )
      onError?.(hasError);
  }, [hasError, errors]);

  useEffect(() => {
    if (!fullName && !numID) {
      setError({ fullName: false, numID: false });
      setDirty({
        fullName: false,
        numID: false
      });
      return;
    }
    const _dirty = {
      ...isDirty
    };
    if (!!fullName && !isDirty.fullName) _dirty.fullName = true;
    if (!!numID && !isDirty.numID) _dirty.numID = true;
    if (_dirty.fullName || _dirty.numID) setDirty(_dirty);

    const error = {
      fullName: !fullName && !!numID && _dirty.fullName,
      numID: !numID && !!numID && _dirty.numID
    };
    setError(error);
  }, [fullName, numID]);

  const onBlurNumID = (text: string) => {
    if (fullName && (text?.length ?? 0) < 4)
      setError({
        ...hasError,
        numID: true
      });
    if (!fullName && (text?.length ?? 0) > 4)
      setError({ fullName: false, numID: false });
  };

  const onBlurFullName = (text: string) => {
    if (numID && !text)
      setError({
        ...hasError,
        fullName: true
      });
    if (!text && !numID) setError({ fullName: false, numID: false });
  };

  return (
    <View style={stylesPersonal.viewCard}>
      <View style={stylesPersonal.content}>
        <Text style={stylesPersonal.content_title}>{TITLE}</Text>
        <View>
          <InputBase
            value={fullName}
            label="Nombre completo"
            error={hasError.fullName}
            style={stylesPersonal.inputStyle}
            maxLength={50}
            theme={undefined}
            onEndEditing={e => onBlurFullName(e.nativeEvent.text)}
            pattern={ALPHA_NUMERIC_WITH_SPACE_AND_ACCENTS_STRICT}
            validateWithPositivePattern={/^[0-9a-zA-ZÁáÉéÍíÓóÚúñÑ ]+$/}
            onChangeText={(text: string) => onChangeText('fullName', text)}
          />
          <InputBase
            value={numID}
            label="Número de cédula"
            error={hasError.numID}
            style={stylesPersonal.inputStyle}
            validateWithPositivePattern={/^[0-9A-Z]+$/gi}
            pattern={alphaNumeric}
            maxLength={10}
            theme={undefined}
            onEndEditing={e => onBlurNumID(e.nativeEvent.text)}
            onChangeText={(text: string) =>
              onChangeText('numID', text, ['fullName', 'store', 'city'])
            }
          />
        </View>
      </View>
    </View>
  );
}
