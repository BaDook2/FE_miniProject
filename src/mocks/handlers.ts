import { http, HttpResponse } from 'msw';
// import accommodationsData from '../../public/api/mainmockdata.json';
import bookingData from './bookingData';
import cartData from './cartData';

const handlers = [
  http.get('api/user', () => {
    return HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      firstName: 'John',
      lastName: 'Maverick',
    });
  }),
  http.get('api/accommodation', () => {
    return HttpResponse.json({
      longitude: 127.873875062367,
      latitude: 37.6836403222276,
      title: '봄동물병원 게스트하우스',
      info: '봄동물병원 게스트하우스 : 도심 속 휴식처로 최고입니다.',
      price: 50000,
      checkIn: '18:00',
      checkOut: '11:00',
      shower: true,
      aircone: false,
      tv: true,
      pc: true,
      internet: false,
      refrigerator: false,
      toiletries: false,
      kitchenware: false,
      parkingLodging: true,
      address: '강원특별자치도 홍천군 홍천읍 무궁화로 44',
      tel: '061-577-2052',
      dryer: false,
      roomCount: 3,
      img: [
        'http://tong.visitkorea.or.kr/cms/resource/37/2705937_image3_1.jpg',
        'http://tong.visitkorea.or.kr/cms/resource/96/2707596_image2_1.jpg',
      ],
      room: [
        {
          title: '밝은',
          price: 80000,
          minPeople: 2,
          maxPeople: 5,
          img: [
            'http://tong.visitkorea.or.kr/cms/resource/87/1950787_image3_1.jpg',
            'http://tong.visitkorea.or.kr/cms/resource/13/710413_image2_1.jpg',
            'http://tong.visitkorea.or.kr/cms/resource/68/1950868_image3_1.jpg',
            'http://tong.visitkorea.or.kr/cms/resource/87/1950787_image3_1.jpg',
            'http://tong.visitkorea.or.kr/cms/resource/13/710413_image2_1.jpg',
            'http://tong.visitkorea.or.kr/cms/resource/68/1950868_image3_1.jpg',
          ],
        },
        {
          title: '별빛',
          price: 110000,
          minPeople: 2,
          maxPeople: 8,
          img: [
            'http://tong.visitkorea.or.kr/cms/resource/08/1972208_image2_1.jpg',
            'http://tong.visitkorea.or.kr/cms/resource/85/1975985_image2_1.jpg',
            'http://tong.visitkorea.or.kr/cms/resource/23/2016923_image2_1.JPG',
            'http://tong.visitkorea.or.kr/cms/resource/08/1972208_image2_1.jpg',
            'http://tong.visitkorea.or.kr/cms/resource/85/1975985_image2_1.jpg',
            'http://tong.visitkorea.or.kr/cms/resource/23/2016923_image2_1.JPG',
          ],
        },
        {
          title: '달빛',
          price: 50000,
          minPeople: 2,
          maxPeople: 8,
          img: [
            'http://tong.visitkorea.or.kr/cms/resource/34/3070734_image2_1.jpg',
            'http://tong.visitkorea.or.kr/cms/resource/94/2949194_image2_1.jpg',
            'http://tong.visitkorea.or.kr/cms/resource/20/2948920_image3_1.JPG',
            'http://tong.visitkorea.or.kr/cms/resource/34/3070734_image2_1.jpg',
            'http://tong.visitkorea.or.kr/cms/resource/94/2949194_image2_1.jpg',
            'http://tong.visitkorea.or.kr/cms/resource/20/2948920_image3_1.JPG',
          ],
        },
      ],
    });
  }),
  http.get('api/accommodations', ({ request }) => {
    const url = new URL(request.url);
    const cursorId = Number(url.searchParams.get('cursorId')) || 0;

    return HttpResponse.json({
      nextData: true,
      nextCursorId: 8483,
      nextCursorMinPrice: 150000,
      accommodationSimpleResponseList: [
        {
          id: cursorId + 1,
          title: '만산고을펜션(구 만산수목원펜션)',
          category: '관광호텔',
          minPrice: 146243,
          region: '강원특별자치도 화천군 상서면 만산동로 898-16',
          thumbnailUrl:
            'http://tong.visitkorea.or.kr/cms/resource/92/588892_image2_1.jpg',
        },
        {
          id: cursorId + 2,
          title: '위너스모텔',
          category: '콘도미니엄',
          minPrice: 92795,
          region: '강원특별자치도 속초시 먹거리2길 33',
          thumbnailUrl:
            'http://tong.visitkorea.or.kr/cms/resource/92/588892_image2_1.jpg',
        },
        {
          id: cursorId + 3,
          title: '광림모텔',
          category: '모텔',
          minPrice: 80034,
          region: '강원특별자치도 속초시 청대로 2',
          thumbnailUrl:
            'http://tong.visitkorea.or.kr/cms/resource/72/588472_image2_1.jpg',
        },
        {
          id: cursorId + 4,
          title: '대궐파크',
          category: '펜션',
          minPrice: 325319,
          region: '강원특별자치도 속초시 부월1길 38',
          thumbnailUrl:
            'http://tong.visitkorea.or.kr/cms/resource/13/2529813_image2_1.jpg',
        },
        {
          id: cursorId + 5,
          title: '미라지모텔',
          category: '민박',
          minPrice: 348363,
          region: '강원특별자치도 속초시 동해대로 4164(조양동)',
          thumbnailUrl:
            'http://tong.visitkorea.or.kr/cms/resource/39/632339_image2_1.jpg',
        },
        {
          id: cursorId + 6,
          title: '그린모텔',
          category: '관광호텔',
          minPrice: 270546,
          region: '강원특별자치도 철원군 동송읍 창동로 2405',
          thumbnailUrl:
            'http://tong.visitkorea.or.kr/cms/resource/92/597292_image2_1.jpg',
        },
        {
          id: cursorId + 7,
          title: '제주 금강산콘도',
          category: '콘도미니엄',
          minPrice: 153090,
          region: '제주특별자치도 제주시 한림읍 협재로 210-18',
          thumbnailUrl:
            'http://tong.visitkorea.or.kr/cms/resource/80/1843180_image2_1.jpg',
        },
        {
          id: cursorId + 8,
          title: '하늘마루 펜션',
          category: '모텔',
          minPrice: 307837,
          region: '강원특별자치도 철원군 동송읍 창동로 2395',
          thumbnailUrl:
            'http://tong.visitkorea.or.kr/cms/resource/12/1843212_image2_1.jpg',
        },
        {
          id: cursorId + 9,
          title: '산골나그네 펜션',
          category: '펜션',
          minPrice: 285868,
          region: '강원특별자치도 양구군 방산면 남밭길150번길 69',
          thumbnailUrl:
            'http://tong.visitkorea.or.kr/cms/resource/62/1843162_image2_1.jpg',
        },
        {
          id: cursorId + 10,
          title: '초록바다펜션',
          category: '민박',
          minPrice: 323113,
          region: '강원특별자치도 양양군 강현면 장산3길 56-4',
          thumbnailUrl:
            'http://tong.visitkorea.or.kr/cms/resource/27/1950827_image2_1.jpg',
        },
        {
          id: cursorId + 11,
          title: '샬레리조트',
          category: '관광호텔',
          minPrice: 134118,
          region: '강원특별자치도 평창군 봉평면 면온리 726-44',
          thumbnailUrl:
            'http://tong.visitkorea.or.kr/cms/resource/32/597632_image2_1.jpg',
        },
        {
          id: cursorId + 12,
          title: '한화리조트 평창',
          category: '콘도미니엄',
          minPrice: 106665,
          region: '강원특별자치도 평창군 봉평면 태기로 228-33',
          thumbnailUrl:
            'http://tong.visitkorea.or.kr/cms/resource/26/1949026_image2_1.jpg',
        },
      ],
    });
  }),
  http.get('api/booking', ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page');
    const size = url.searchParams.get('size');

    const start = (Number(page) - 1) * Number(size);
    const end = start + Number(size);

    return HttpResponse.json({
      bookingList: bookingData.bookingList.slice(start, end),
      totalElements: bookingData.totalElements,
    });
  }),
  http.get('api/cart', ({ request }) => {
    const url = new URL(request.url);
    console.log(url);
    return HttpResponse.json({
      cartList: cartData.cartList,
    });
  }),
  http.get('api/cart/count', () => {
    return HttpResponse.json({
      cartCount: 15,
    });
  }),
  http.delete('api/cart', ({ request }) => {
    const url = new URL(request.url);
    console.log(url);
  }),
];
export default handlers;
