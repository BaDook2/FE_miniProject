// useSearchParams.ts
import { useSearchParams } from 'next/navigation';
import { Booking } from '@/app/bookingList/page';

const correctJsonFormat = (str: string) => {
  // 속성 이름과 문자열 값을 큰따옴표로 감싸기
  const regex = /([a-zA-Z0-9_]+):([^,}\]]+)/g;
  return str.replace(regex, '"$1":"$2"');
};
const useBookingsFromQuery = (): Booking[] => {
  const searchParams = useSearchParams();
  const bookingsParam = searchParams.get('items');

  if (!bookingsParam) return [];

  try {
    const correctedParam = correctJsonFormat(bookingsParam);
    const bookings = JSON.parse(correctedParam);
    return Array.isArray(bookings) ? bookings : [];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to parse bookings:', error);
    return [];
  }
};

export default useBookingsFromQuery;
