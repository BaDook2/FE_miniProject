'use client';

import CartFooter from '@/components/Cart/CartFooter';
import BackButton from '@/components/common/BackButton';
import BookingItem from '@/components/common/BookingItem';
import BASE_URL from '@/lib/constants';
import { axiosGet } from '@/lib/fetchURL';
import useCartStore from '@/lib/store';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { MdOutlineShoppingCart } from 'react-icons/md';

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
  accommodationId: number;
  isBooking: boolean;
}
interface CartData {
  cartList: Cart[];
}

axios.defaults.withCredentials = true;
const url = `${BASE_URL}/api/cart`;
function Page() {
  const router = useRouter();
  const [data, setData] = useState<CartData | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set()); // 선택된 cartId
  const [checkAll, setCheckAll] = useState<boolean>(false); // 전체선택
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [canBooking, setCanBooking] = useState<boolean>(true); // 예약가능여부
  const { cartCount, decrementCartCount } = useCartStore();

  useEffect(() => {
    const fetchCart = async () => {
      const res = await axiosGet<CartData>(url);
      setData(res.data);
    };
    fetchCart();
  }, []);

  // 가격, 예약가능여부
  useEffect(() => {
    const newTotalPrice = Array.from(selectedItems).reduce((sum, itemId) => {
      const item = data?.cartList.find((cart) => cart.cartId === itemId);
      return item ? sum + item.totalPrice : sum;
    }, 0);
    setTotalPrice(newTotalPrice);

    const canBookingItems = Array.from(selectedItems).some((itemId) => {
      const item = data?.cartList.find((cart) => cart.cartId === itemId);
      return item ? !item.isBooking : false;
    });
    setCanBooking(!canBookingItems);
    if (selectedItems.size === 0) {
      setCanBooking(false);
    }
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
    if (selectedItems.size === 0) {
      setAlertMessage('선택된 항목이 없습니다.');
      return;
    }

    await axios.delete(url, {
      params: {
        cartList: Array.from(selectedItems).join(','),
      },
    });
    decrementCartCount(selectedItems.size);
    setSelectedItems(new Set());
    setCheckAll(false);

    const res = await axiosGet<CartData>(url);
    setData(res.data);
  };

  const closeModal = () => {
    setAlertMessage(null);
  };

  // 예약 Link
  const handleBooking = () => {
    const selectedCartItems = data?.cartList.filter((cart) =>
      selectedItems.has(cart.cartId),
    );
    if (!selectedCartItems) return;

    const bookingItems = selectedCartItems.map((cart) => ({
      accommodationTitle: cart.accommodationTitle,
      roomTitle: cart.roomTitle,
      totalPrice: cart.totalPrice,
      numPeople: cart.people,
      minPeople: cart.minPeople,
      maxPeople: cart.maxPeople,
      checkInDatetime: cart.checkInDatetime,
      checkOutDatetime: cart.checkOutDatetime,
      roomId: cart.roomId,
      cartId: cart.cartId,
    }));

    const encodedItems = JSON.stringify(bookingItems);
    router.push(`/booking?items=${encodedItems}`);
  };

  const handleTitleClick = (accommodationId: number) => {
    router.push(`/accommodation/${accommodationId}`);
  };

  return (
    <div className="w-innerWidth m-auto pb-64">
      <div className="relative flex justify-center items-center my-8">
        <div className="absolute left-0">
          <BackButton />
        </div>
        <div className="text-2xl font-bold">장바구니</div>
      </div>
      {cartCount ? (
        <div>
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
                className="cursor-pointer"
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
                  type="cart"
                  booking={cart}
                  isCheck={selectedItems.has(cart.cartId)}
                  onCheckItem={handleSelectItem}
                  onAccommodationTitleClick={handleTitleClick}
                />
              ))}
          </div>
          <CartFooter
            totalPrice={totalPrice}
            selectedItemsCount={selectedItems.size}
            handleBooking={handleBooking}
            alertMessage={alertMessage}
            closeModal={closeModal}
            canBooking={canBooking}
          />
        </div>
      ) : (
        <div className="w-innerWidth m-auto">
          <div className="bg-white p-10 flex flex-col justify-center items-center text-dovegray">
            <MdOutlineShoppingCart size={80} className="m-5" />
            <div>장바구니에 담긴 상품이 없습니다</div>
            <div>원하는 상품을 담아보세요</div>
            <button
              type="button"
              className="text-primary bg-white border border-primary px-4 py-2 rounded-md m-5 hover:bg-primary hover:text-white transition-all"
              onClick={() => router.push('/')}
            >
              홈으로 가기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
