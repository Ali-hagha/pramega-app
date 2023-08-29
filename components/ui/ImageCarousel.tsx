import Carousel from 'react-native-reanimated-carousel';
import React from 'react';
import { Dimensions } from 'react-native';
import { StrapiImage } from '../../types/types';
import Animated from 'react-native-reanimated';

interface CarouselRenderItemInfo<ItemT> {
  item: ItemT;
  index: number;
  animationValue: Animated.SharedValue<number>;
}

interface Props {
  data: StrapiImage[];
  renderItem: ({
    item,
  }: CarouselRenderItemInfo<StrapiImage>) => React.JSX.Element;
}

const ImageCarousel = ({ data, renderItem }: Props) => {
  const width = Dimensions.get('window').width;
  return (
    <Carousel
      loop
      width={width}
      height={width}
      autoPlay={true}
      autoPlayInterval={2000}
      panGestureHandlerProps={{
        activeOffsetX: [-10, 10],
      }}
      data={data}
      scrollAnimationDuration={1000}
      renderItem={renderItem}
    />
  );
};

export default ImageCarousel;
