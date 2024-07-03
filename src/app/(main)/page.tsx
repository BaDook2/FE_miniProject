'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import Category from '@/components/Main/Category';
import AccommodationList from '@/components/Main/accommodationList';
import ScrollTopButton from '@/components/Main/ScrollTopButton';

const images = [
  {
    id: 1,
    src: 'https://yaimg.yanolja.com/v5/2024/06/17/13/667036a30d52d6.02156142.png',
  },
  {
    id: 2,
    src: 'https://yaimg.yanolja.com/v5/2024/06/13/13/666af7ed835a01.22682192.png',
  },
  {
    id: 3,
    src: 'https://yaimg.yanolja.com/v5/2024/06/07/15/66632c134a56a6.85035219.png',
  },
  {
    id: 4,
    src: 'https://yaimg.yanolja.com/v5/2024/06/17/13/6670362e5a1619.24577291.png',
  },
  {
    id: 5,
    src: 'https://yaimg.yanolja.com/v5/2024/06/13/13/666af6abc49622.99666723.png',
  },
  {
    id: 6,
    src: 'https://yaimg.yanolja.com/v5/2024/06/18/13/6671908c944c30.84566795.png',
  },
];

function Page() {
  const [category, setCategory] = useState<string>('관광 호텔');

  // 뒤로가기, sesstionStorage에 저장한 카테고리 불러오기
  useEffect(() => {
    const storedCategory = Object.keys(sessionStorage).find((key) =>
      key.startsWith('accommodationsState-'),
    );
    if (storedCategory) {
      setCategory(storedCategory.replace('accommodationsState-', ''));
    }
  }, []);

  return (
    <div className="container w-innerWidth m-auto relative">
      <Category selectedCategory={category} onSelectCategory={setCategory} />
      <div className="flex justify-center">
        <Swiper
          spaceBetween={16}
          slidesPerView={3}
          navigation
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 3000 }}
          className="w-full"
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <div className="relative w-90 h-44">
                <Image
                  src={image.src}
                  alt="event image"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg cursor-pointer"
                  sizes="50vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <AccommodationList category={category} />
      <ScrollTopButton />
    </div>
  );
}

export default Page;
