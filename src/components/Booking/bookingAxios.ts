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
  const updatedBooking = {
    guestName: inputData.guestName,
    guestTel: inputData.guestTel,
    roomId: bookings[0].roomId,
    numPeople: bookings[0].numPeople,
    checkInDate: formatDate(bookings[0].checkInDatetime),
    checkOutDate: formatDate(bookings[0].checkOutDatetime),
  };
  const dataToJson = JSON.stringify(updatedBooking);
  const { data, status, errorMessage } = await axiosPost<BookingResponse>(
    registerURL,
    dataToJson,
  );

  return { data, status, errorMessage };
};
const bookingCartPost = async (
  inputData: BookingFormInputs,
  bookings: Booking[],
) => {
  const cartIdList = bookings
    .filter((item) => item.cartId)
    .map((item) => item.cartId);
  const registerURL = `${BASE_URL}/api/booking/cart`;
  const updatedBookings = {
    cartIdList,
    guestName: inputData.guestName,
    guestTel: inputData.guestTel,
  };
  const dataToJson = JSON.stringify(updatedBookings);

  const { data, status, errorMessage } = await axiosPost<BookingResponse>(
    registerURL,
    dataToJson,
  );
  return { data, status, errorMessage };
};

export { bookingPost, bookingCartPost };
