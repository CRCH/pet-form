import React, { FC, ReactNode } from 'react';
// utils
import cn from 'classnames';
// styles
import './Card.scss';

export interface CardProps {
  className?: String;
  children?: ReactNode | string;
}

const Card: FC<CardProps> = ({
  children,
  className,
}) => (
  <div className={cn('card', className)}>
    {children}
  </div>
);

export default Card;
