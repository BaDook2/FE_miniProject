import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { formatNumber } from '@/lib/formatNumber';
import BASE_URL from '@/lib/constants';
import { axiosGet } from '@/lib/fetchURL';
import Loading from '../common/Loading';

interface Accommodation {
  id: number;
  title: string;
  minPrice: number;
  region: string;
  thumbnailUrl: string;
}

interface AccommodationData {
  nextData: boolean;
  nextCursorId: number;
  nextCursorMinPrice: number;
  accommodationSimpleResponseList: Accommodation[];
}

interface AccommodationListProps {
  category: string;
}

axios.defaults.withCredentials = true;

const AccommodationList = ({ category }: AccommodationListProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const [isRestoring, setIsRestoring] = useState(true);
  const [selectedMinPrice, setSelectedMinPrice] = useState<number>(0);
  const [isImgError, setIsImgError] = useState<boolean>(false);

  // Axios get
  const fetchProjects = async ({
    pageParam,
    fetchedCategory,
  }: {
    pageParam: { minPrice: number; id: number };
    fetchedCategory: string;
  }) => {
    const { minPrice, id } = pageParam;

    let queryString = `category=${fetchedCategory}&size=12`;
    if (minPrice) {
      queryString += `&cursorMinPrice=${minPrice}`;
    }
    if (id) {
      queryString += `&cursorId=${id}`;
    }

    const url = `${BASE_URL}/api/accommodation?${queryString}`;
    const res = await axiosGet<AccommodationData>(url);

    return res.data;
  };

  // 뒤로가기, sesstionStorage에 저장한 목록, option 불러오기
  useEffect(() => {
    const state = sessionStorage.getItem(`accommodationsState-${category}`);
    const savedMinPrice = sessionStorage.getItem(
      `selectedMinPrice-${category}`,
    );
    if (state) {
      const { data } = JSON.parse(state);
      queryClient.setQueryData(
        ['accommodations', category, selectedMinPrice],
        data,
      );
    }
    if (savedMinPrice) {
      setSelectedMinPrice(Number(savedMinPrice));
      sessionStorage.removeItem(`selectedMinPrice-${category}`);
    }
  }, [category, queryClient, selectedMinPrice]);

  // InfiniteQuery - InfiniteScroll
  const { data, fetchNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['accommodations', category, selectedMinPrice],
      queryFn: ({ pageParam = { minPrice: selectedMinPrice, id: 0 } }) =>
        fetchProjects({ pageParam, fetchedCategory: category }),
      getNextPageParam: (lastPage) => {
        if (!lastPage?.nextData) {
          return undefined;
        }
        const { nextCursorId: id, nextCursorMinPrice: minPrice } = lastPage;
        return { minPrice, id };
      },
      initialPageParam: { minPrice: selectedMinPrice, id: 0 },
    });

  // 옵저버
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && fetchNextPage(),
      { threshold: 0 },
    );
    const target = bottomRef.current;
    if (target) observer.observe(target);
    return () => observer.disconnect();
  }, [fetchNextPage]);

  // 뒤로가기, scroll 이동
  useEffect(() => {
    if (isRestoring && !isLoading) {
      const scrollPosition = Number(
        sessionStorage.getItem(`scrollPosition-${category}`),
      );
      if (scrollPosition) {
        window.scrollTo(0, scrollPosition);
        sessionStorage.removeItem(`scrollPosition-${category}`);
        sessionStorage.removeItem(`accommodationsState-${category}`);
      }
      setIsRestoring(false);
    }
  }, [isRestoring, isLoading, category]);

  const options = [
    { value: '0', name: '최저가' },
    { value: '50000', name: '50000 ~' },
    { value: '80000', name: '80000 ~' },
    { value: '100000', name: '100000 ~' },
  ];

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const optionValue = Number(e.target.value);
    setSelectedMinPrice(optionValue);
  };

  return (
    <section className="mt-16">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-left text-2xl font-bold">추천 숙소</h2>
        <select
          value={selectedMinPrice}
          onChange={handlePriceChange}
          className="w-28 h-10 text-center text-sm border-2 rounded-lg"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-4 gap-8">
        {data?.pages.map((page) =>
          page?.accommodationSimpleResponseList.map((item: Accommodation) => (
            <div
              key={item.id}
              className="border rounded-lg shadow-md flex flex-col justify-between"
            >
              <div className="bg-concrete w-full h-64 relative">
                <Image
                  src={
                    isImgError ? '../../../public/logo.png' : item.thumbnailUrl
                  }
                  alt="image"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg bg-cover"
                  sizes="50vw"
                  onError={() => setIsImgError(true)}
                />
              </div>
              <div className="p-4">
                <div className="text-lg font-semibold mb-1">{item.title}</div>
                <div className="text-xs mb-1">{item.region}</div>
                <div className="text-gray-500 mt-2 text-right">
                  <span className="text-xs mr-2">최저가</span>
                  <span className="font-bold">
                    {formatNumber(item.minPrice)}
                  </span>
                  원 ~
                </div>
                <Link
                  href={`/accommodation/${item.id}`}
                  className="my-3 block w-full py-2 bg-primary text-white text-center rounded-md hover:bg-[#db1a40] transition-all"
                  onClick={() => {
                    sessionStorage.setItem(
                      `scrollPosition-${category}`,
                      window.scrollY.toString(),
                    );
                    const state = {
                      data: queryClient.getQueryData([
                        'accommodations',
                        category,
                        selectedMinPrice,
                      ]),
                    };
                    sessionStorage.setItem(
                      `accommodationsState-${category}`,
                      JSON.stringify(state),
                    );
                    sessionStorage.setItem(
                      `selectedMinPrice-${category}`,
                      String(selectedMinPrice),
                    );
                  }}
                >
                  요금 확인
                </Link>
              </div>
            </div>
          )),
        )}
        <div ref={bottomRef} />
      </div>
      {isFetchingNextPage && (
        <div className="flex justify-center items-center h-16">
          <Loading />
        </div>
      )}
    </section>
  );
};

export default AccommodationList;
