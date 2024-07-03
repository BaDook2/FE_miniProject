import BASE_URL from '@/lib/constants';
import { fetchPost } from '@/lib/fetchURL';

const login = async (email: string, password: string) => {
  const loginURL = `${BASE_URL}/api/login`;
  const dataToJson = JSON.stringify({
    email,
    password,
  });
  const { errorMessage } = await fetchPost<string>(loginURL, dataToJson);
  return errorMessage;
};

export default login;
