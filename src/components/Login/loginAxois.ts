import BASE_URL from '@/lib/constants';
import axios from 'axios';

const login = (email: string, password: string) => {
  const loginURL = `${BASE_URL}/api/login`;
  const dataToJson = JSON.stringify({
    email,
    password,
  });
  try {
    axios.post(loginURL, dataToJson, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return null;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return err.response.data.message;
    }
    return 'An Known login Error';
  }
};

export default login;
