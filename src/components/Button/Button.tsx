import React, { FC } from 'react';
// utils
import cn from 'classnames';
// styles
import './Button.scss';

interface ButtonProps {
  onClick: () => void;
  title: string;
  isPrimary?: boolean,
  isBlue?: boolean,
  isRed?: boolean,
  isDisabled?: boolean,
  isLink?: boolean,
  className?: string;
}

const Button: FC<ButtonProps> = ({
  title,
  onClick,
  isDisabled,
  isPrimary,
  isBlue,
  isRed,
  isLink,
  className,
}) => (
  <div
    role="button"
    tabIndex={0}
    onClick={() => !isDisabled && onClick()}
    className={cn(
      'button',
      className,
      isPrimary && 'button_primary',
      isBlue && 'button_blue',
      isRed && 'button_red',
      isLink && 'button_link',
      isDisabled && 'button_disabled',
    )}
  >
    {title}
  </div>
);

export default Button;
