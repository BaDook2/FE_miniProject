import BASE_URL from '@/lib/constants';
import axios from 'axios';

interface IResponse {
  cartCount: number;
}

const fetchCartCount = async (): Promise<number> => {
  const URL = `${BASE_URL}/api/cart/count`;
  const res = await axios.get<IResponse>(URL);
  return res.data.cartCount;
};

export default fetchCartCount;
