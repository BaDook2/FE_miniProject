import React, { useState } from 'react';
import PaymentsButton from './PaymentsButton';
import {
  DescriptionNaverPay,
  DescriptionKakaoPay,
  DescriptionPayco,
  DescriptionCard,
  DescriptionPhone,
  DescriptionAccount,
} from './Payments';

type DescriptionKey =
  | 'naverPay'
  | 'kakaoPay'
  | 'payco'
  | 'card'
  | 'phone'
  | 'account';
function BookingPayments() {
  const [selected, setSelected] = useState('naverPay');
  const handleClick = (key: DescriptionKey) => {
    setSelected(key);
  };
  const renderDescription = () => {
    switch (selected) {
      case 'naverPay':
        return <DescriptionNaverPay />;
      case 'kakaoPay':
        return <DescriptionKakaoPay />;
      case 'payco':
        return <DescriptionPayco />;
      case 'card':
        return <DescriptionCard />;
      case 'phone':
        return <DescriptionPhone />;
      case 'account':
        return <DescriptionAccount />;
      default:
        return null;
    }
  };
  return (
    <section className="flex flex-col gap-2 p-6 mb-4 bg-white">
      <h2 className="text-lg mb-2 font-bold">결제 수단</h2>
      <article className="grid grid-cols-2 md:grid-cols-3 gap-1">
        <PaymentsButton
          onClick={() => {
            handleClick('naverPay');
          }}
          content={
            <img src="img/naverpay.png" alt="NaverPay" className="h-2/3" />
          }
          isSelected={selected === 'naverPay'}
        />
        <PaymentsButton
          onClick={() => {
            handleClick('kakaoPay');
          }}
          content={
            <img src="img/kakaopay.png" alt="KakaoPay" className="h-2/3" />
          }
          isSelected={selected === 'kakaoPay'}
        />
        <PaymentsButton
          onClick={() => {
            handleClick('payco');
          }}
          content={<img src="img/payco.png" alt="Payco" className="h-2/3" />}
          isSelected={selected === 'payco'}
        />
        <PaymentsButton
          onClick={() => {
            handleClick('card');
          }}
          content="신용/체크 카드"
          isSelected={selected === 'card'}
        />
        <PaymentsButton
          onClick={() => {
            handleClick('phone');
          }}
          content="휴대폰 결제"
          isSelected={selected === 'phone'}
        />
        <PaymentsButton
          onClick={() => {
            handleClick('account');
          }}
          content="간편 계좌 이체"
          isSelected={selected === 'account'}
        />
      </article>
      <article>{renderDescription()}</article>
    </section>
  );
}

export default BookingPayments;
