import { BookingFormInputs } from '@/app/booking/page';
import axios from 'axios';
import BASE_URL from '@/lib/constants';
import { axiosPost } from '@/lib/fetchURL';

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
  cartId?: number;
}
interface BookingResponse {
  items: Booking[];
}
axios.defaults.withCredentials = true;

const bookingPost = async (
  inputData: BookingFormInputs,
  bookings: Booking[],
) => {
  const registerURL = `${BASE_URL}/api/booking`;
  const formatDate = (date: Date) => {
    const parsedDate = new Date(date);
    return `${parsedDate.getFullYear()}-${(parsedDate.getMonth() + 1).toString().padStart(2, '0')}-${parsedDate.getDate().toString().padStart(2, '0')}`;
  };
  const updatedBookings = bookings.map((booking) => ({
    guestName: inputData.guestName,
    guestTel: inputData.guestTel,
    roomId: booking.roomId,
    numPeople: booking.numPeople,
    checkInDate: formatDate(booking.checkInDatetime),
    checkOutDate: formatDate(booking.checkOutDatetime),
  }));
  const dataToJson = JSON.stringify(updatedBookings);
  const { data, status } = await axiosPost<BookingResponse>(
    registerURL,
    dataToJson,
  );
  return { data, status };
};
const bookingCartPost = async (
  inputData: BookingFormInputs,
  bookings: Booking[],
) => {
  const cartList = bookings
    .filter((item) => item.cartId)
    .map((item) => item.cartId);
  const registerURL = `${BASE_URL}/api/booking/cart`;
  const updatedBookings = {
    cartList,
    guestName: inputData.guestName,
    guestTel: inputData.guestTel,
  };
  const dataToJson = JSON.stringify(updatedBookings);
  const { data, status } = await axiosPost<BookingResponse>(
    registerURL,
    dataToJson,
  );
  return { data, status };
};

export { bookingPost, bookingCartPost };
