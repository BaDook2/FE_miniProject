'use client';

import accommodationDataFetch from '@/components/AccommodationDetail/accommodationDataAxios';
import { useCallback, useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import AboutAccommondation from '@/components/AccommodationDetail/AboutAccommondation';
import Room from '@/components/AccommodationDetail/Room';
import ImageSlider from '@/components/AccommodationDetail/ImageSlider';
import Kakaomap from '@/components/AccommodationDetail/KakaoMap';
import exportDate from '@/components/common/exportDate';

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
  const { todayToDate, tommorrowToDate } = exportDate();
  const [accommodation, setAccommodation] = useState<IAccommodation | null>();
  const [peopleCount, setPeopleCount] = useState<string>('1');
  const [checkInDate, setCheckInDate] = useState<string>(todayToDate);
  const [checkOutDate, setCheckOutDate] = useState<string>(tommorrowToDate);
  const [isVaildPeriod, setIsVaildPeriod] = useState(true);
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

  useEffect(() => {
    const check = new Date(checkInDate) <= new Date(checkOutDate);
    setIsVaildPeriod(check);
  }, [checkInDate, checkOutDate]);

  return (
    <section className="w-innerWidth mx-auto">
      {err ? (
        <div className="w-full text-primary text-4xl flex items-center justify-center h-36">
          {err}
        </div>
      ) : (
        <>
          <div className="w-innerWidth flex gap-3 my-3">
            {accommodation && (
              <>
                <div className="w-3/5 h-[400px] rounded-xl overflow-hidden">
                  <ImageSlider imgArr={accommodation.img} />
                </div>
                <div className="w-2/5 h-[400px] rounded-xl">
                  <Kakaomap data={accommodation} />
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
                  setPeopleCount(e.target.value);
                }}
              >
                {[...Array(10)].map((_, i) => (
                  <option className="absolute left-7" value={`${i + 1}`}>
                    {i + 1}
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
          {accommodation && <AboutAccommondation data={accommodation} />}
          <span>
            {accommodation?.room
              .filter((room) => room.maxPeople >= +peopleCount)
              .map((room) => (
                <Room
                  key={room.roomId}
                  buildingName={accommodation?.title}
                  checkInTime={accommodation?.checkIn}
                  checkOutTime={accommodation?.checkOut}
                  room={room}
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  numPeople={peopleCount}
                  isVaildPeriod={isVaildPeriod}
                />
              ))}
          </span>
        </>
      )}
    </section>
  );
}

export default AccommodationDetail;
