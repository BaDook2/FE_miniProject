import { useRef, useState } from 'react';
import {
  bookingPost,
  bookingCartPost,
} from '@/components/Booking/bookingAxios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useBookingsFromQuery from '@/hooks/useSearchParams';
import useCartStore from '@/lib/store';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/lib/formatNumber';
import BookingInputBox from './bookingInputBox';
import BookingPayments from './BookingPayments';
import BookingSchema from './bookingSchema';
import ConsentItem from './ConsentItem';

export interface BookingFormInputs {
  guestName: string;
  guestTel: number;
  roomId: number;
  numPeople: number;
  checkInDate: string;
  checkOutDate: string;
}
function BookingForm() {
  const [agreeAll, setAgreeAll] = useState(false);
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const { decrementCartCount } = useCartStore();
  const router = useRouter();
  const bookings = useBookingsFromQuery();

  const totalSum = bookings.reduce(
    (sum, booking) => sum + booking.totalPrice,
    0,
  );

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<BookingFormInputs>({ resolver: zodResolver(BookingSchema) });

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>,
    fieldName: keyof BookingFormInputs,
    clickHandler?: () => Promise<void>,
    nextRef?: React.RefObject<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      const isValid = await trigger(fieldName);
      if (isValid) {
        if (clickHandler) {
          await clickHandler();
        }
        if (nextRef && nextRef.current) {
          nextRef.current.focus();
        }
      } else {
        event.preventDefault();
      }
    }
  };

  const handleAgreeAllChange = () => {
    const newAgreeAll = !agreeAll;
    setAgreeAll(newAgreeAll);
    setAgree1(newAgreeAll);
    setAgree2(newAgreeAll);
  };

  const handleAgree1Change = () => {
    const newAgree1 = !agree1;
    setAgree1(newAgree1);
    if (newAgree1 && agree2) {
      setAgreeAll(true);
    } else {
      setAgreeAll(false);
    }
  };

  const handleAgree2Change = () => {
    const newAgree2 = !agree2;
    setAgree2(newAgree2);
    if (agree1 && newAgree2) {
      setAgreeAll(true);
    } else {
      setAgreeAll(false);
    }
  };

  const onSubmit = async (inputData: BookingFormInputs) => {
    let res;

    const cartIdItems = bookings.filter((item) => 'cartId' in item);
    const cartIdCount = cartIdItems.length;
    const hasAnyCartId = cartIdCount > 0;
    if (hasAnyCartId) {
      res = await bookingCartPost(inputData, bookings);
      // eslint-disable-next-line no-console
      console.log(res);
      if (res.status === 404) {
        router.push('/login');
      } else if (res.data && res.data.items) {
        decrementCartCount(cartIdCount);
        router.push(
          `/bookingResult?items=${encodeURIComponent(JSON.stringify(res.data.items))}`,
        );
      }
    } else {
      res = await bookingPost(inputData, bookings);
      // eslint-disable-next-line no-console
      console.log(res);
      if (res.status === 404) {
        router.push('/login');
      } else if (res.data && res.data.items) {
        router.push(
          `/bookingResult?items=${encodeURIComponent(JSON.stringify(res.data.items))}`,
        );
      }
    }
  };

  const isSubmitDisabled = !(agreeAll && agree1 && agree2);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="mb-4 p-6 bg-white">
        <h2 className="text-lg mb-2 font-bold">예약자 정보</h2>
        <section className="flex flex-col gap-2 mb-2">
          <BookingInputBox
            type="text"
            label="성명"
            register={register('guestName')}
            placeholder="성명을 입력해주세요."
            onKeyPress={(e) =>
              handleKeyPress(e, 'guestName', undefined, nameRef)
            }
            message={errors.guestName?.message}
          />
          <BookingInputBox
            type="text"
            label="휴대폰 번호"
            register={register('guestTel')}
            placeholder="'-' 구분없이 입력해주세요.'"
            onKeyPress={(e) =>
              handleKeyPress(e, 'guestTel', undefined, phoneNumberRef)
            }
            message={errors.guestTel?.message}
          />
        </section>
      </section>
      <BookingPayments />
      <section className="flex flex-col gap-2 p-6 mb-4 bg-white">
        <ConsentItem
          type="all"
          onClick={handleAgreeAllChange}
          checked={agreeAll}
          label="필수 약관 전체 동의"
        />
        <ConsentItem
          onClick={handleAgree1Change}
          checked={agree1}
          label="[필수] 개인정보 수집 및 이용"
        />
        <ConsentItem
          onClick={handleAgree2Change}
          checked={agree2}
          label="[필수] 개인정보 제 3자 제공"
        />
      </section>
      <button
        type="submit"
        disabled={isSubmitDisabled}
        className={`w-full h-16 text-2xl text-bold rounded-xl text-concrete mb-4 ${isSubmitDisabled ? 'bg-pastelpink' : 'bg-primary'}`}
      >
        {formatPrice(totalSum)} 결제하기
      </button>
      <p className="text-sm mb-4">
        (주)Fast는 통신판매중개업자로서, 통신판매의 당사자가 아니라는 사실을
        고지하며 상품의 결제, 이용 및 환불 등과 관련한 의무와 책임은 각
        판매자에게 있습니다.
      </p>
    </form>
  );
}

export default BookingForm;
