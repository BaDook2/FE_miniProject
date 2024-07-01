import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import React from 'react';
import Image from 'next/image';

function ImageSlider({ imgArr }: { imgArr: string[] | undefined }) {
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={1}
      direction="horizontal"
      loop
      autoplay={{ delay: 10000 }}
      className="w-full h-full"
    >
      {imgArr?.map((url) => (
        <SwiperSlide className="py-10">
          <Image src={url} alt="accommodation image" fill objectFit="cover" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ImageSlider;
