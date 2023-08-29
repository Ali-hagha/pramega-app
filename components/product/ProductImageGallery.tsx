import { StyleSheet, Image, Dimensions } from 'react-native';
import React from 'react';
import ImageCarousel from '../ui/ImageCarousel';
import { StrapiImage } from '../../types/types';
import { COLORS } from '../../constans';

interface Props {
  images: StrapiImage[];
}

const ProductImageGallery = ({ images }: Props) => {
  const strapiUrl = process.env.EXPO_PUBLIC_STRAPI_URL;
  const width = Dimensions.get('window').width;

  return (
    <ImageCarousel
      data={images}
      renderItem={({ item }) => (
        <Image
          source={{
            uri: `${strapiUrl}${item.attributes.formats.medium.url}`,
          }}
          width={width}
          height={width}
          style={styles.image}
        />
      )}
    />
  );
};

export default ProductImageGallery;

const styles = StyleSheet.create({
  image: {
    backgroundColor: COLORS.gray_100,
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
});
