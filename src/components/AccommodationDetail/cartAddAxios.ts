import BASE_URL from '@/lib/constants';
import { fetchPost } from '@/lib/fetchURL';
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

  const { data, errorMessage } = await fetchPost(cartAddURL, dataToString);
  return { data, errorMessage };
};

export default cartAdd;
