import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../__mocks__/navigation-wrapper';
import SplashScreen from '../../../src/presentation/screens/Splash/SplashScreen';

describe('Splash', () => {
  it('renders correctly in Snapshot', () => {
    const screenTest = render(<NavigationWrapper screen={SplashScreen} />);
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });

  // Tests that the splashscreen component renders the errorpage component when there are errors in the splash component. tags: [edge case]
  test('test_splash_screen_renders_error_page_when_splash_has_error', () => {
    jest
      .spyOn(
        require('../../../src/presentation/screens/Splash/hooks/useSplash.hook'),
        'useSplash'
      )
      .mockReturnValueOnce({
        hasError: true
      });
    const { queryByTestId } = render(
      <NavigationWrapper screen={SplashScreen} />
    );
    expect(queryByTestId('errorPage')).toBeTruthy();
  });
});
