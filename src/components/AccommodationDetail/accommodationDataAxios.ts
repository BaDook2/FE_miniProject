import { IAccommodation } from '@/app/(main)/[id]/page';
import BASE_URL from '@/lib/constants';
import { FetchResponse, axiosGet } from '@/lib/fetchURL';

interface INeedData {
  params: { id: string };
  checkInDate: string;
  checkOutDate: string;
}

const accommodationDataFetch = async ({
  params,
  checkInDate,
  checkOutDate,
}: INeedData): Promise<FetchResponse<IAccommodation>> => {
  const URL = `${BASE_URL}/api/accommodation/${params.id}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;
  // const URL = `/api/accommodation`;
  const { data, error } = await axiosGet<IAccommodation>(URL);
  return { data, error };
};

export default accommodationDataFetch;
