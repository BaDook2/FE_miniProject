import { UseFormRegisterReturn } from 'react-hook-form';

interface bookingInputBox {
  type: string;
  label: string;
  message?: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function BookingInputBox({
  type,
  label,
  message,
  placeholder,
  register,
  onKeyPress,
}: bookingInputBox) {
  const { onChange, onBlur, name, ref } = register || {};
  return (
    <div className="flex flex-col relative">
      <label htmlFor={name} className="text-lg">
        <span>{label}</span>
        <span className="text-primary">*</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        required
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        ref={ref}
        onKeyPress={onKeyPress}
        className={`${message ? 'border-primary' : null} focus:outline-none text-lg bg-concrete rounded-lg px-4 py-2 placeholder:text-alto`}
      />
      {message && (
        <span className="absolute -bottom-6 text-primary">{message}</span>
      )}
    </div>
  );
}

export default BookingInputBox;
