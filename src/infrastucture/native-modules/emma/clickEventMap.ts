export enum keyEvents {
  // Sección Login
  'prelogin_saltar' = 'Click:prelogin:saltar',
  'login_iniciarsesion' = 'Click:login:iniciarsesion',

  // Sección Home
  'home_historias' = 'Click:home:historias',
  'home_categorias' = 'Click:home:categorias',
  'home_recomendados' = 'Click:home:recomendados',

  //Sección Ecommerce - Check Out
  'ecommerce_fichadeproducto' = 'Clic:ecommerce:catalogo:fichadeproducto',
  'ecommerce_favoritos' = 'Clic:ecommerce:catalogo:favoritos',
  'ecommerce_fichadeproducto_favoritos' = 'Clic:ecommerce:fichadeproducto:favoritos',
  'ecommerce_fichadeproducto_carrito' = 'Clic:ecommerce:fichadeproducto:carrito',

  //Sección Credito
  'credito_solicitar' = 'Clic:credito:anonimo:solicitar',
  'credito_vincular' = 'Clic:credito:logueado:vincular',
  'credito_vincular_service' = 'Clic:credito:logueado:servicios:vincular',
  'credito_generarcertificado' = 'Clic:credito:identificado:generarcertificado',
  'credito_estadocredito' = 'Clic:credito:identificado:estadocredito'
}

export const clickEventMap: {
  [any: string]: {
    token: string;
    eventAttributes: Record<string, string | number>;
  };
} = {
  // Sección Login
  'Click:prelogin:saltar': {
    token: 'ca129f917b4ba4ac460b0be731232960',
    eventAttributes: {}
  },
  'Click:login:iniciarsesion': {
    token: '34ff5204849d5038b1fc3beccc18e6fc',
    eventAttributes: { origin: 'App' }
  },

  // Sección Home
  'Click:home:historias': {
    token: 'ed9f737c7fb7312816cda3d2385447c3',
    eventAttributes: { IDStory: 'historia' }
  },
  'Click:home:categorias': {
    token: 'f5b8a63f17acf344d29969204d2d24f7',
    eventAttributes: { Categoria: 'Mujeres' }
  },
  'Click:home:recomendados': {
    token: '6f84ccd324bff56bc9f36ccb39e0e91e',
    eventAttributes: { Codigodeproducto: '', Categoria: '' }
  },

  //Sección Ecommerce - Check Out
  'Clic:ecommerce:catalogo:fichadeproducto': {
    token: '1d5d0c444f119f8378ca00ead025e36f',
    eventAttributes: { CategoriaNivel1: '' }
  },
  'Clic:ecommerce:catalogo:favoritos': {
    token: '2d001b094f40e277390d6d50c5f07e3d',
    eventAttributes: { CategoriaNivel1: '' }
  },
  'Clic:ecommerce:fichadeproducto:favoritos': {
    token: '768a7fc29630cfa51ed7afbdb34322f9',
    eventAttributes: { CategoriaNivel1: '' }
  },
  'Clic:ecommerce:fichadeproducto:carrito': {
    token: 'b09a850e7e0ba096b58ef279a4552356',
    eventAttributes: { CategoriaNivel1: '' }
  },

  //Sección Credito
  'Clic:credito:anonimo:solicitar': {
    token: 'af542e3b2fefbd065dd9b7f4e8399540',
    eventAttributes: {}
  },
  'Clic:credito:logueado:vincular': {
    token: '02164e960cdf0d56de792a14d5d8f78f',
    eventAttributes: {}
  },
  'Clic:credito:logueado:servicios:vincular': {
    token: 'b3663e7ef12c852a2a5f96b5b05ed34c',
    eventAttributes: {}
  },
  'Clic:credito:identificado:generarcertificado': {
    token: '512305d2aee37639adecef344491c854',
    eventAttributes: {}
  },
  'Clic:credito:identificado:estadocredito': {
    token: '440d31d50c1b5cfe6ed8c9f1797c42cb',
    eventAttributes: {}
  }
};
