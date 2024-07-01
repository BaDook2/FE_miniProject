import BASE_URL from '@/lib/constants';
import { axiosPost } from '@/lib/fetchURL';
import { ISignUp } from '../../app/(auth)/signup/page';

const requireAccessKey = async (email: string) => {
  const accessKeyURL = `${BASE_URL}/api/register/email`;
  const dataToJson = JSON.stringify({ email });
  const { error } = await axiosPost(accessKeyURL, dataToJson);
  return error;
};

const checkAccessKey = async (email: string, accessKey: string) => {
  const dataToJson = JSON.stringify({ email, accessKey });
  const checkAccessKeyURL = `${BASE_URL}/api/register/email/successKey`;
  const { error } = await axiosPost(checkAccessKeyURL, dataToJson);
  return error;
};

const signUp = async (data: ISignUp) => {
  const registerURL = `${BASE_URL}/api/register`;
  const dataToJson = JSON.stringify({
    email: data.email,
    password: data.password,
    name: data.name,
    accessKey: data.accessKey,
  });
  const { error } = await axiosPost(registerURL, dataToJson);
  return error;
};

export { requireAccessKey, checkAccessKey, signUp };
