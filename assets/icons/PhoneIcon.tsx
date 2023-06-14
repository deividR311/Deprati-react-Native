import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '../../src/application/common';

function PhoneIcon(props) {
  return (
    <Svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M27.975 13.1819C27.8139 10.4943 26.8802 7.9104 25.2862 5.74049C23.6922 3.57059 21.5057 1.90696 18.9892 0.94941C16.4727 -0.00813501 13.7332 -0.218876 11.0999 0.342498C8.46651 0.903872 6.0512 2.21349 4.14405 4.11406C2.23689 6.01463 0.918986 8.42533 0.348617 11.0566C-0.221752 13.6879 -0.0203307 16.4279 0.928689 18.9476C1.87771 21.4672 3.53397 23.6593 5.69855 25.2605C7.86313 26.8618 10.444 27.8042 13.1311 27.9745C13.428 27.9923 13.7145 28.0012 14.0069 28.0012C15.472 28.0022 16.9282 27.7728 18.322 27.3214C18.8836 27.1381 19.3977 26.833 19.8275 26.4278C20.2573 26.0226 20.5923 25.5274 20.8084 24.9777C21.0223 24.4419 21.1228 23.8675 21.1033 23.2908C21.0839 22.7142 20.9451 22.1478 20.6956 21.6276L21.8831 20.4402C22.0357 20.2872 22.151 20.1011 22.2201 19.8964C22.2891 19.6916 22.3101 19.4737 22.2814 19.2596C22.2527 19.0454 22.1751 18.8407 22.0545 18.6614C21.9339 18.4821 21.7737 18.333 21.5862 18.2256L17.5635 15.9086C17.2952 15.7547 16.9836 15.6934 16.677 15.7342C16.3703 15.7749 16.0857 15.9155 15.8669 16.1342L14.8278 17.1732C14.7458 17.2551 14.6363 17.3036 14.5206 17.3094C14.4048 17.3151 14.2911 17.2777 14.2014 17.2044C13.5756 16.6992 12.9775 16.1606 12.4097 15.5909C11.841 15.0233 11.3029 14.4257 10.7977 13.8008C10.7242 13.7109 10.6868 13.5969 10.6925 13.4809C10.6983 13.3649 10.7468 13.2552 10.8289 13.173L11.8679 12.134C12.0861 11.9149 12.2263 11.6301 12.2668 11.3236C12.3073 11.017 12.2459 10.7056 12.0921 10.4374L9.78236 6.40453C9.6749 6.21731 9.52581 6.05731 9.34661 5.93693C9.16742 5.81656 8.96292 5.73902 8.74896 5.71032C8.535 5.68162 8.3173 5.70253 8.11271 5.77143C7.90813 5.84033 7.72214 5.95538 7.56914 6.10767L6.38163 7.29512C5.50138 8.17234 5.47763 9.75313 6.31186 11.748C7.0971 13.6257 8.55922 15.6889 10.431 17.5606C12.3028 19.4323 14.3676 20.8973 16.2454 21.681C17.2147 22.0877 18.0875 22.2896 18.8282 22.2896C19.2305 22.2972 19.6303 22.224 20.0039 22.0744C20.1825 22.4811 20.2785 22.9193 20.2861 23.3635C20.2938 23.8076 20.2129 24.2489 20.0484 24.6615C19.8766 25.0994 19.6102 25.4939 19.2681 25.8167C18.926 26.1395 18.5168 26.3827 18.0697 26.5288C15.1744 27.4663 12.0439 27.3727 9.20985 26.2639C6.37579 25.1551 4.01299 23.0994 2.5228 20.4461C1.03262 17.7928 0.506944 14.7054 1.03508 11.7085C1.56322 8.71158 3.1126 5.98987 5.42002 4.00572C7.72745 2.02157 10.6506 0.897335 13.693 0.823988C16.7354 0.75064 19.7094 1.7327 22.1097 3.60335C24.5101 5.47401 26.1889 8.11789 26.8608 11.0859C27.5328 14.0539 27.1565 17.163 25.7959 19.885C25.7449 19.9815 25.7344 20.0942 25.7665 20.1985C25.7987 20.3027 25.8709 20.3899 25.9674 20.4409C26.0638 20.4919 26.1766 20.5025 26.2808 20.4703C26.3851 20.4382 26.4723 20.3659 26.5233 20.2695C27.6175 18.0741 28.118 15.6306 27.975 13.1819ZM20.1078 21.0487C19.4888 21.6677 18.1929 21.6291 16.5452 20.9419C14.764 20.1997 12.7912 18.7955 10.9936 16.998C9.19602 15.2005 7.79476 13.2279 7.05109 11.4467C6.36381 9.80508 6.32522 8.50928 6.94272 7.88439L7.47859 7.35597L7.63445 7.62463C7.68858 7.71892 7.77795 7.78783 7.8829 7.81623C7.98785 7.84462 8.09978 7.83016 8.19406 7.77603C8.28835 7.7219 8.35727 7.63254 8.38567 7.5276C8.41406 7.42265 8.3996 7.31073 8.34547 7.21645L8.08125 6.76225L8.14953 6.69397C8.25839 6.58441 8.40626 6.52249 8.56071 6.52179C8.58688 6.51953 8.6132 6.51953 8.63938 6.52179C8.72872 6.53319 8.81422 6.56512 8.88916 6.61507C8.9641 6.66503 9.02645 6.73166 9.07134 6.80975L11.387 10.8337C11.4519 10.9451 11.478 11.0748 11.4614 11.2027C11.4447 11.3305 11.3862 11.4492 11.2949 11.5402L10.9981 11.8371L9.25837 8.80763C9.20404 8.71335 9.11448 8.64451 9.00939 8.61625C8.90431 8.588 8.7923 8.60264 8.69801 8.65697C8.60373 8.7113 8.53488 8.80085 8.50663 8.90593C8.47837 9.01101 8.49302 9.12302 8.54735 9.2173L10.4028 12.4382L10.2544 12.5867C10.0283 12.8113 9.89383 13.1119 9.87709 13.4301C9.86036 13.7483 9.96257 14.0614 10.1638 14.3085C10.6871 14.9567 11.2445 15.5765 11.8338 16.1653C12.4254 16.7549 13.0477 17.3128 13.6982 17.8367C13.9458 18.0367 14.2586 18.1381 14.5765 18.1214C14.8943 18.1046 15.1948 17.971 15.4201 17.7461L15.5136 17.6526L16.2261 18.0593C16.3206 18.1133 16.4326 18.1274 16.5376 18.0988C16.6425 18.0701 16.7318 18.0009 16.7857 17.9064C16.8396 17.812 16.8538 17.6999 16.8252 17.595C16.7965 17.49 16.7273 17.4008 16.6328 17.3469L16.1148 17.05L16.4621 16.7027C16.5539 16.6127 16.6724 16.555 16.7998 16.5381C16.9272 16.5212 17.0566 16.5462 17.1687 16.6092L21.1854 18.9336C21.2623 18.9795 21.3279 19.0422 21.3771 19.1171C21.4263 19.1919 21.458 19.2769 21.4697 19.3658C21.4814 19.4546 21.4729 19.5449 21.4447 19.6299C21.4166 19.715 21.3695 19.7925 21.3071 19.8568L21.2003 19.9637L18.1513 18.2152C18.0569 18.1614 17.9449 18.1474 17.8401 18.1763C17.7353 18.2051 17.6462 18.2743 17.5925 18.3688C17.5387 18.4633 17.5247 18.5752 17.5535 18.68C17.5823 18.7848 17.6516 18.8739 17.7461 18.9276L20.6021 20.5604L20.1078 21.0487Z"
        fill={COLORS.BRAND}
      />
    </Svg>
  );
}

export default PhoneIcon;