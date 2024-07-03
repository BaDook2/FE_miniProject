import axios, { AxiosResponse } from 'axios';

axios.defaults.withCredentials = true;

export interface FetchResponse<T> {
  data: T | null;
  errorMessage: string | null;
  status?: number | null;
}

const fetchURL = async <T>(
  axiosRequest: () => Promise<AxiosResponse<T>>,
): Promise<FetchResponse<T>> => {
  try {
    const response = await axiosRequest();
    return { data: response.data, errorMessage: null, status: response.status };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.response.data) {
      return {
        data: null,
        errorMessage: err.response.data.message,
        status: err.response.data.status,
      };
    }
    return {
      data: null,
      errorMessage: 'Unknown Error',
      status: err.response.status,
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
  const response = await fetchURL(() =>
    axios.get(url, { withCredentials: true }),
  );
  return response;
};

export { axiosPost, axiosGet };
