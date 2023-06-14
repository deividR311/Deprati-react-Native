import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import useErrorDescription from '../../../../application/common/hooksCommons/useErrorDescription';
import { useOrderProductReviewRequest } from '../../../../infrastucture/apis/customer-orders';
import { OrderEntry } from '../../../../infrastucture/apis/customer-orders/interfaces/customer-order-detail.type';

export const usePurchaseItemReview = (
  productItem: OrderEntry
): PurchaseItemReviewHook => {
  const [showPopup, setShowPopup] = React.useState(false);

  const navigation = useNavigation();

  const [_doSubmit, { isLoading, error, data }] =
    useOrderProductReviewRequest();
  const { handleModalErrorService } = useErrorDescription();

  const doSubmit = async (review: ReviewForm) => {
    _doSubmit({
      headline: review.title,
      comment: review.comment,
      rating: Number(review.score),
      productId: productItem.product.code
    });
  };

  useEffect(() => {
    if (!data) return;
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    }, 1500);
  }, [data]);

  useEffect(() => {
    if (!error) return;
    handleModalErrorService(error);
  }, [error]);

  return {
    doSubmit,
    isLoading,
    showPopup
  };
};

interface PurchaseItemReviewHook {
  doSubmit(review: ReviewForm): Promise<void>;
  isLoading: boolean;
  showPopup: boolean;
}

export interface ReviewForm {
  title: string;
  comment: string;
  score: string;
}
