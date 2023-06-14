import React from 'react';
import { useOrderDetailsRequest } from '../../../../infrastucture/apis/customer-orders';
import { CustomerOrderDetail } from '../../../../infrastucture/apis/customer-orders/interfaces/customer-order-detail.type';

export const useOrderDetails = (
  orderId: string,
  userEmail: string
): OrderDetailsHook => {
  const { isLoading, data: orderDetails } = useOrderDetailsRequest({
    user: userEmail.toLowerCase(),
    orderCode: orderId
  });

  return {
    isLoading,
    orderDetails
  };
};

interface OrderDetailsHook {
  isLoading: boolean;
  orderDetails?: CustomerOrderDetail;
}
