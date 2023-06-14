import { string } from 'yup';

export interface ProductReviewBody {
  productId: string;
  comment: string;
  headline: string;
  rating: number;
}

export interface ProductReviewResponse {
  alias: string;
  comment: string;
  date: string;
  headline: string;
  id: string;
  principal: {
    name: string;
    uid: string;
  };
  rating: number;
}
