import axios, { AxiosResponse } from 'axios';

export interface FetchResponse<T> {
  data: T | null;
  errorCode: string | null;
  errorMessage: string | null;
}

const fetchURL = async <T>(
  axiosRequest: () => Promise<AxiosResponse<T>>,
): Promise<FetchResponse<T>> => {
  try {
    const response = await axiosRequest();
    console.log('response: ', response);
    return { data: response.data, errorCode: null, errorMessage: null };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log('err: ', err);
    if (err.response) {
      return {
        data: null,
        errorCode: err.response.data.statusCode,
        errorMessage: err.response.data.message,
      };
    }
    return {
      data: null,
      errorCode: 'Unknown Error Code',
      errorMessage: null,
    };
  }
};

const axiosPost = async <T>(
  url: string,
  data: string,
): Promise<FetchResponse<T>> => {
  const response = await fetchURL(() =>
    axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  );
  return response;
};

const axiosGet = async <T>(url: string): Promise<FetchResponse<T>> => {
  const response = await fetchURL(() => axios.get(url));
  return response;
};

export { axiosPost, axiosGet };
