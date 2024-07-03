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
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Unknown error occurred');
    }

    const data = (await response.json()) as T;
    return {
      data,
      errorMessage: null,
      status: response.status,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return {
      data: null,
      errorMessage: err.message || 'Unknown Error',
      status: err.status || null,
    };
  }
};

const fetchPost = async <T>(
  url: string,
  data: string,
): Promise<FetchResponse<T>> => {
  return fetchURL<T>(() =>
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: data,
    }),
  );
};

const fetchGet = async <T>(url: string): Promise<FetchResponse<T>> => {
  return fetchURL<T>(() =>
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }),
  );
};

export { fetchPost, fetchGet };
