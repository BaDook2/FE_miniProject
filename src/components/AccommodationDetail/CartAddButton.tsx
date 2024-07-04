'use client';

import { MdOutlineShoppingCart } from 'react-icons/md';
import useCartStore, { useIsLoggedIn } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import cartAdd from './cartAddAxios';

export interface ICartAdd {
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  people: number;
}

function CartAddButton({
  roomId,
  checkInDate,
  checkOutDate,
  people,
}: ICartAdd) {
  const { incrementCartCount } = useCartStore();
  const { isLoggedIn } = useIsLoggedIn();
  const router = useRouter();
  const handleClick = async () => {
    const { errorMessage } = await cartAdd({
      roomId,
      people,
      checkInDate,
      checkOutDate,
    });
    if (!isLoggedIn) {
      router.push('/login');
    } else if (!errorMessage) {
      incrementCartCount();
      toast.success('장바구니 추가 성공!');
    } else {
      toast.error('장바구니 추가 실패');
    }
  };
  return (
    <button
      type="button"
      className="w-[45px] h-[45px] border-gray-400 border rounded-xl flex justify-center items-center hover:bg-primary hover:text-white"
      aria-label="button"
      onClick={handleClick}
    >
      <MdOutlineShoppingCart size="30" />
    </button>
  );
}

export default CartAddButton;
