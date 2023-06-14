import { render } from '@testing-library/react-native';

const AppWrapper = ({ children }) => {
  return children;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AppWrapper, ...options });

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { customRender as render };
