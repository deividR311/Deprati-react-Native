/* 
  1000 * 60 * 60 * 24 * 7 * 4
  milliseconds * seconds * minutes * hours * days * weeks
*/
export const TIME_CACHE = 1000 * 60 * 5; // * 60 // 6 HOURS

export const validTimeCache = (timestamp: string | number): boolean => {
  return timestamp ? Date.now() - timestamp < TIME_CACHE : false;
};
