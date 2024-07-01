'use client';

import accommodationDataFetch from '@/components/AccommodationDetail/accommodationDataAxios';
import { useCallback, useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import AboutAccommondation from '@/components/AccommodationDetail/AboutAccommondation';
import Room from '@/components/AccommodationDetail/Room';
import ImageSlider from '@/components/AccommodationDetail/ImageSlider';
import Kakaomap from '@/components/AccommodationDetail/KakaoMap';

export interface IRoom {
  roomId: string;
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
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const todayToDate = `${today.getFullYear()}-${today.getMonth() < 9 ? '0' : ''}${today.getMonth() + 1}-${today.getDate() < 9 ? '0' : ''}${today.getDate()}`;
  const tommorrowToDate = `${tomorrow.getFullYear()}-${tomorrow.getMonth() < 9 ? '0' : ''}${tomorrow.getMonth() + 1}-${today.getDate() < 9 ? '0' : ''}${tomorrow.getDate()}`;
  const [accommodation, setAccommodation] = useState<IAccommodation | null>();
  const [peopleCount, setPeopleCount] = useState<string>('1');
  const [checkInDate, setCheckInDate] = useState<string>(todayToDate);
  const [checkOutDate, setCheckOutDate] = useState<string>(tommorrowToDate);
  const [err, setErr] = useState<string | null>(null);

  const fetchData = useCallback(async (): Promise<void> => {
    const { data, error } = await accommodationDataFetch({
      params,
      checkInDate,
      checkOutDate,
    });
    setErr(error);
    setAccommodation(data);
  }, [params, checkInDate, checkOutDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <section className="w-innerWidth mx-auto">
      {err ? (
        <div className="w-full text-primary text-4xl flex items-center justify-center h-36">
          {err}
        </div>
      ) : (
        <>
          <div className="w-innerWidth flex gap-3 my-3">
            <div className="w-[40vw] h-[400px]">
              <ImageSlider imgArr={accommodation?.img} />
            </div>
            {accommodation && <Kakaomap data={accommodation} />}
          </div>
          <div className="w-innerWidth border-2 border-dovegray rounded-xl flex overflow-hidden">
            <div className="flex flex-col justify-center items-center grow-0">
              <label htmlFor="peopleCount">인원</label>
              <input
                type="number"
                id="peopleCount"
                className="w-8/12 text-center"
                value={peopleCount}
                onChange={(e) => {
                  setPeopleCount(e.target.value);
                }}
              />
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
          {accommodation && <AboutAccommondation data={accommodation} />}
          <span>
            {accommodation?.room.map((room) => (
              <Room
                key={room.roomId}
                buildingName={accommodation?.title}
                checkInTime={accommodation?.checkIn}
                checkOutTime={accommodation?.checkOut}
                room={room}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
                numPeople={peopleCount}
              />
            ))}
          </span>
        </>
      )}
    </section>
  );
}

export default AccommodationDetail;
