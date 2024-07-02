import axios, { AxiosResponse } from 'axios';

export interface FetchResponse<T> {
  data: T | null;
  error: string | null;
}

const fetchURL = async <T>(
  axiosRequest: () => Promise<AxiosResponse<T>>,
): Promise<FetchResponse<T>> => {
  try {
    const response = await axiosRequest();
    return { data: response.data, error: null };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.response) {
      return { data: null, error: err.response.data.message };
    }
    return { data: null, error: 'Unknown Error' };
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
