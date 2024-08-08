import BASE_URL from '@/lib/constants';
import { axiosPost } from '@/lib/fetchURL';
import { ISignUp } from '../../app/(auth)/signup/page';

const requireAccessKey = async (email: string) => {
  const accessKeyURL = `${BASE_URL}/api/register/email`;
  const dataToJson = JSON.stringify({ email });
  const { errorMessage } = await axiosPost(accessKeyURL, dataToJson);
  return errorMessage;
};

const checkAccessKey = async (email: string, accessKey: string) => {
  const dataToJson = JSON.stringify({ email, accessKey });
  const checkAccessKeyURL = `${BASE_URL}/api/register/email/successKey`;
  const { errorMessage } = await axiosPost(checkAccessKeyURL, dataToJson);
  return errorMessage;
};

const signUp = async (data: ISignUp) => {
  const registerURL = `${BASE_URL}/api/register`;
  const dataToJson = JSON.stringify({
    email: data.email,
    password: data.confirmPassword,
    name: data.name,
    accessKey: data.accessKey,
  });
  const { errorMessage } = await axiosPost(registerURL, dataToJson);
  return errorMessage;
};

export { requireAccessKey, checkAccessKey, signUp };
