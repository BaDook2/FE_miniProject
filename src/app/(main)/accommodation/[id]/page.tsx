'use client';

import accommodationDataFetch from '@/components/AccommodationDetail/accommodationDataAxios';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import AboutAccommondation from '@/components/AccommodationDetail/AboutAccommondation';
import Room from '@/components/AccommodationDetail/Room';
import ImageSlider from '@/components/AccommodationDetail/ImageSlider';
import Kakaomap from '@/components/AccommodationDetail/KakaoMap';
import exportDate from '@/components/common/exportDate';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

export interface IRoom {
  roomId: number;
  title: string;
  price: number;
  minPeople: number; // 기준인원
  maxPeople: number;
  img: string[];
}

export interface IAccommodation {
  longitude: number;
  latitude: number;
  title: string;
  info: string;
  price: number;
  checkIn: string;
  checkOut: string;
  shower: boolean;
  aircone: boolean;
  tv: boolean;
  pc: boolean;
  internet: boolean;
  refrigerator: boolean;
  toiletries: boolean;
  kitchenware: boolean;
  parkingLodging: boolean;
  address: string;
  tel: string;
  dryer: boolean;
  roomCount: number;
  img: string[];
  room: IRoom[];
}

function AccommodationDetail({ params }: { params: { id: string } }) {
  const { todayToDate, tommorrowToDate } = exportDate();
  // const [accommodation, setAccommodation] = useState<IAccommodation>();
  const [peopleCount, setPeopleCount] = useState<number>(2);
  const [checkInDate, setCheckInDate] = useState<string>(todayToDate);
  const [checkOutDate, setCheckOutDate] = useState<string>(tommorrowToDate);
  const [isVaildPeriod, setIsVaildPeriod] = useState(true);

  const { data: accommodation, error: errorMessage } = useQuery({
    queryKey: ['accommodation', params.id, checkInDate, checkOutDate],
    queryFn: () =>
      accommodationDataFetch({
        params,
        checkInDate,
        checkOutDate,
      }),
    enabled: isVaildPeriod,
  });

  useEffect(() => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const today = new Date(todayToDate);
    const tommorrow = new Date(tommorrowToDate);
    if (today > checkIn || tommorrow > checkOut || checkOut <= checkIn) {
      setIsVaildPeriod(false);
    } else {
      setIsVaildPeriod(true);
    }
    if (isVaildPeriod) {
      // setAccommodation(data?.data);
    }
    if (errorMessage) {
      toast.error(`${errorMessage}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkInDate, checkOutDate]);

  return (
    <section className="w-innerWidth mx-auto">
      {accommodation?.data && (
        <div>
          <div className="w-innerWidth flex gap-3 my-3">
            {accommodation && (
              <>
                <div className="w-3/5 h-[400px] rounded-xl overflow-hidden">
                  <ImageSlider imgArr={accommodation.data.img} />
                </div>
                <div className="w-2/5 h-[400px] rounded-xl">
                  <Kakaomap data={accommodation.data} />
                </div>
              </>
            )}
          </div>
          <div className="w-innerWidth border-2 border-dovegray rounded-xl flex overflow-hidden">
            <div className="flex flex-col justify-center items-center w-20">
              <label htmlFor="peopleCount">인원</label>
              <select
                id="peopleCount"
                className="border-white appearance-none [text-align-last:center] relative w-1/2"
                value={peopleCount}
                onChange={(e) => {
                  setPeopleCount(Number(e.target.value));
                }}
              >
                {[...Array(8)].map((_, i) => (
                  <option className="absolute left-7" value={`${i + 2}`}>
                    {i + 2}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col justify-center items-center border-l-[1px] border-r-[1px] border-dovegray grow">
              <label htmlFor="checkInDate">체크인</label>
              <input
                type="date"
                id="checkInDate"
                value={checkInDate}
                onChange={(e) => {
                  setCheckInDate(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col justify-center items-center grow">
              <label htmlFor="checkOutDate">체크아웃</label>
              <input
                type="date"
                id="checkOutDate"
                value={checkOutDate}
                onChange={(e) => {
                  setCheckOutDate(e.target.value);
                }}
              />
            </div>
          </div>
          {accommodation && <AboutAccommondation data={accommodation.data} />}
          <span>
            {accommodation?.data?.room
              .filter((room) => room.maxPeople >= +peopleCount)
              .map((room) => (
                <Room
                  key={room.roomId}
                  buildingName={accommodation?.data?.title as string}
                  checkInTime={accommodation?.data?.checkIn as string}
                  checkOutTime={accommodation?.data?.checkOut as string}
                  room={room}
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  numPeople={peopleCount}
                  isVaildPeriod={isVaildPeriod}
                />
              ))}
          </span>
        </div>
      )}
    </section>
  );
}

export default AccommodationDetail;
