import { useState, useEffect } from 'react';
import {
  PriceProduct,
  useProductMutationRequest
} from '../../../../infrastucture/apis/product';

export const useCardInfo = (productCode: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [contentProduct, setContentProduct] = useState();
  const [
    _getProduct,
    { isLoading: loadingProduct, data: contentProductRaw, isSuccess: isSuccess }
  ] = useProductMutationRequest();

  useEffect(() => {
    if (!loadingProduct && isSuccess) {
      const { name, price } = contentProductRaw;
      setContentProduct({ name, price });
      setLoading(false);
    }
  }, [loadingProduct]);

  useEffect(() => {
    if (productCode) {
      _getProduct({ productCode });
    }
  }, [productCode]);

  return {
    loading,
    contentProduct
  };
};

export interface InfoHook<T> {
  loading: boolean;
  hasErrors?: boolean;
  errors?: string[];
  contentProduct?: {
    name: string;
    price: PriceProduct;
  };
}
