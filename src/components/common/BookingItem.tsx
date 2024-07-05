import { Booking } from '@/app/bookingList/page';
import { Cart } from '@/app/cart/page';
import { formatPrice } from '@/lib/formatNumber';
import Image from 'next/image';
import React from 'react';
import ItemRow from './ItemRow';

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
    if (
      type === 'cart' &&
      'cartId' in booking &&
      'accommodationId' in booking &&
      onAccommodationTitleClick
    ) {
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
    <article key={getKey()} className="w-full bg-white p-5 rounded-md">
      <header>
        {(type === 'bookingResult' || type === 'bookingList') &&
          'orderId' in booking && (
            <p className="text-xs mb-2 text-dovegray">
              숙소 예약번호 {booking.orderId}
            </p>
          )}
        <div className="flex justify-between my-4">
          <h2
            role="none"
            className={`text-lg font-bold text-mineshaft ${type === 'cart' ? 'cursor-pointer' : ''}`}
            onClick={handleTitleClick}
          >
            {booking.accommodationTitle}
          </h2>
          {type === 'cart' &&
            'isBooking' in booking &&
            booking.isBooking === false && (
              <p className=" text-red-600">예약불가상품</p>
            )}
        </div>
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
          <figure className="relative min-w-20 h-20 mr-2 rounded-xl">
            <Image
              src={booking.roomImg}
              alt={booking.roomTitle}
              fill
              className="rounded-xl"
            />
          </figure>
        )}
        <article className="w-full flex flex-col gap-2">
          <ItemRow label="객실">
            <p
              className={`text-lg font-bold ${
                type === 'cart' &&
                'isBooking' in booking &&
                booking.isBooking === false
                  ? 'text-alto'
                  : ''
              }`}
            >
              {booking.roomTitle}
            </p>
          </ItemRow>
          <ItemRow label="일정">
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-sm text-dovegray">체크인</p>
              <p
                className={`text-xl font-bold ${
                  type === 'cart' &&
                  'isBooking' in booking &&
                  booking.isBooking === false
                    ? 'text-alto'
                    : ''
                }`}
              >{`${formatDate(checkInDate)} (${getDayOfWeek(checkInDate)})`}</p>
              <p className="text-sm text-dovegray">{formatTime(checkInDate)}</p>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-sm text-dovegray">체크아웃</p>
              <p
                className={`text-xl font-bold ${
                  type === 'cart' &&
                  'isBooking' in booking &&
                  booking.isBooking === false
                    ? 'text-alto'
                    : ''
                }`}
              >{`${formatDate(checkOutDate)} (${getDayOfWeek(checkOutDate)})`}</p>
              <p className="text-sm text-dovegray">
                {formatTime(checkOutDate)}
              </p>
            </div>
          </ItemRow>
          <ItemRow label="기준인원">
            <p className="text-sm text-dovegray">{`기준 ${booking.minPeople}명 / 최대 ${booking.maxPeople}명`}</p>
          </ItemRow>
          {(type === 'bookingResult' || type === 'bookingList') &&
            'guestName' in booking && (
              <ItemRow label="예약자정보">
                <p className="text-sm text-dovegray">{`${booking.guestName} / ${booking.guestTel}`}</p>
              </ItemRow>
            )}
        </article>
      </section>
      <footer className="flex justify-end items-center gap-2">
        <p className="text-lg text-dovegray">숙박 / {bookingDay}박</p>

        <p
          className={`text-lg font-bold ${
            type === 'cart' &&
            'isBooking' in booking &&
            booking.isBooking === false
              ? 'line-through text-alto'
              : 'text-mineshaft'
          }`}
        >
          {formatPrice(displayedPrice)}
        </p>
      </footer>
    </article>
  );
}

export default BookingItem;
