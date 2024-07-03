import React from 'react';
import { formatNumber } from '@/lib/formatNumber';
import AlertModal from './AlertModal';

interface CartFooterProps {
  totalPrice: number;
  selectedItemsCount: number;
  handleBooking: () => void;
  alertMessage: string | null;
  closeModal: () => void;
  canBooking: boolean;
}

const CartFooter = ({
  totalPrice,
  selectedItemsCount,
  handleBooking,
  alertMessage,
  closeModal,
  canBooking,
}: CartFooterProps) => {
  return (
    <div className="w-innerWidth m-auto fixed bottom-0 left-0 right-0 bg-white shadow-[0_0_5px_0_rgba(0,0,0,0.3)] flex justify-between items-center">
      <div className="flex w-full justify-between items-start p-1 gap-4">
        <div className="w-1/2 bg-white p-6">
          <h2 className="font-bold text-lg mb-7">예약 상품</h2>
          <div className="flex justify-between mb-2">
            <span className="text-dovegray">상품 금액</span>
            <span>{`${formatNumber(totalPrice)}원`}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-dovegray">할인 금액</span>
            <span>-0원</span>
          </div>
          <hr className="border-gray-300 my-5" />
          <div className="flex justify-between font-bold mb-0.5">
            <span>결제 예상 금액</span>
            <span>{`${formatNumber(totalPrice)}원`}</span>
          </div>
        </div>
        <div className="w-1/2 bg-white p-6">
          <div className="mb-4">
            <span className="font-bold text-lg">{`총 ${selectedItemsCount}건`}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>결제 예상 금액</span>
            <span>{`${formatNumber(totalPrice)}원`}</span>
          </div>
          <div className="mb-4">
            <button
              type="button"
              onClick={handleBooking}
              disabled={!canBooking}
              className={`w-full block text-center bg-primary text-white py-3 rounded-md font-bold ${canBooking ? 'bg-primary hover:bg-primary-dark' : 'bg-gray-400 cursor-not-allowed'}`}
            >
              예약하기
            </button>
          </div>
          {alertMessage && (
            <AlertModal message={alertMessage} onClose={closeModal} />
          )}
          <p className="text-gray-500 text-xs">
            (주)Fast는 통신판매중개업자로서, 통신판매의 당사자 아니라는 사실을
            고지하여 상품의 예약, 이용 및 환불 등과 관련한 의무와 책임은 각
            판매자에게 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartFooter;
