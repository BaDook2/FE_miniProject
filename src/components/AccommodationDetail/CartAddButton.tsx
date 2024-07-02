'use client';

import { MdOutlineShoppingCart } from 'react-icons/md';
import { useRef, useState } from 'react';
import useCartStore from '@/lib/store';
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
    const { errorMessage } = await cartAdd({
      roomId,
      people,
      checkInDate,
      checkOutDate,
    });
    if (errorMessage) {
      setErr(errorMessage);
      openModal();
    } else {
      incrementCartCount();
    }
  };
  return (
    <>
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
        className="w-1/2 h-1/2 rounded-xl flex flex-col justify-center items-center fixed gap-7"
      >
        <h3 className="text-2xl font-bold">{err}</h3>
        <button
          type="button"
          aria-label="close"
          onClick={closeModal}
          className="border-2 bg-primary w-1/4 rounded-xl h-10 text-white outline-none"
        >
          닫기
        </button>
      </dialog>
    </>
  );
}

export default CartAddButton;
