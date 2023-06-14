import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../__mocks__/navigation-wrapper';
import {
  confirmation,
  sumaryPurchase
} from '../../../../__mocks__/dataMock-ChoosePaymentMethod';
import BottomSheetCreditFinish from '../../../../src/presentation/screens/checkout/confirmation/dePratiCreditFinish/BottomSheetCreditFinish';
import SummaryPurchase from '../../../../src/presentation/screens/checkout/summaryPurchase/summaryPurchase';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn()
    }),
    useRoute: () => ({
      params: {
        maskedPhoneNumber: '991XXX404',
        maskedEmail: ''
      }
    })
  };
});

const ReturnScreen = (
  <BottomSheetCreditFinish
    onCloseRequest={() => jest.fn()}
    show={confirmation.showBottomSheetDePratiCredit}
    hook={confirmation}
  />
);

let screenTest: any;
describe('BottomSheetCreditFinish', () => {
  beforeEach(() => {
    screenTest = render(<NavigationWrapper>{ReturnScreen}</NavigationWrapper>);
  });

  it('renders correctly in Snapshot', () => {
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });

  it('Validate Msg Code', async () => {
    const { getByText } = screenTest;
    expect(getByText('VALIDAR Y PAGAR')).toBeDefined();
  });

  it('open accordion on first render', async () => {
    const { queryAllByTestId } = render(
      <SummaryPurchase
        hookConfirmation={{ ...confirmation, firstTimeSummary: true }}
        hookSummaryPurchase={sumaryPurchase}
      />
    );
    expect(queryAllByTestId('accordion-expanded')).toHaveLength(2);
  });

  it('open accordion on after first render', async () => {
    const { queryAllByTestId } = render(
      <SummaryPurchase
        hookConfirmation={{ ...confirmation, firstTimeSummary: false }}
        hookSummaryPurchase={sumaryPurchase}
      />
    );
    expect(queryAllByTestId('accordion-expanded')).toHaveLength(0);
  });
});
