import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { formatNumber } from '@/lib/formatNumber';
import BASE_URL from '@/lib/constants';
import Loading from '../common/Loading';

interface Accommodation {
  id: number;
  title: string;
  minPrice: number;
  region: string;
  thumbnailUrl: string;
}

interface AccommodationListProps {
  category: string;
}

axios.defaults.withCredentials = true;
const url = `${BASE_URL}/api/accommodation`;

// Axios get
const fetchProjects = async ({
  pageParam = { minPrice: '', id: '' },
  fetchedCategory,
}: {
  pageParam: { minPrice: string; id: string };
  fetchedCategory: string;
}) => {
  const { minPrice, id } = pageParam;
  const res = await axios.get(url, {
    params: {
      category: fetchedCategory,
      size: 12,
      ...(minPrice && { cursorMinPrice: minPrice }),
      ...(id && { cursorId: id }),
    },
  });

  return res.data;
};

const AccommodationList = ({ category }: AccommodationListProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const [isRestoring, setIsRestoring] = useState(true);

  // 뒤로가기, sesstionStorage에 저장한 목록 불러오기

  useEffect(() => {
    const state = sessionStorage.getItem(`accommodationsState-${category}`);
    if (state) {
      const { data } = JSON.parse(state);
      queryClient.setQueryData(['accommodations', category], data);
    }
  }, [category, queryClient]);

  // InfiniteQuery - InfiniteScroll
  const { data, fetchNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['accommodations', category],
      queryFn: ({ pageParam }) =>
        fetchProjects({ pageParam, fetchedCategory: category }),
      getNextPageParam: (lastPage) => {
        const { nextCursorId: id, nextCursorMinPrice: minPrice } = lastPage;
        return lastPage.nextData ? { minPrice, id } : undefined;
      },
      initialPageParam: { minPrice: '', id: '' },
    });

  // 옵저버
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && fetchNextPage(),
      { threshold: 1.0 },
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

  return (
    <section className="mt-16">
      <h2 className="text-left text-2xl font-bold mb-4">추천 숙소</h2>
      <div className="grid grid-cols-4 gap-8">
        {data?.pages.map((page) =>
          page.accommodationSimpleResponseList.map((item: Accommodation) => (
            <div
              key={item.id}
              className="border rounded-lg shadow-md flex flex-col justify-between"
            >
              <div className="bg-concrete w-full h-64 relative">
                <Image
                  src={item.thumbnailUrl}
                  alt="image"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg bg-cover"
                  sizes="50vw"
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
                  href={`/${item.id}`}
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
                      ]),
                    };
                    sessionStorage.setItem(
                      `accommodationsState-${category}`,
                      JSON.stringify(state),
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
