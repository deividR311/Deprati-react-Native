import React, { useEffect, useState } from 'react';
import { COLORS } from '../../../application/common/colors';
import { TextInput } from 'react-native-paper';
import { TextInputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
import { TextInput as ITextInput, View } from 'react-native';

interface Props extends TextInputProps {
  pattern?: { [Symbol.replace](string: string, replaceValue: string): string };
  /**
   * @description Youn can use that to validate the input value just after the user has press the key, the content to the regex must be a positive test of the expression wish you want to validate, and you can use the ´pattern´ prop to delete the unwanted characters.
   * @example /^[0-9]+$/ // only numbers
   */
  validateWithPositivePattern?: RegExp;
}

export const InputBase = React.forwardRef<ITextInput, Partial<Props>>(
  (props, ref) => {
    const validTextType =
      props?.keyboardType !== 'number-pad' && props?.keyboardType !== 'numeric';
    const activeOutlineColor = props?.error ? COLORS.BRAND : COLORS.DARK70;
    const [changerStates, forceRender] = useState(false);
    const [value, setValue] = useState(props?.value);

    useEffect(() => {
      if (props?.validateWithPositivePattern?.test(value ?? '')) {
        props?.onChangeText?.(value ?? '');
        return;
      }

      if (!props?.pattern) {
        setValue(props?.value);
        props?.onChangeText?.(props?.value ?? '');
        return;
      }

      const newValue = value?.replace(props.pattern ?? /.*/g, '');
      setValue(newValue);
      props?.onChangeText?.(newValue ?? '');
      //@ts-ignore
      ref?.current?.setNativeProps({
        text: newValue
      });
    }, [changerStates, props?.value]);

    return (
      <TextInput
        ref={ref}
        nativeID={props?.testID}
        testID={props?.testID}
        accessibilityLabel={props?.testID}
        accessibilityIgnoresInvertColors={true}
        placeholderTextColor={COLORS.GRAYDARK60}
        placeholder={props.placeholder}
        selectionColor={COLORS.GRAYDARK60}
        outlineColor={COLORS.GRAYDARK60}
        mode="outlined"
        onEndEditing={props?.onEndEditing}
        multiline={props?.multiline}
        dense={props?.dense}
        autoComplete="off"
        numberOfLines={props?.numberOfLines}
        activeOutlineColor={activeOutlineColor}
        {...props} // props nota: no reemplaza a los siguientes props
        value={value}
        onChangeText={(text: string) => {
          try {
            if (props?.validateWithPositivePattern) {
              setValue(text);
              forceRender(!changerStates);
              return;
            }
            if (props?.pattern)
              return props?.onChangeText?.(text.replace(props?.pattern, ''));
            if (!validTextType)
              return props?.onChangeText?.(text.replace(/[^0-9]/g, ''));
            props?.onChangeText?.(text);
          } catch (error) {}
        }}
        style={[
          {
            backgroundColor: props?.error
              ? COLORS.ERRORBACKGROUND
              : COLORS.WHITE
          },
          props?.style
        ]}
        right={
          props?.right && (
            <TextInput.Icon
              color={(isTextInputFocused: boolean) =>
                isTextInputFocused ? COLORS.DARK70 : COLORS.GRAYDARK60
              }
              name={props?.right}
              onPress={props?.onPressOut}
            />
          )
        }
      />
    );
  }
);
export default InputBase;
