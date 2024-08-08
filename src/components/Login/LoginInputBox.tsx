import { UseFormRegisterReturn } from 'react-hook-form';

interface ILogin {
  readonly type: string;
  readonly placeholder: string;
  readonly message?: string;
  readonly register: UseFormRegisterReturn;
}

function LoginInputBox({ type, placeholder, message, register }: ILogin) {
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
    <div className="flex flex-col relative">
      <label htmlFor={name} className="text-2xl">
        {name}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        required
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        ref={ref}
        className={`${inputClassName()} 
        border-white
        text-2xl p-2 placeholder:text-alto
        focus:outline-none
        focus:border-blue-300
        w-full
        rounded-t-md
        border-b-2`}
      />
      {message && (
        <span
          className="absolute 
      -bottom-6 text-primary"
        >
          {message}
        </span>
      )}
    </div>
  );
}

export default LoginInputBox;
