export const alphaNumeric = /[^a-z0-9_]/gi;
export const alphaNumericWithSpace = /[^a-z0-9\d\-_\s]/gi;
export const alphaNumericWithSpaceAndAccents =
  /[^a-zA-zÁáÉéÍíÓóÚúñÑ0-9\d\-_\s]/gi;
export const ALPHA_NUMERIC_WITH_SPACE_AND_ACCENTS_STRICT =
  /[^0-9a-zA-ZÁáÉéÍíÓóÚúñÑ ]/gi;
export const numeric = /[^0-9]/g;
export const phoneYup = '^.*?(09).*$';
export const prefffixPhoneNumber = '^.*?(02|03|04|05|06|07|08).*$';
export const phonePreffix = '^.*?(02|03|04|05|06|07|08|09).*$';
export const htmlMatcherRegex = '<([a-zA-Z]+).*>(.+)</\\1+>';
export const numberAccountAditional = '^.*?(00|01|02|03|04|05).*$';

export const hrefAnchorMatcherRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/;
//<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1
