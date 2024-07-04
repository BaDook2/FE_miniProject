'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import login from '@/components/Login/loginAxois';
import { useRouter } from 'next/navigation';
import loginSchema from '../../../components/Login/loginSchema';
import LoginInputBox from '../../../components/Login/LoginInputBox';

interface ILogin {
  email: string;
  password: string;
}

function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setError,
  } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const clickLoginButton = async () => {
    const errorMessage = await login(watch('email'), watch('password'));
    if (errorMessage) {
      setError('email', { type: 'custom', message: errorMessage });
    } else {
      router.push('/');
    }
  };
  return (
    <div className="h-screen mx-auto flex items-center justify-center">
      <div className="w-1/3 flex flex-col gap-12">
        <Link href="/" className="flex gap-2 h-[100px]">
          <Image src="/logo.png" width={110} height={100} alt="logo" />
          <h1 className="text-8xl text-primary">FAST</h1>
        </Link>
        <form
          className="h-3/4 flex flex-col gap-20"
          onSubmit={handleSubmit(clickLoginButton)}
        >
          <div className="flex flex-col gap-8">
            <LoginInputBox
              type="email"
              placeholder="abc@gmail.com"
              register={register('email')}
              message={errors.email?.message}
            />
            <LoginInputBox
              type="password"
              placeholder="비밀번호를 입력하세요."
              register={register('password')}
              message={errors.password?.message}
            />
          </div>
          <div className="flex flex-col gap-5">
            <button
              type="submit"
              className="bg-primary text-white text-2xl rounded-xl h-16"
            >
              로그인
            </button>
            <Link href="/signup">
              <button
                type="button"
                className="bg-white text-primary text-2xl rounded-xl h-16 border-primary border-2
                w-full"
              >
                이메일로 회원가입
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
