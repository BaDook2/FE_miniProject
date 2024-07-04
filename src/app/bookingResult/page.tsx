'use client';

import BookingItem from '@/components/common/BookingItem';
import useBookingsFromQuery from '@/hooks/useSearchParams';
import React from 'react';

function BookingResult() {
  const bookings = useBookingsFromQuery();
  return (
    <div className="w-full mx-auto">
      <header className="w-full py-10 bg-white">
        <p className="text-center text-2xl">숙소 예약이 완료되었습니다.</p>
      </header>
      <section className="w-innerWidth">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <BookingItem
              type="bookingResult"
              key={booking.roomId}
              booking={booking}
            />
          ))
        ) : (
          <p>-</p>
        )}
      </section>
    </div>
  );
}

export default BookingResult;
