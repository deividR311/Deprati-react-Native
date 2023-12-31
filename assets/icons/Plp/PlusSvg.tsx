import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
import { COLORS } from '../../../src/application/common';
import { ICON } from '../../../src/application/utils/enums';

function PlusSvg(props: SvgProps) {
  if (props?.rotation !== ICON.OPENED)
    return (
      <Svg
        width={props.width ?? 18}
        height={props.height ?? 18}
        // rotation={props.rotation}
        viewBox="0 0 17 17"
        fill="none">
        <Path
          d="M15.2554 9.3429C15.729 9.3429 16.113 8.95893 16.113 8.48528C16.113 8.01163 15.729 7.62766 15.2554 7.62766L9.34297 7.62766L9.34297 1.71524C9.34297 1.24159 8.959 0.857619 8.48535 0.857619C8.0117 0.857619 7.62773 1.24159 7.62773 1.71524L7.62773 7.62766L1.71531 7.62766C1.24166 7.62766 0.85769 8.01163 0.85769 8.48528C0.85769 8.95893 1.24166 9.3429 1.71531 9.3429H7.62773V15.2553C7.62773 15.729 8.0117 16.1129 8.48535 16.1129C8.959 16.1129 9.34297 15.729 9.34297 15.2553L9.34297 9.3429H15.2554Z"
          fill={props.color ?? COLORS.DARK70}
        />
      </Svg>
    );
  return (
    <Svg
      width={props.width ?? 14}
      height={props.height ?? 14}
      viewBox="0 0 12 12"
      fill="none">
      <Path
        d="M11.3936 1.81929C11.7285 1.48437 11.7285 0.94135 11.3936 0.606428C11.0586 0.271507 10.5156 0.271507 10.1807 0.606429L6 4.78714L1.81929 0.606429C1.48437 0.271508 0.94135 0.271507 0.606429 0.606429C0.271507 0.94135 0.271507 1.48436 0.606429 1.81929L4.78714 6L0.606429 10.1807C0.271508 10.5156 0.271507 11.0586 0.606428 11.3936C0.94135 11.7285 1.48436 11.7285 1.81929 11.3936L6 7.21286L10.1807 11.3936C10.5156 11.7285 11.0586 11.7285 11.3936 11.3936C11.7285 11.0586 11.7285 10.5156 11.3936 10.1807L7.21286 6L11.3936 1.81929Z"
        fill={props.color ?? COLORS.DARK70}
      />
    </Svg>
  );
}

export default PlusSvg;
