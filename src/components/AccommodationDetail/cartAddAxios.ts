import BASE_URL from '@/lib/constants';
import axios from 'axios';
import { ICartAdd } from './CartAddButton';

const cartAdd = async ({ roomId, checkInDate, checkOutDate }: ICartAdd) => {
  const cartAddURL = `${BASE_URL}/api/cart`;
  const dataToJson = JSON.stringify({
    roomId,
    checkInDate,
    checkOutDate,
  });
  try {
    await axios.post(cartAddURL, dataToJson, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.response) {
      return err.response.data.message;
    }
    return 'Unknown Cart Add Error';
  }
};

export default cartAdd;
