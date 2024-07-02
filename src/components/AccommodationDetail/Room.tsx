import { IRoom } from '@/app/(main)/[id]/page';
import Link from 'next/link';
import ImageSlider from './ImageSlider';
import CartAddButton from './CartAddButton';
import ReserveButton from './ReserveButton';

interface RoomProps {
  buildingName: string;
  room: IRoom;
  numPeople: number;
  checkInTime: string;
  checkOutTime: string;
  checkInDate: string;
  checkOutDate: string;
  isVaildPeriod: boolean;
}

function Room({
  buildingName,
  room,
  checkInDate,
  checkOutDate,
  numPeople,
  checkInTime,
  checkOutTime,
  isVaildPeriod,
}: RoomProps) {
  const checkInDateObj = new Date(`${checkInDate}`);
  const checkOutDateObj = new Date(`${checkOutDate}`);
  let day = Math.abs(checkInDateObj.getTime() - checkOutDateObj.getTime());
  day = Math.ceil(day / (1000 * 60 * 60 * 24));
  const totalPrice = room.price * day;

  const bookingItem = {
    accommodationTitle: buildingName,
    roomTitle: room.title,
    totalPrice,
    numPeople,
    minPeople: room.minPeople,
    maxPeople: room.maxPeople,
    checkInDatetime: `${checkInDate}T${checkInTime}`,
    checkOutDatetime: `${checkOutDate}T${checkOutTime}`,
    roomId: room.roomId,
  };
  const encodedItems = JSON.stringify(bookingItem);
  return (
    <div className="flex py-4 border-dovegray border-b-2 ">
      <div className="w-5/12 h-[250px]">
        <ImageSlider imgArr={room.img} />
      </div>
      <div className="flex flex-col ml-4 border-mineshaft border-2 rounded-xl w-full h-[250px] px-6 py-4 justify-between">
        <h2 className="text-3xl font-semibold mb-2">{room.title}</h2>
        <span className="text-gray-600 mb-2 text-base">
          기준 {room.minPeople}명 / 최대 {room.maxPeople}명
        </span>
        <span className="text-4xl font-bold mb-4 text-right">
          {room.price}원
        </span>
        <div className="flex justify-end items-center gap-2">
          {isVaildPeriod ? (
            <>
              <CartAddButton
                roomId={room.roomId}
                people={numPeople}
                checkInDate={`${checkInDate}`}
                checkOutDate={`${checkOutDate}`}
              />
              <Link href={`/booking?items=[${encodedItems}]`}>
                <ReserveButton text="예약하기" />
              </Link>
            </>
          ) : (
            <div className="bg-primary opacity-40 text-white w-[130px] h-[45px] rounded-xl text-lg flex justify-center items-center cursor-not-allowed">
              예약하기
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Room;
