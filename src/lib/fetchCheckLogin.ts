import BASE_URL from './constants';
import { axiosGet } from './fetchURL';

const fetchCheckLogin = async () => {
  const URL = `${BASE_URL}/api/check`;
  const { status } = await axiosGet<number>(URL);
  if (status === 200) {
    return true;
  }
  return false;
};

export default fetchCheckLogin;
