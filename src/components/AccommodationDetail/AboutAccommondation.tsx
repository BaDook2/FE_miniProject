import { IAccommodation } from '@/app/(main)/accommodation/[id]/page';

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

      <div className="p-4 border-t-[1px] border-b-[1px] border-dovegray">
        <h2 className="text-xl font-semibold mb-2">제공 항목</h2>
        <div className="grid grid-rows-2 grid-cols-4 gap-2">
          {data?.shower && <span>샤워</span>}
          {data?.aircone && <span>에어컨</span>}
          {data?.tv && <span>TV</span>}
          {data?.pc && <span>PC</span>}
          {data?.internet && <span>인터넷</span>}
          {data?.refrigerator && <span>냉장고</span>}
          {data?.toiletries && <span>세면도구</span>}
          {data?.kitchenware && <span>주방용품</span>}
          {data?.parkingLodging && <span>주차장</span>}
          {data?.dryer && <span>드라이어</span>}
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
