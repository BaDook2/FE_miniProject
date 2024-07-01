import { z } from 'zod';

const NAME_REGEX = /^[A-Za-z가-힣]+$/;
const NAME_REGEX_ERROR = '한글과 영어만 가능합니다.';
const PHONE_NUMBER_LENGTH = 11;
const PHONE_NUMBER_ERROR = '11자를 입력하세요.';

const PHONE_NUMBER_REGEX = /^\d+$/;
const PHONE_NUMBER_REGEX_ERROR = '숫자만 가능합니다.';

const BookingSchema = z.object({
  name: z.string().regex(NAME_REGEX, NAME_REGEX_ERROR),
  phoneNumber: z
    .string()
    .regex(PHONE_NUMBER_REGEX, PHONE_NUMBER_REGEX_ERROR)
    .length(PHONE_NUMBER_LENGTH, PHONE_NUMBER_ERROR),
});

export default BookingSchema;
