import React, { FC, InputHTMLAttributes } from 'react';
// utils
import cn from 'classnames';
// styles
import './Input.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  errorMessage?: string;
}

const Input: FC<InputProps> = ({
  onChange,
  errorMessage,
  className,
  value,
  pattern = '.*',
  ...rest
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = new RegExp(`${pattern}`);

    if (onChange && (e.target.value === '' || regex.test(e.target.value))) {
      onChange(e);
    }
  };

  return (
    <div
      className={cn(
        'input',
        errorMessage && 'input_with-error',
        className,
      )}
    >
      <input className="input__field-input" onChange={handleOnChange} value={value} {...rest} />
      {errorMessage && (
        <span className="input__error-message">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default Input;
