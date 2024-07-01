'use client';

import CartFooter from '@/components/Cart/CartFooter';
import BackButton from '@/components/common/BackButton';
import BookingItem from '@/components/common/BookingItem';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export interface Cart {
  cartId: number;
  roomId: number;
  accommodationTitle: string;
  roomTitle: string;
  roomImg: string;
  address: string;
  checkInDatetime: string;
  checkOutDatetime: string;
  people: number;
  minPeople: number;
  maxPeople: number;
  totalPrice: number;
}
interface CartData {
  cartList: Cart[];
  totalPage: number;
}

const url = 'https://api.ananbada.store/api/cart';
function Page() {
  const router = useRouter();
  const [data, setData] = useState<CartData | null>();
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set()); // 선택된 cartId
  const [checkAll, setCheckAll] = useState<boolean>(false); // 전체선택
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await axios.get(url);
      setData(res.data);
    };
    fetchCart();
  }, []);

  // 가격
  useEffect(() => {
    const newTotalPrice = Array.from(selectedItems).reduce((sum, itemId) => {
      const item = data?.cartList.find((cart) => cart.cartId === itemId);
      return item ? sum + item.totalPrice : sum;
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [selectedItems, data]);

  // 전체선택
  const handleSelectAll = () => {
    if (checkAll) {
      setSelectedItems(new Set());
    } else {
      const newSelectedItems = new Set(
        data?.cartList.map((cart) => cart.cartId),
      );
      setSelectedItems(newSelectedItems);
    }
    setCheckAll(!checkAll);
  };

  // 개별선택
  const handleSelectItem = (cartId: number) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(cartId)) {
      newSelectedItems.delete(cartId);
    } else {
      newSelectedItems.add(cartId);
    }
    setSelectedItems(newSelectedItems);
    setCheckAll(newSelectedItems.size === data?.cartList.length);
  };

  // 삭제
  const handleDeleteSelected = async () => {
    await axios.delete(url, {
      params: {
        cartList: Array.from(selectedItems).join(','),
      },
    });
    setSelectedItems(new Set());
    setCheckAll(false);

    const res = await axios.get(url);
    setData(res.data);
  };

  const closeModal = () => {
    setAlertMessage(null);
  };

  // 예약 Link
  const handleBooking = () => {
    if (selectedItems.size === 0) {
      setAlertMessage('선택된 항목이 없습니다.');
      return;
    }

    const selectedCartItems = data?.cartList.filter((cart) =>
      selectedItems.has(cart.cartId),
    );
    if (!selectedCartItems) return;

    const bookingItems = selectedCartItems.map((cart) => ({
      accommodationTitle: cart.accommodationTitle,
      roomTitle: cart.roomTitle,
      roomPrice: cart.totalPrice,
      numPeople: cart.people,
      minPeople: cart.minPeople,
      maxPeople: cart.maxPeople,
      checkInDatetime: cart.checkInDatetime,
      checkOutDatetime: cart.checkOutDatetime,
      roomId: cart.roomId,
    }));

    const encodedItems = JSON.stringify(bookingItems);
    handleDeleteSelected();
    router.push(`/booking?items=${encodedItems}`);
  };

  return (
    <div className="w-innerWidth m-auto">
      <div className="relative flex justify-center items-center my-8">
        <div className="absolute left-0">
          <BackButton />
        </div>
        <div className="text-2xl font-bold">장바구니</div>
      </div>
      <div className="flex items-center justify-between text-lg font-bold my-6">
        <div className="flex items-center ">
          <input
            type="checkbox"
            className="custom-checkbox"
            checked={checkAll}
            onChange={handleSelectAll}
          />
          <span className="ml-3">전체선택</span>
        </div>
        <div>
          <button
            type="button"
            className=" cursor-pointer"
            onClick={handleDeleteSelected}
          >
            선택삭제
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {data &&
          data.cartList.map((cart: Cart) => (
            <BookingItem
              key={cart.cartId}
              booking={cart}
              isCheck={selectedItems.has(cart.cartId)}
              onCheckItem={handleSelectItem}
            />
          ))}
      </div>
      <CartFooter
        totalPrice={totalPrice}
        selectedItemsCount={selectedItems.size}
        handleBooking={handleBooking}
        alertMessage={alertMessage}
        closeModal={closeModal}
      />
    </div>
  );
}

export default Page;
