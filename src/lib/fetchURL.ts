export interface FetchResponse<T> {
  data: T | null;
  errorMessage: string | null;
  status?: number | null;
}

const fetchURL = async <T>(
  fetchRequest: () => Promise<Response>,
): Promise<FetchResponse<T>> => {
  try {
    const response = await fetchRequest();
    const data = await response.json();
    console.log('response: ', response);
    console.log('data: ', data);
    return { data, errorMessage: null, status: response.status };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log('err: ', err);
    if (err.message) {
      return {
        data: null,
        errorMessage: err.message,
        status: err.status,
      };
    }
    // eslint-disable-next-line no-console
    console.log('err: ', err);
    return {
      data: null,
      errorMessage: 'Unknown Error',
      status: err.status,
    };
  }
};

const fetchPost = async <T>(
  url: string,
  data: string,
): Promise<FetchResponse<T>> => {
  const response = await fetchURL<T>(() =>
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: data,
    }),
  );
  return response;
};

const fetchGet = async <T>(url: string): Promise<FetchResponse<T>> => {
  const response = await fetchURL<T>(() =>
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }),
  );
  return response;
};

export { fetchPost, fetchGet };
