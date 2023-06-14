import Config from '../common/dotEnv';

export const handleUrl = (url: string) => {
  return `${Config.API_URL_HYBRIS}${url}`;
};

export const getUrlImageHybris = (url: string) => {
  if (url?.includes('https')) return url;
  return `${Config.API_URL_HYBRIS}${url}`;
};

export const getUrlTerms = () => {
  return `https://www.deprati.com.ec/TerminosCondiciones`;
};

export const getUrlCreditTerms = () =>
  `https://credito.deprati.com/content/terminos-uso-y-condiciones`;

export const privacidadWeb = 'https://www.deprati.com.ec/CompraSegura';

export const creditWeb = 'https://credito.deprati.com/servicios/solicitud';

export const webMain = 'https://www.deprati.com.ec';
