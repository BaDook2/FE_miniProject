// useSearchParams.ts
import { useSearchParams } from 'next/navigation';
import { Booking } from '@/app/bookingList/page';

const useBookingsFromQuery = (): Booking[] => {
  const searchParams = useSearchParams();
  const bookingsParam = searchParams.get('items');

  if (!bookingsParam) return [];

  try {
    const bookings = JSON.parse(bookingsParam);
    return Array.isArray(bookings) ? bookings : [];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to parse bookings:', error);
    return [];
  }
};

export default useBookingsFromQuery;
