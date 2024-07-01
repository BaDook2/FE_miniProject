import { BookingFormInputs } from '@/app/booking/page';
import axios from 'axios';
import { Booking } from '@/app/bookingList/page';

const bookingAxios = (data: BookingFormInputs, bookings: Booking[]) => {
  const registerURL = '/api/booking';
  const updatedBookings = bookings.map((booking) => ({
    ...booking,
    name: data.name,
    phoneNumber: data.phoneNumber,
  }));
  axios.post(registerURL, JSON.stringify(updatedBookings), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default bookingAxios;
