import React, { ButtonHTMLAttributes } from 'react';
import { cn } from '../../../utils';

type IColor = 'text-blue-500';
type IBackground = 'bg-white' | 'bg-greenLight';
type IButtonSize = 'small' | 'medium' | 'large';
type IFontSize = 'text-xs' | 'text-md' | 'text-xl' | 'text-2xl';
type IFontWeight = 'font-bold' | 'font-extrabold' | 'font-thin' | 'font-medium';

type IProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: IButtonSize;
  bg?: IBackground;
  color?: IColor;
  fontWeight?: IFontWeight;
  fontSize?: IFontSize;
  isDisabled?: boolean;
  isLoading?: boolean;
  block?: boolean;
};

const Button: React.FC<IProps> = (props) => {
  const {
    color,
    bg,
    size,
    fontSize,
    fontWeight,
    isDisabled,
    isLoading,
    children,
    block,
    className,
    ...rest
  } = props;

  const sizeClasses =
    size === 'small'
      ? 'h-7 py-1 px-3 text-sm'
      : size === 'large'
      ? 'h-11 py-3 px-6 text-lg'
      : 'h-8 py-2 px-4 text-base';

  return (
    <button
      {...rest}
      className={cn(
        'flex items-center justify-center rounded-md shadow-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50',
        block ? 'w-full' : 'inline-block',
        sizeClasses,
        bg ? bg : 'bg-blue-500',
        color ? color : 'text-white',
        fontWeight ? fontWeight : 'font-semibold',
        fontSize ? fontSize : '',
        className
      )}
      disabled={isDisabled}
    >
      {isLoading ? (
        <span className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
      ) : null}
      {children}
    </button>
  );
};

export default Button;
