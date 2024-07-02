import BASE_URL from '@/lib/constants';
import { axiosPost } from '@/lib/fetchURL';
import { ICartAdd } from './CartAddButton';

const cartAdd = async ({ roomId, checkInDate, checkOutDate }: ICartAdd) => {
  const cartAddURL = `${BASE_URL}/api/cart`;
  const dataToString = JSON.stringify({
    roomId,
    checkInDate,
    checkOutDate,
  });

  const { data, error } = await axiosPost(cartAddURL, dataToString);
  return { data, error };
};
// delete this senetence

export default cartAdd;
