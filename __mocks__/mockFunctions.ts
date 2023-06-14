export function mockStateAction<T>(
  state: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  return [state, jest.fn()];
}

// Mockear Utils
jest.mock('../src/application/utils', () => ({
  fontWeightOS: jest.fn(),
  fontFamilyOS: jest.fn().mockReturnValueOnce('Roboto-Regular'),
  handleChangeColor: jest.fn(),
  capitalize: jest.fn(),
  getUrlImageHybris: jest
    .fn()
    .mockReturnValueOnce(
      'https://imagestg.deprati.com.ec/sys-master/images/h09/hb0/8985954484254'
    ),
  //const
  ASPECT_RATIO: 1.5,
  PAGE_SIZE: 20,
  //enum
  LABEL_TAB: {
    HOME: 'Inicio',
    FAVORITES: 'Favoritos',
    CART: 'Carrito',
    CREDIT: 'Crédito',
    CREDITPRATI: 'Crédito De Prati',
    MYACCOUNT: 'Mi Cuenta'
  },
  StatusEnum: {
    pending: 'pending',
    success: 'success',
    error: 'error'
  }
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: () => {}
    }
  })
}));
