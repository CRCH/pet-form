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
  ...rest
}) => (
  <div
    className={cn(
      'input',
      errorMessage && 'input_with-error',
      className,
    )}
  >
    <input className="input__field-input" {...rest} />
    {errorMessage && (
      <span className="input__error-message">
        {errorMessage}
      </span>
    )}
  </div>
);

export default Input;
