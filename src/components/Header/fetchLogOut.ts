import BASE_URL from '@/lib/constants';
import { axiosGet } from '@/lib/fetchURL';

const fetchLogOut = async () => {
  const URL = `${BASE_URL}/api/logout`;
  const { status } = await axiosGet(URL);
  if (status === 200) {
    return true;
  }
  return false;
};

export default fetchLogOut;
