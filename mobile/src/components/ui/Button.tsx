import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { cn } from '@/lib/utils';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'ghost'
  | 'outline';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-emerald-600 active:bg-emerald-700',
  secondary: 'bg-gray-200 active:bg-gray-300',
  destructive: 'bg-red-600 active:bg-red-700',
  ghost: 'bg-transparent active:bg-gray-100',
  outline: 'bg-transparent border-2 border-emerald-600 active:bg-emerald-50',
};

const textVariantStyles: Record<ButtonVariant, string> = {
  primary: 'text-white',
  secondary: 'text-gray-900',
  destructive: 'text-white',
  ghost: 'text-emerald-600',
  outline: 'text-emerald-600',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-3',
  md: 'h-11 px-4',
  lg: 'h-13 px-6',
};

const textSizeStyles: Record<ButtonSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      className={cn(
        'flex-row items-center justify-center rounded-lg',
        variantStyles[variant],
        sizeStyles[size],
        isDisabled && 'opacity-50',
        className
      )}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator
          color={variant === 'primary' || variant === 'destructive' ? '#fff' : '#10B981'}
          size="small"
        />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text
            className={cn(
              'font-inter-semibold',
              textVariantStyles[variant],
              textSizeStyles[size],
              leftIcon && 'ml-2',
              rightIcon && 'mr-2'
            )}
          >
            {children}
          </Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
}
