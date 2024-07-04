'use client';

import { MdOutlineShoppingCart } from 'react-icons/md';
import useCartStore from '@/lib/store';
import checkCookie from '@/lib/checkCookie';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const handleClick = async () => {
    const { errorMessage } = await cartAdd({
      roomId,
      people,
      checkInDate,
      checkOutDate,
    });
    if (!checkCookie()) {
      router.push('/login');
    } else if (!errorMessage) {
      incrementCartCount();
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
