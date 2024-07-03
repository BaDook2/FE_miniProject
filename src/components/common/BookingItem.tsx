import { Booking } from '@/app/bookingList/page';
import { Cart } from '@/app/cart/page';
import { formatPrice } from '@/lib/formatNumber';
import Image from 'next/image';
import React from 'react';

interface BookingItemProps {
  type: string;
  booking: Booking | Cart;
  isCheck?: boolean;
  onCheckItem?: (roomId: number) => void;
  onAccommodationTitleClick?: (accommodationId: number) => void;
}

function BookingItem({
  type,
  booking,
  isCheck,
  onCheckItem,
  onAccommodationTitleClick,
}: BookingItemProps) {
  const checkInDate = new Date(booking.checkInDatetime);
  const checkOutDate = new Date(booking.checkOutDatetime);

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  const formatTime = (date: Date) => {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const formattedCheckInDate = formatDate(checkInDate);
  const formattedCheckOutDate = formatDate(checkOutDate);

  const dayDifference = (date1: string, date2: string) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const timeDiff = Math.abs(d2.getTime() - d1.getTime());
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };
  const bookingDay = dayDifference(formattedCheckInDate, formattedCheckOutDate);
  const getDayOfWeek = (date: Date) => {
    const week = ['일', '월', '화', '수', '목', '금', '토'];

    const dayOfWeek = week[new Date(date).getDay()];

    return dayOfWeek;
  };

  const handleTitleClick = () => {
    if (type === 'cart' && 'cartId' in booking && onAccommodationTitleClick) {
      onAccommodationTitleClick(booking.accommodationId);
    }
  };

  const getKey = () => {
    if (type.includes('booking')) {
      if ('orderId' in booking) {
        return booking.orderId;
      }
    } else if (type === 'cart') {
      if ('cartId' in booking) {
        return booking.cartId;
      }
    }
    return booking.roomId;
  };

  const displayedPrice = booking.totalPrice ?? 0;
  return (
    <article key={getKey()} className="w-full bg-white p-5">
      <header>
        {(type === 'bookingResult' || type === 'bookingList') &&
          'orderId' in booking && (
            <p className="text-xs mb-2 text-dovegray">
              숙소 예약번호 {booking.orderId}
            </p>
          )}
        <h2
          role="none"
          className={`text-lg font-bold text-mineshaft ${type === 'cart' ? 'cursor-pointer' : ''}`}
          onClick={handleTitleClick}
        >
          {booking.accommodationTitle}
        </h2>
        <hr className="border-gray-300 my-2 text-mineshaft" />
        <p className="text-lg mb-2 font-bold">{booking.roomTitle}</p>
      </header>
      <section className="flex w-full">
        {type === 'cart' && 'cartId' in booking && (
          <input
            type="checkbox"
            className="custom-checkbox mr-4 mt-1"
            checked={isCheck}
            onChange={() => onCheckItem && onCheckItem(booking.cartId)}
          />
        )}
        {booking.roomImg && (
          <figure className="relative w-20 h-20 mr-2 rounded-xl">
            <Image
              src={booking.roomImg}
              alt={booking.roomTitle}
              fill
              className="rounded-xl"
            />
          </figure>
        )}
        <article className="w-full flex flex-col gap-2">
          <div className="w-full flex">
            <div className="w-1/2 flex flex-col gap-1">
              <p className="text-sm text-dovegray">체크인</p>
              <p className="text-xl font-bold">{`${formatDate(checkInDate)} (${getDayOfWeek(checkInDate)})`}</p>
              <p className="text-sm text-dovegray">{formatTime(checkInDate)}</p>
            </div>
            <div className="w-1/2 flex flex-col gap-1">
              <p className="text-sm text-dovegray">체크아웃</p>
              <p className="text-xl font-bold">{`${formatDate(checkOutDate)} (${getDayOfWeek(checkOutDate)})`}</p>
              <p className="text-sm text-dovegray">
                {formatTime(checkOutDate)}
              </p>
            </div>
          </div>
          <p className="text-xs mb-2 text-dovegray">{`기준 ${booking.minPeople}명 / 최대 ${booking.maxPeople}명`}</p>
          {(type === 'bookingResult' || type === 'bookingList') &&
            'name' in booking && (
              <p className="text-end text-xs mb-2 text-dovegray">{`${booking.name} / ${booking.phoneNumber}`}</p>
            )}
        </article>
      </section>
      <footer className="flex justify-end items-center gap-2">
        <p className="text-lg text-dovegray">숙박 / {bookingDay}박</p>

        <p className="text-lg font-bold text-mineshaft">
          {formatPrice(displayedPrice)}
        </p>
      </footer>
    </article>
  );
}

export default BookingItem;
