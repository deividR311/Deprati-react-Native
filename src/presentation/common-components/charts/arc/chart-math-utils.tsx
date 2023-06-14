import { Dimensions } from 'react-native';

const { PI } = Math;

// Pre-calculate Device Dimensions for better performance
const x = Dimensions.get('window').width;

// Calculating ratio from iPhone breakpoints
const ratioX = x < 375 ? (x < 320 ? 0.75 : 0.875) : 1;

// We set our base font size value
const base_unit = 16;

// We're simulating EM by changing font size according to Ratio
const unit = base_unit * ratioX;

// We add an em() shortcut function
export function em(value: number) {
  return unit * value;
}

export const toRad = (deg: number) => (deg * PI) / 180;
export const toDeg = (rad: number) => (rad * 180) / PI;
//
// https://stackoverflow.com/questions/42537957/fast-accurate-atan-arctan-approximation-algorithm
export const atan = (_x: number) =>
  (PI / 4) * _x - _x * (Math.abs(_x) - 1) * (0.2447 + 0.0663 * Math.abs(_x));
//
// https://en.wikipedia.org/wiki/Atan2
// https://www.gamedev.net/forums/topic/441464-manually-implementing-atan2-or-atan/
export const atan2 = (_y: number, _x: number) => {
  const coeff1 = PI / 4;
  const coeff2 = 3 * coeff1;

  const absY = Math.abs(_y);
  const angle =
    _x >= 0
      ? coeff1 - coeff1 * ((_x - absY) / (_x + absY))
      : coeff2 - coeff1 * ((_x + absY) / (absY - _x));

  return _y < 0 ? angle * -1 : angle;
};

/** MY FUNCTIONS **/
export const fromValueToPercentage = (_value: number, _max: number) =>
  _max !== 0 ? (_value * 100) / _max : 0;

export const fromPercentageToVal = (per: number, max: number) =>
  (per * max) / 100;

export const fromPercentageToRad = (per: number) =>
  per * ((PI + PI * 0.4) / 100);

export const fromRadToPercentage = (rad: number) =>
  rad / ((PI + PI * 0.4) / 100);

export const fromRadToProgress = (rad: number, offset: number) => {
  let desp = 0,
    always = -1 * PI * 0.2;
  if (offset > 0) {
    desp = offset;
  } else if (offset < 0) {
    desp = PI * 0.2 - offset;
  }
  return rad + desp + always;
};

export const calculateDelta = (beta: number, alpha: number) => {
  let _alpha = alpha;
  if (alpha < 0) {
    if (alpha > PI / -2) {
    } else {
      _alpha = 2 * PI + alpha;
    }
  }
  return beta - _alpha;
};

export const getLargeArcValue = (
  end: number,
  start: number,
  isAdvanced: boolean,
  angle: number
) => {
  if (start < 0) start = 2 * PI + start;
  if (!isAdvanced) {
    if (angle < 0 && start - end <= PI) {
      start = start - 0.2 * PI;
    }
    return start > PI ? '1' : '0';
  } else {
    if (angle >= 0 && angle < PI) {
      start = 2 * PI + start;
    }
  }
  return end - start > -1 * PI ? '0' : '1';
};

/** @description Calculate value the original values by angle
 * @returns {number} Return +100 units on the max value if value is upper to limit or -100 if value is 0
 */
export const resolveNewValue = (
  alpha: number,
  beta: number,
  maxValue: number
) => {
  const delta = calculateDelta(beta, alpha);
  const deltaPer = fromRadToPercentage(delta);
  let value = fromPercentageToVal(deltaPer, maxValue);

  if (value <= 0) {
    value = -100;
  } else if (value >= maxValue) {
    value = maxValue + 100;
  }

  return Math.ceil(value);
};
