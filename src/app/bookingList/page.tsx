'use client';

import { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import BookingItem from '@/components/common/BookingItem';
import Pagination from '@/components/common/Pagination';
import Loading from '@/components/common/Loading';
import BackButton from '@/components/common/BackButton';
import Empty from '@/components/common/Empty';
import BASE_URL from '@/lib/constants';

export interface Booking {
  guestName?: string;
  guestTel?: number;
  orderId?: string;
  roomId?: string;
  roomImg?: string;
  accommodationTitle: string;
  roomTitle: string;
  minPeople: number;
  maxPeople: number;
  numPeople: number;
  checkInDatetime: Date;
  checkOutDatetime: Date;
  totalPrice: number;
  cartId: number;
}
interface BookingListResponse {
  bookingList: Booking[];
  totalElements: number;
}

axios.defaults.withCredentials = true;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function BookingsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const { data, error } = useSWR<BookingListResponse>(
    `${BASE_URL}/api/booking?page=${currentPage}&size=${pageSize}`,
    fetcher,
  );

  if (error)
    return <Empty message="예약 내역을 불러오는 도중 오류가 발생했습니다." />;
  if (!data) return <Loading />;
  if (data.bookingList.length === 0)
    return <Empty message="예약 내역이 없습니다." />;

  const totalPages = Math.ceil(data.totalElements / pageSize);
  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className="w-innerWidth m-auto">
      <header className="relative my-8 flex justify-center">
        <div className="absolute left-0">
          <BackButton />
        </div>
        <h1 className="text-2xl font-bold">예약내역 확인</h1>
      </header>
      <main className="flex flex-col items-center">
        <section className="w-full flex flex-col gap-4">
          {data.bookingList.map((booking) => (
            <BookingItem
              type="bookingList"
              key={booking.orderId}
              booking={booking}
            />
          ))}
        </section>
        {totalPages !== 1 && (
          <nav className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onNext={handleNextPage}
              onPrevious={handlePreviousPage}
              onPageChange={handlePageChange}
            />
          </nav>
        )}
      </main>
    </div>
  );
}

export default BookingsPage;
