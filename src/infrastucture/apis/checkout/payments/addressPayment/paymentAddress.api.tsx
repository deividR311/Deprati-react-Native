import { ApiConfig } from '../../../common/config';
import { HYBRISS_API } from '../../../common/hybriss.api';
import { SuccessPaymentResponse as SuccessPaymentRes } from '../cashPayment/cashPayment.type';
import { PaymentAddressRequest as PaymentAddressReq } from './paymentAddress.type';

const extendedApi = HYBRISS_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    setPaymentAddress: builder.mutation<SuccessPaymentRes, PaymentAddressReq>({
      query: ({ user, cartId, addressId, ...body }) => ({
        url: ApiConfig.endpoints.paymentMethod.setPaymentAddress(
          user,
          cartId,
          addressId
        ),
        method: 'PUT',
        body
      }),
      invalidatesTags: ['ShoppingCart']
    })
  })
});

export const { useSetPaymentAddressMutation: useSetPaymentAddressRequest } =
  extendedApi;
