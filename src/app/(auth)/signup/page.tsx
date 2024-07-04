'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SignUpSchema from '../../../components/SignUp/SignUpSchema';
import SignUpInputBox from '../../../components/SignUp/SignUpInputBox';
import {
  checkAccessKey,
  requireAccessKey,
  signUp,
} from '../../../components/SignUp/signUpAxios';

export interface ISignUp {
  name: string;
  email: string;
  phoneNumber: number;
  password: string;
  confirmPassword: string;
  accessKey: string;
}

function SignUp() {
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setError,
    formState: { errors },
  } = useForm<ISignUp>({
    resolver: zodResolver(SignUpSchema),
  });
  const router = useRouter();

  const [isClicked, setIsClicked] = useState(false);
  const [accessKeyChecked, setAccessKeyChecked] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const accessKeyRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const clickAccessKeyRequireButton = async () => {
    const errorMessage = await requireAccessKey(watch('email'));
    if (errorMessage) {
      setError('email', { type: 'custom', message: errorMessage });
    } else {
      setIsClicked(true);
      accessKeyRef.current?.focus();
    }
  };

  const clickAccessKeyCheckButton = async () => {
    const errorMessage = await checkAccessKey(
      watch('email'),
      watch('accessKey'),
    );
    if (errorMessage) {
      setError('accessKey', { type: 'custom', message: errorMessage });
    } else {
      setAccessKeyChecked(true);
      phoneNumberRef.current?.focus();
    }
  };

  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>,
    fieldName: keyof ISignUp,
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

  const clickSignUpButton = async (event: ISignUp) => {
    const errorMessage = await signUp(event);
    if (errorMessage) {
      setError('confirmPassword', { type: 'custom', message: errorMessage });
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="h-screen mx-auto flex items-center justify-center">
      <div className="w-1/3 flex flex-col gap-12">
        <Link href="/login" className="flex gap-2 justify-end">
          <Image src="/logo.png" width={40} height={40} alt="logo" />
          <h1 className="text-3xl text-primary">FAST</h1>
        </Link>
        <form
          className="h-3/4 flex flex-col gap-20"
          onSubmit={handleSubmit(clickSignUpButton)}
        >
          <div className="flex flex-col gap-8">
            <SignUpInputBox
              type="text"
              register={register('name')}
              onKeyPress={(e) => handleKeyPress(e, 'name', undefined, emailRef)}
              message={errors.name?.message}
            />
            <div className="flex">
              <SignUpInputBox
                type="email"
                register={register('email')}
                onKeyPress={(e) =>
                  handleKeyPress(
                    e,
                    'email',
                    clickAccessKeyRequireButton,
                    accessKeyRef,
                  )
                }
                message={
                  errors.email?.message ||
                  (isClicked === true ? '인증코드를 보냈습니다.' : '')
                }
              />
              <button
                type="button"
                className="bg-alto text-white rounded-lg w-6/12 font-bold"
                onClick={clickAccessKeyRequireButton}
              >
                Send Access Key
              </button>
            </div>
            {isClicked && (
              <div className="flex">
                <SignUpInputBox
                  type="text"
                  register={register('accessKey')}
                  onKeyPress={(e) =>
                    handleKeyPress(
                      e,
                      'accessKey',
                      clickAccessKeyCheckButton,
                      phoneNumberRef,
                    )
                  }
                  message={
                    errors.accessKey?.message ||
                    (accessKeyChecked ? '인증코드 확인' : '')
                  }
                />
                <button
                  type="button"
                  className="bg-alto text-white rounded-lg w-6/12 font-bold"
                  onClick={clickAccessKeyCheckButton}
                >
                  Check Access Key
                </button>
              </div>
            )}
            <SignUpInputBox
              type="text"
              register={register('phoneNumber')}
              onKeyPress={(e) =>
                handleKeyPress(e, 'phoneNumber', undefined, passwordRef)
              }
              message={errors.phoneNumber?.message}
            />
            <SignUpInputBox
              type="password"
              register={register('password')}
              onKeyPress={(e) =>
                handleKeyPress(e, 'password', undefined, confirmPasswordRef)
              }
              message={errors.password?.message}
            />
            <SignUpInputBox
              type="password"
              register={register('confirmPassword')}
              onKeyPress={(e) => handleKeyPress(e, 'confirmPassword')}
              message={errors.confirmPassword?.message}
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white text-2xl rounded-xl h-16"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
