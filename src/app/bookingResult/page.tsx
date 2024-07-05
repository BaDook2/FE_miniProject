'use client';

import BookingItem from '@/components/common/BookingItem';
import Button from '@/components/common/Button';
import useBookingsFromQuery from '@/hooks/useSearchParams';
import React from 'react';
import { MdAssignmentTurnedIn } from 'react-icons/md';

function BookingResult() {
  const bookings = useBookingsFromQuery();
  return (
    <div className="w-full mx-auto flex flex-col items-center gap-20 pb-20">
      <header className="w-full pt-20 flex flex-col items-center gap-10">
        <MdAssignmentTurnedIn size={100} className="text-primary" />
        <p className="text-center text-3xl">
          <span className="font-bold">숙소 예약</span>이 정상적으로{' '}
          <span className="font-bold">접수</span>
          되었습니다. 감사합니다.
        </p>
      </header>
      <section className="">
        <Button href="/" label="홈으로 가기" />
        <Button href="/bookingList" label="예약내역 확인" />
      </section>
      <section className="w-innerWidth flex flex-col gap-4">
        {bookings.length > 0 &&
          bookings.map((booking) => (
            <BookingItem
              type="bookingResult"
              key={booking.roomId}
              booking={booking}
            />
          ))}
      </section>
    </div>
  );
}

export default BookingResult;
