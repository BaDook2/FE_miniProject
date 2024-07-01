import BASE_URL from '@/lib/constants';
import { axiosGet } from '@/lib/fetchURL';

interface cartCountResponse {
  cartCount: number;
}

const fetchCartCount = async (): Promise<number> => {
  const URL = `${BASE_URL}/api/cart/count`;
  const response = await axiosGet<cartCountResponse>(URL);

  if (response.data) {
    return response.data.cartCount;
  }
  return 0;
};

export default fetchCartCount;
