export const capitalize = (str: string, all = false) => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      if (all) return word.charAt(0).toUpperCase() + word.slice(1);
      if (index === 0) return word.charAt(0).toUpperCase() + word.slice(1);
      return word;
    })
    .join(' ');
};

export const removeTags = (str: string) => {
  if (str === null || str === '') return '';
  else str = str.toString();
  return str.replace(/(<([^>]+)>)/gi, '');
};
