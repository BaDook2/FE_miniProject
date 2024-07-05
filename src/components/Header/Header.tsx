import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect } from 'react';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { usePathname, useRouter } from 'next/navigation';
import useCartStore, { useIsLoggedIn } from '@/lib/store';
import { AUTH_PATH, PROTECTED_PATH } from '@/lib/constants';
import fetchCartCount from './fetchCartCount';
import fetchLogOut from './fetchLogOut';

const Header = () => {
  const presentPath = usePathname();
  const { cartCount, setCartCount } = useCartStore();
  const { isLoggedIn, setLogOut } = useIsLoggedIn();
  const router = useRouter();

  if (isLoggedIn && AUTH_PATH.some((path) => presentPath.startsWith(path))) {
    router.push('/');
  } else if (
    !isLoggedIn &&
    PROTECTED_PATH.some((path) => presentPath.startsWith(path))
  ) {
    router.push('/login');
  }

  const fetchData = useCallback(async (): Promise<void> => {
    const count = await fetchCartCount();
    setCartCount(count);
  }, [setCartCount]);

  const clickLogOut = async () => {
    const statusCode = await fetchLogOut();
    if (statusCode) {
      setLogOut();
      setCartCount(0);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn, fetchData]);

  return (
    <div className="flex items-center h-full w-full justify-between">
      <Link href="/" className="flex items-center h-full">
        <Image src="/logo.png" alt="logo" width={50} height={50} />
        <div className="text-4xl font-bold">FAST</div>
      </Link>
      <div className="flex items-center h-full gap-7 font-bold">
        <Link
          href="/"
          className={`text-lg ${presentPath === '/' ? 'text-primary' : ''}`}
        >
          메인페이지
        </Link>
        <Link
          href={isLoggedIn ? '/bookingList' : '/login'}
          className={`text-lg ${presentPath === '/bookingList' ? 'text-primary' : ''}`}
        >
          예약내역
        </Link>
        <Link href={isLoggedIn ? '/cart' : '/login'} className="text-lg">
          <div className="relative">
            <MdOutlineShoppingCart size={30} />
            {cartCount !== 0 && (
              <div className="w-5 h-5 border-primary bg-white border-2 absolute -top-2 -right-1 rounded-xl flex justify-center items-center">
                <span className="text-primary text-xs">{cartCount}</span>
              </div>
            )}
          </div>
        </Link>
        {isLoggedIn ? (
          <Link href="/">
            <button
              type="button"
              className="bg-white text-primary rounded-xl w-36 h-12 flex items-center justify-center text-sm border-primary border-2"
              onClick={clickLogOut}
            >
              로그아웃
            </button>
          </Link>
        ) : (
          <Link href="/login">
            <button
              type="button"
              className="bg-primary text-white rounded-xl w-36 h-12 flex items-center justify-center text-sm"
            >
              로그인/회원가입
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
