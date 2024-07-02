import { BookingFormInputs } from '@/app/booking/page';
import axios from 'axios';
import { Booking } from '@/app/bookingList/page';

axios.defaults.withCredentials = true;

const bookingAxios = (data: BookingFormInputs, bookings: Booking[]) => {
  const registerURL = '/api/booking';
  const formatDate = (date: Date) => {
    const parsedDate = new Date(date);
    return `${parsedDate.getFullYear()}-${(parsedDate.getMonth() + 1).toString().padStart(2, '0')}-${parsedDate.getDate().toString().padStart(2, '0')}`;
  };
  const updatedBookings = bookings.map((booking) => ({
    name: data.name,
    phoneNumber: data.phoneNumber,
    roomId: booking.roomId,
    numPeople: booking.numPeople,
    checkInDate: formatDate(booking.checkInDatetime),
    checkOutDate: formatDate(booking.checkInDatetime),
  }));
  axios.post(registerURL, JSON.stringify(updatedBookings), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default bookingAxios;
