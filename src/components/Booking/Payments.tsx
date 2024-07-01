import React from 'react';
import { MdOutlineInfo } from 'react-icons/md';

function DescriptionNaverPay() {
  return (
    <div>
      <div className="flex items-center gap-1 text-sm mb-2">
        <span>
          <MdOutlineInfo />
        </span>
        <span>
          주문 변경 시 카드사 혜택/할부 적용 여부는 카드사 정책에 따라 변경될 수
          있습니다.
        </span>
      </div>
      <div className="w-full flex flex-col p-4 bg-concrete ">
        <div>
          <img src="img/naverpay.png" alt="NaverPay" className="h-10 mb-4" />
        </div>
        <div className="text-sm">
          <p className="font-bold">네이버페이로 7만원 이상 결제 시 1천P 적립</p>
          <p>*국내숙소 상품 결제 시/기간 내 1회 적용 </p>
          <p>*7월 26일 적립 </p>
        </div>
      </div>
    </div>
  );
}
function DescriptionKakaoPay() {
  return (
    <div>
      <div className="flex items-center gap-1 text-sm mb-2">
        <span>
          <MdOutlineInfo />
        </span>
        <span>
          주문 변경 시 카드사 혜택/할부 적용 여부는 카드사 정책에 따라 변경될 수
          있습니다.
        </span>
      </div>
      <div className="w-full flex flex-col p-4 bg-concrete ">
        <div>
          <img src="img/kakaopay.png" alt="NaverPay" className="h-10 mb-4" />
        </div>
        <div className="flex flex-col gap-1 text-sm mb-4">
          <p className="font-bold">
            카카오페이머니로 2.5만원 이상 결제 시 2천원 즉시할인
          </p>
          <p>오전 10시 오픈/일 선착순 2,000명/기간 내 1회 적용 </p>
          <p>*국내숙소 상품 결제 시 / 카카오페이 앱 내 할인 적용 확인 </p>
        </div>
        <hr className="border-dashed border-alto mb-4" />
        <div className="flex flex-col gap-1 text-sm mb-2">
          <p className="font-bold">
            카카오페이머니로 10만원 이상 결제 시 10% 즉시할인 (최대 1만원)
          </p>
          <p>오전 10시 오픈/일 선착순 550명/기간 내 1회 적용 </p>
          <p>*국내숙소 상품 결제 시 / 카카오페이 앱 내 할인 적용 확인 </p>
        </div>
        <hr className="border-dashed border-alto mb-4" />
        <div className="flex flex-col gap-1 text-sm mb-2">
          <p className="font-bold">
            카카오페이에 등록된 NH농협카드로 결제 시 5천원 즉시할인
          </p>
          <p>오전 10시 오픈/일 선착순 630명/기간 내 1회 적용 </p>
          <p>7만원 이상 결제 시 </p>
          <p>카카오페이 앱 내 할인 적용 확인</p>
        </div>
        <hr className="border-dashed border-alto mb-4" />
        <div className="flex flex-col gap-1 text-sm mb-2">
          <p className="font-bold">
            카카오페이에 등록된 삼성카드로 결제 시 5천원 즉시할인 오전 10시
            오픈/일 선착순 630명/기간 내 1회 적용
          </p>
          <p>8만원 이상 결제 시 </p>
          <p>카카오페이 앱 내 할인 적용 확인 </p>
        </div>
        <hr className="border-dashed border-alto mb-4" />
        <div className="flex flex-col gap-1 text-sm mb-2">
          <p className="font-bold">
            카카오페이로 결제 시 최대 6개월 무이자할부
          </p>
          <p>
            카카오페이로 신한/삼성/롯데/하나카드로 결제 시 6개월 무이자 할부{' '}
          </p>
          <p>*30만원 이상 결제 시</p>
        </div>
      </div>
    </div>
  );
}
function DescriptionPayco() {
  return (
    <div>
      <div className="flex items-center gap-1 text-sm mb-2">
        <span>
          <MdOutlineInfo />
        </span>
        <span>
          주문 변경 시 카드사 혜택/할부 적용 여부는 카드사 정책에 따라 변경될 수
          있습니다.
        </span>
      </div>
      <div className="w-full flex flex-col p-4 bg-concrete ">
        <div>
          <img src="img/payco.png" alt="NaverPay" className="h-10 mb-4" />
        </div>
        <div className="text-sm">
          <p className="font-bold">
            PAYCO로 FAST에서 첫 결제 시 3천원 즉시할인
          </p>
          <p>PAYCO 앱에서 쿠폰 다운로드</p>
          <p>* 1만원 이상 결제 시</p>
          <p>* ID당 1회 / 예산 소진 시 종료</p>
        </div>
      </div>
    </div>
  );
}
function DescriptionCard() {
  return (
    <div>
      <div className="flex items-center gap-1 text-sm mb-2">
        <span>
          <MdOutlineInfo />
        </span>
        <span>
          24년 2월부터 &apos;미성년자 명의&apos;의 &apos;문화누리카드&apos;
          결제가 제한 됩니다. (세대 내 성인 명의 카드로 금액 합산하여 결제가능)
        </span>
      </div>
      <div className="w-full flex flex-col p-4 bg-concrete ">
        <h3 className="text-lg font-bold mb-2">카드</h3>
        <div className="text-sm">
          <p className="font-bold">
            30만원 이상 결제 시 최대 6개월 무이자 할부
          </p>
          <p>신한/삼성/롯데/하나카드로 30만원 이상 결제 시 (*항공 제외)</p>
        </div>
      </div>
    </div>
  );
}
function DescriptionPhone() {
  return (
    <div>
      <div className="flex items-center gap-1 text-sm mb-2">
        <span>
          <MdOutlineInfo />
        </span>
        <span>결제 월이 지난 후 취소 시 계좌로 환불 됩니다.</span>
      </div>
    </div>
  );
}
function DescriptionAccount() {
  return (
    <div>
      <div className="flex items-center gap-1 text-sm mb-2">
        <span>
          <MdOutlineInfo />
        </span>
        <span>한 번 등록으로 편리하게 이용하세요.</span>
      </div>
    </div>
  );
}

export {
  DescriptionNaverPay,
  DescriptionKakaoPay,
  DescriptionPayco,
  DescriptionCard,
  DescriptionPhone,
  DescriptionAccount,
};
