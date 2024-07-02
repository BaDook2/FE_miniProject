import BASE_URL from '@/lib/constants';
import { axiosPost } from '@/lib/fetchURL';
import { ICartAdd } from './CartAddButton';

const cartAdd = async ({
  roomId,
  people,
  checkInDate,
  checkOutDate,
}: ICartAdd) => {
  const cartAddURL = `${BASE_URL}/api/cart`;
  const dataToString = JSON.stringify({
    roomId,
    people,
    checkInDate,
    checkOutDate,
  });
  console.log('dataToString: ', dataToString);

  const { data, errorMessage } = await axiosPost(cartAddURL, dataToString);
  return { data, errorMessage };
};

export default cartAdd;
