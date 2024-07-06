import Link from 'next/link';

function NotFound() {
  return (
    <div className="flex justify-center items-center mx-auto h-full">
      <div>해당 페이지를 찾을 수 없습니다.</div>
      <Link href="/">
        <button type="button">메인 페이지로 가기</button>
      </Link>
    </div>
  );
}

export default NotFound;
