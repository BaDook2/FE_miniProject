import { useRef, useState } from 'react';
import { MdCheck } from 'react-icons/md';
import bookingAxios from '@/components/Booking/bookingAxios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useBookingsFromQuery from '@/hooks/useSearchParams';
import { formatPrice } from '@/lib/formatNumber';
import BookingSchema from './bookingSchema';
import BookingInputBox from './bookingInputBox';
import BookingPayments from './BookingPayments';

export interface BookingFormInputs {
  name: string;
  phoneNumber: number;
  roomId: number;
  numPeople: number;
  checkInDate: string;
  checkOutDate: string;
}
function BookingForm() {
  const [agreeAll, setAgreeAll] = useState(false);
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
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

  const isSubmitDisabled = !(agreeAll && agree1 && agree2);

  return (
    <form onSubmit={handleSubmit((data) => bookingAxios(data, bookings))}>
      <section className="mb-4 p-6 bg-white">
        <h2 className="text-lg mb-2 font-bold">예약자 정보</h2>
        <section className="flex flex-col gap-2 mb-2">
          <BookingInputBox
            type="text"
            label="성명"
            register={register('name')}
            placeholder="성명을 입력해주세요."
            onKeyPress={(e) => handleKeyPress(e, 'name', undefined, nameRef)}
            message={errors.name?.message}
          />
          <BookingInputBox
            type="text"
            label="휴대폰 번호"
            register={register('phoneNumber')}
            placeholder="'-' 구분없이 입력해주세요.'"
            onKeyPress={(e) =>
              handleKeyPress(e, 'phoneNumber', undefined, phoneNumberRef)
            }
            message={errors.phoneNumber?.message}
          />
        </section>
      </section>
      <BookingPayments />
      <section className="flex flex-col gap-2 p-6 mb-4 bg-white">
        <article className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleAgreeAllChange}
            className={`w-10 h-10 border-2 flex justify-center items-center text-2xl font-bold rounded-lg ${agreeAll && agree1 && agree2 ? 'bg-scienceblue text-concrete' : 'text-alto'}`}
          >
            {' '}
            <MdCheck />
          </button>
          <span className="text-2xl font-bold">필수 약관 전체 동의</span>
        </article>
        <article className="flex justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleAgree1Change}
              className={`w-10 h-10 flex justify-center items-center text-2xl font-bold ${agree1 ? 'text-scienceblue' : 'text-alto'}`}
            >
              {' '}
              <MdCheck />
            </button>
            <span>[필수] 개인정보 수집 및 이용</span>
          </div>
          <button type="button" className="text-scienceblue">
            보기
          </button>
        </article>

        <article className="flex justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleAgree2Change}
              className={`w-10 h-10 flex justify-center items-center text-2xl font-bold ${agree2 ? 'text-scienceblue' : 'text-alto'}`}
            >
              {' '}
              <MdCheck />
            </button>
            <span>[필수] 개인정보 제 3자 제공</span>
          </div>
          <button type="button" className="text-scienceblue">
            보기
          </button>
        </article>
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
