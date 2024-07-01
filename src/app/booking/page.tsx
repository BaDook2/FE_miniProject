'use client';

import BackButton from '@/components/common/BackButton';
import useBookingsFromQuery from '@/hooks/useSearchParams';
import BookingItem from '@/components/common/BookingItem';
import BookingForm from '@/components/Booking/BookingForm';

export interface BookingFormInputs {
  name: string;
  phoneNumber: number;
  roomId: number;
  numPeople: number;
  checkInDate: string;
  checkOutDate: string;
}
function BookingPage() {
  const bookings = useBookingsFromQuery();
  return (
    <div className="w-innerWidth m-auto">
      <header className="relative my-8 flex justify-center">
        <div className="absolute left-0">
          <BackButton />
        </div>
        <h1 className="text-2xl font-bold">예약</h1>
      </header>
      <section className="flex flex-col gap-4 my-4">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <BookingItem key={booking.roomId} booking={booking} />
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </section>
      <BookingForm />
    </div>
  );
}

export default BookingPage;
