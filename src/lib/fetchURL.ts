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
    return { data, errorMessage: null, status: response.status };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.response.data) {
      return {
        data: null,
        errorMessage: err.response.data.message,
        status: err.response.data.status,
      };
    }
    // eslint-disable-next-line no-console
    console.log('err: ', err);
    return {
      data: null,
      errorMessage: 'Unknown Error',
      status: err.response.status,
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
    }),
  );
  return response;
};

export { fetchPost, fetchGet };
