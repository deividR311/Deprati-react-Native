import { useState } from 'react';

export const useAccordion = (firstTimeSummary: boolean) => {
  const [productDetail, setProductDetail] = useState<boolean>(firstTimeSummary);
  const [methodPayment, setMethodPayment] = useState<boolean>(firstTimeSummary);

  return {
    productDetail,
    setProductDetail,
    methodPayment,
    setMethodPayment
  };
};
