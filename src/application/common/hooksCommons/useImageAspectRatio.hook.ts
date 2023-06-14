import React from 'react';
import { Image } from 'react-native';

export const useImageAspectRatio = (imageUrl: string, mime?: string) => {
  const [aspectRatio, setAspectRatio] = React.useState(1);

  React.useEffect(() => {
    if (!imageUrl || mime?.includes('svg')) {
      return;
    }
    let isValid = true;
    Image.getSize(imageUrl, (widthImg, heightImg) => {
      if (isValid) {
        setAspectRatio(widthImg / heightImg);
      }
    });

    return () => {
      isValid = false;
    };
  }, [imageUrl]);

  return aspectRatio;
};
