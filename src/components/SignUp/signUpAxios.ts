import axios from 'axios';
import BASE_URL from '@/lib/constants';
import { ISignUp } from '../../app/(auth)/signup/page';

const requireAccessKey = (email: string) => {
  const accessKeyURL = `${BASE_URL}/api/register/email`;
  const dataToJson = JSON.stringify({ email });
  try {
    axios.post(accessKeyURL, dataToJson, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return null;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return err.response.data.message;
    }
    return 'An Known requireAccessKey Error';
  }
};

const checkAccessKey = (email: string, accessKey: string) => {
  const dataToJson = JSON.stringify({ email, accessKey });
  const checkAccessKeyURL = `${BASE_URL}/api/register/email/successKey`;
  try {
    axios.post(checkAccessKeyURL, dataToJson, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return null;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return err.response.data.message;
    }
    return 'An Known checkAccessKey Error';
  }
};

const signUp = (data: ISignUp) => {
  const registerURL = `${BASE_URL}/api/register`;
  const dataToJson = JSON.stringify({
    email: data.email,
    password: data.password,
    name: data.name,
    accessKey: data.accessKey,
  });
  try {
    axios.post(registerURL, dataToJson, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return null;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return err.response.data.message;
    }
    return 'An Known signUp Error';
  }
};

// const checkError = (URL: string, data: any) => {
//   const dataToJSON = JSON.stringify(data);
//   try {
//     axios.post(URL, data, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     return null;
//   } catch (err) {
//     if (axios.isAxiosError(err) && err.response) {
//       return err.response.data.message;
//     }
//     return `Unknown ${URL} error`;
//   }
// };

export { requireAccessKey, checkAccessKey, signUp };
