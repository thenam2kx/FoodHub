import * as React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

import banner1 from '@/assets/homepage/banner/bn1.jpg'
import banner2 from '@/assets/homepage/banner/bn2.jpg'
import banner3 from '@/assets/homepage/banner/bn3.jpg'

const data = [...new Array(6).keys()];
const sliders = [
  { id: 1, source: banner1 },
  { id: 2, source: banner2 },
  { id: 3, source: banner3 },
]

const  BannerHome = () => {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const width = Dimensions.get("window").width;

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View>
      <Carousel
        ref={ref}
        width={width}
        height={width / 4}
        data={sliders}
        onProgressChange={progress}
        autoPlay={true}
        scrollAnimationDuration={1000}
        autoPlayInterval={5000}
        renderItem={({ item, index }) => (
          <Image
            style={{
                width: width,
                height: width / 3.7,
                resizeMode: 'cover',
            }}
            source={item.source}
          />
        )}
      />

      <Pagination.Basic
        progress={progress}
        data={sliders}
        dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50, height: 6, width: 6 }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      />
    </View>
  );
}

export default BannerHome;