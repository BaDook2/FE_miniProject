import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { RxCross2 } from 'react-icons/rx';
import { axiosGet } from '@/lib/fetchURL';
import BASE_URL from '../../lib/constants';

const CheckLogin = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();
  const path = usePathname();
  const openModal = () => {
    dialogRef?.current?.showModal();
  };
  const closeModal = () => {
    dialogRef?.current?.close();
    setErr(null);
    router.back();
  };

  useEffect(() => {
    const noCheckPageArr = ['/', '/login', '/signup'];
    const checkLogin = async () => {
      const URL = `${BASE_URL}/api/check`;
      const { errorMessage } = await axiosGet(URL);
      if (errorMessage) {
        openModal();
        setErr(errorMessage);
      }
    };
    if (!noCheckPageArr.includes(path)) {
      checkLogin();
    }
  }, [path]);

  return err ? (
    <dialog
      ref={dialogRef}
      className="w-1/2 h-1/2 rounded-xl flex flex-col gap-10 justify-center items-center fixed z-10"
    >
      <h3 className="text-2xl font-bold">{err}</h3>
      <button
        type="button"
        className="h-16 bg-primary text-white rounded-2xl"
        onClick={() => router.push('/login')}
      >
        로그인 페이지로 이동
      </button>
      <button type="button" aria-label="close" onClick={closeModal}>
        <RxCross2 className="absolute top-0 right-2 cursor-pointer size-11" />
      </button>
    </dialog>
  ) : null;
};

export default CheckLogin;
