'use client';

import { MdOutlineShoppingCart } from 'react-icons/md';
import { useRef, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import useCartStore from '@/lib/store';
import cartAdd from './cartAddAxios';

export interface ICartAdd {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
}

function CartAddButton({ roomId, checkInDate, checkOutDate }: ICartAdd) {
  const [err, setErr] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openModal = () => {
    dialogRef?.current?.showModal();
  };
  const closeModal = () => {
    dialogRef?.current?.close();
    setErr(null);
  };
  const { incrementCartCount } = useCartStore();
  const handleClick = async () => {
    const error = await cartAdd({ roomId, checkInDate, checkOutDate });
    if (error) {
      setErr(error);
      openModal();
    } else {
      incrementCartCount();
    }
  };
  return (
    <div className="relative">
      <button
        type="button"
        className="w-[45px] h-[45px] border-gray-400 border rounded-xl flex justify-center items-center hover:bg-primary hover:text-white"
        aria-label="button"
        onClick={handleClick}
      >
        <MdOutlineShoppingCart size="30" />
      </button>
      <dialog
        ref={dialogRef}
        className="w-1/2 h-1/2 rounded-xl flex flex-col justify-center items-center fixed"
      >
        <h3 className="text-2xl font-bold">{err}</h3>
        <button type="button" aria-label="close">
          <RxCross2
            onClick={closeModal}
            className="absolute top-0 right-2 cursor-pointer size-11"
          />
        </button>
      </dialog>
    </div>
  );
}

export default CartAddButton;
