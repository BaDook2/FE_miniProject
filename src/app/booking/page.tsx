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

// http://localhost:3000/booking?items=[{%22accommodationTitle%22:%22%EB%9D%BC%EB%A7%88%EB%8B%A4%22,%22roomTitle%22:%22%EA%B0%9D%EC%8B%A4%EC%9D%B4%EB%A6%84%22,%22roomPrice%22:%2212000%22,%22numPeople%22:%22123%22,%22minPeople%22:%222%22,%22maxPeople%22:%226%22,%22checkInDatetime%22:%222024-07-01%2008:00:00%22,%22checkOutDatetime%22:%222024-07-03%2016:00:00%22},{%22accommodationTitle%22:%22%EB%A1%AF%EB%8D%B0%EC%8B%9C%ED%8B%B0%ED%98%B8%ED%85%94%22,%22roomTitle%22:%22%EA%B0%9D%EC%8B%A4%EC%9D%B4%EB%A6%84%22,%22roomPrice%22:%2212000%22,%22numPeople%22:%22123%22,%22minPeople%22:%222%22,%22maxPeople%22:%226%22,%22checkInDatetime%22:%222024-06-04%2016:00:00%22,%22checkOutDatetime%22:%222024-06-05%2016:00:00%22}]
