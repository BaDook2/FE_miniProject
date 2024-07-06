import { IAccommodation } from '@/app/(main)/accommodation/[id]/page';
import { TbAirConditioning } from 'react-icons/tb';
import { GiToothbrush } from 'react-icons/gi';
import { MdOutlineSoupKitchen } from 'react-icons/md';
import { PiHairDryer } from 'react-icons/pi';

interface AccommodationProps {
  data: IAccommodation;
}

function AboutAccommondation({ data }: AccommodationProps) {
  return (
    <div className="flex flex-col text-codgray py-4">
      <h1 className="border-b-2 border-dovegray text-2xl mb-2">
        {data?.title}
      </h1>
      <p className="mb-4">{data?.info}</p>

      <div className="mb-4 flex gap-2">
        <div>
          <span className="font-semibold">체크인 : {data?.checkIn}</span>
          <span> ~ </span>
          <span className="font-semibold">체크아웃 : {data?.checkOut}</span>
        </div>
        <div>
          <span className="font-semibold text-right">
            방 갯수: {data?.roomCount}개
          </span>
        </div>
      </div>

      <div className="p-2 border-t-[1px] border-b-[1px] border-dovegray">
        <div className="grid grid-rows-2 grid-cols-4 gap-2">
          {data?.shower && (
            <span className="flex justify-center items-center">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M304,320a16,16,0,1,0,16,16A16,16,0,0,0,304,320Zm32-96a16,16,0,1,0,16,16A16,16,0,0,0,336,224Zm32,64a16,16,0,1,0-16-16A16,16,0,0,0,368,288Zm-32,32a16,16,0,1,0-16-16A16,16,0,0,0,336,320Zm-32-64a16,16,0,1,0,16,16A16,16,0,0,0,304,256Zm128-32a16,16,0,1,0-16-16A16,16,0,0,0,432,224Zm-48,16a16,16,0,1,0,16-16A16,16,0,0,0,384,240Zm-16-48a16,16,0,1,0,16,16A16,16,0,0,0,368,192Zm96,32a16,16,0,1,0,16,16A16,16,0,0,0,464,224Zm32-32a16,16,0,1,0,16,16A16,16,0,0,0,496,192Zm-64,64a16,16,0,1,0,16,16A16,16,0,0,0,432,256Zm-32,32a16,16,0,1,0,16,16A16,16,0,0,0,400,288Zm-64,64a16,16,0,1,0,16,16A16,16,0,0,0,336,352Zm-32,32a16,16,0,1,0,16,16A16,16,0,0,0,304,384Zm64-64a16,16,0,1,0,16,16A16,16,0,0,0,368,320Zm21.65-218.35-11.3-11.31a16,16,0,0,0-22.63,0L350.05,96A111.19,111.19,0,0,0,272,64c-19.24,0-37.08,5.3-52.9,13.85l-10-10A121.72,121.72,0,0,0,123.44,32C55.49,31.5,0,92.91,0,160.85V464a16,16,0,0,0,16,16H48a16,16,0,0,0,16-16V158.4c0-30.15,21-58.2,51-61.93a58.38,58.38,0,0,1,48.93,16.67l10,10C165.3,138.92,160,156.76,160,176a111.23,111.23,0,0,0,32,78.05l-5.66,5.67a16,16,0,0,0,0,22.62l11.3,11.31a16,16,0,0,0,22.63,0L389.65,124.28A16,16,0,0,0,389.65,101.65Z" />
              </svg>
              샤워
            </span>
          )}
          {data?.aircone && (
            <span className="flex justify-center items-center">
              <TbAirConditioning /> 에어컨
            </span>
          )}
          {data?.tv && (
            <span className="flex justify-center items-center">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M439.3 76H72.7C50.3 76 32 94 32 116v240c0 22 18.3 40 40.7 40h101.8v40h162.9v-40h101.8c22.4 0 40.5-18 40.5-40l.2-240c.1-22-18.2-40-40.6-40zm0 280H72.7V116h366.5v240z" />
              </svg>
              TV
            </span>
          )}
          {data?.pc && (
            <span className="flex justify-center items-center">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              PC
            </span>
          )}
          {data?.internet && (
            <span className="flex justify-center items-center">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M483.049 159.706c10.855-24.575 21.424-60.438 21.424-87.871 0-72.722-79.641-98.371-209.673-38.577-107.632-7.181-211.221 73.67-237.098 186.457 30.852-34.862 78.271-82.298 121.977-101.158C125.404 166.85 79.128 228.002 43.992 291.725 23.246 329.651 0 390.94 0 436.747c0 98.575 92.854 86.5 180.251 42.006 31.423 15.43 66.559 15.573 101.695 15.573 97.124 0 184.249-54.294 216.814-146.022H377.927c-52.509 88.593-196.819 52.996-196.819-47.436H509.9c6.407-43.581-1.655-95.715-26.851-141.162zM64.559 346.877c17.711 51.15 53.703 95.871 100.266 123.304-88.741 48.94-173.267 29.096-100.266-123.304zm115.977-108.873c2-55.151 50.276-94.871 103.98-94.871 53.418 0 101.981 39.72 103.981 94.871H180.536zm184.536-187.6c21.425-10.287 48.563-22.003 72.558-22.003 31.422 0 54.274 21.717 54.274 53.722 0 20.003-7.427 49.007-14.569 67.867-26.28-42.292-65.986-81.584-112.263-99.586z" />
              </svg>
              인터넷
            </span>
          )}
          {data?.refrigerator && (
            <span className="flex justify-center items-center">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 6C9 5.44772 9.44772 5 10 5C10.5523 5 11 5.44772 11 6V8C11 8.55228 10.5523 9 10 9C9.44772 9 9 8.55228 9 8V6Z"
                  fill="currentColor"
                />
                <path
                  d="M10 13C9.44772 13 9 13.4477 9 14V16C9 16.5523 9.44772 17 10 17C10.5523 17 11 16.5523 11 16V14C11 13.4477 10.5523 13 10 13Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5 4C5 2.34315 6.34315 1 8 1H16C17.6569 1 19 2.34315 19 4V20C19 21.6569 17.6569 23 16 23H8C6.34315 23 5 21.6569 5 20V4ZM8 3H16C16.5523 3 17 3.44772 17 4V10H7V4C7 3.44772 7.44772 3 8 3ZM7 12H17V20C17 20.5523 16.5523 21 16 21H8C7.44772 21 7 20.5523 7 20V12Z"
                  fill="currentColor"
                />
              </svg>
              냉장고
            </span>
          )}
          {data?.toiletries && (
            <span className="flex justify-center items-center">
              <GiToothbrush />
              세면도구
            </span>
          )}
          {data?.kitchenware && (
            <span className="flex justify-center items-center">
              <MdOutlineSoupKitchen />
              주방용품
            </span>
          )}
          {data?.parkingLodging && (
            <span className="flex justify-center items-center">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13 3H6v18h4v-6h3c3.31 0 6-2.69 6-6s-2.69-6-6-6zm.2 8H10V7h3.2c1.1 0 2 .9 2 2s-.9 2-2 2z" />
              </svg>
              주차장
            </span>
          )}
          {data?.dryer && (
            <span className="flex justify-center items-center">
              <PiHairDryer />
              드라이어
            </span>
          )}
        </div>
      </div>

      <div className="mb-4 text-right border-b-2 border-dovegray">
        <span className="font-semibold">주소: {data?.address}</span>
        <br />
        <span className="font-semibold">전화번호: {data?.tel}</span>
      </div>

      <div />
    </div>
  );
}

export default AboutAccommondation;
