import { UseFormRegisterReturn } from 'react-hook-form';

interface ISignUpInputBox {
  type: string;
  message?: string;
  register: UseFormRegisterReturn;
  onKeyPress?: (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => void;
  buttonText?: string;
}

function SignUpInputBox({
  type,
  message,
  register,
  onKeyPress,
  buttonText,
}: ISignUpInputBox) {
  const { onChange, onBlur, name, ref } = register || {};

  const inputClassName = () => {
    if (!onChange) {
      return 'border-b-alto';
    }
    if (message) {
      return 'border-b-primary';
    }
    return 'border-b-blue-600';
  };

  return (
    <div className="flex relative">
      <input
        type={type}
        placeholder={name}
        required
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        ref={ref}
        onKeyDown={onKeyPress}
        className={`${inputClassName()} 
        border-white
        text-2xl p-2 placeholder:text-alto
        focus:outline-none
        focus:border-blue-300
        w-full
        rounded-t-md
        border-b-2`}
      />
      {buttonText && (
        <button
          type="button"
          className="border-2 border-white bg-primary text-white rounded-lg w-1/2 font-bold hover:bg-white hover:text-primary hover:border-2 hover:border-primary box-border"
          onClick={onKeyPress}
        >
          {buttonText}
        </button>
      )}
      {message && (
        <span className="absolute -bottom-6 text-primary">{message}</span>
      )}
    </div>
  );
}

export default SignUpInputBox;
