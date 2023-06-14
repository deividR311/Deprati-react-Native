import { ImageProduct } from '../../../../../infrastucture/apis/product';

export const imageFilterCaruosel = (image: ImageProduct) => {
  return image.imageType === 'GALLERY' && image?.format === 'zoom';
};

export const imageSortCaruosel = (a: ImageProduct, b: ImageProduct) => {
  return (a?.galleryIndex ?? 99) - (b?.galleryIndex ?? 99);
};
