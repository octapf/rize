import React from 'react';
import { View, Text, ViewProps } from 'react-native';
import { cn } from '@/lib/utils';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

export interface BadgeProps extends ViewProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-emerald-100 border-emerald-200',
  warning: 'bg-yellow-100 border-yellow-200',
  error: 'bg-red-100 border-red-200',
  info: 'bg-blue-100 border-blue-200',
  neutral: 'bg-gray-100 border-gray-200',
};

const textVariantStyles: Record<BadgeVariant, string> = {
  success: 'text-emerald-700',
  warning: 'text-yellow-700',
  error: 'text-red-700',
  info: 'text-blue-700',
  neutral: 'text-gray-700',
};

export function Badge({
  variant = 'neutral',
  children,
  className,
  ...props
}: BadgeProps) {
  return (
    <View
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full border',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <Text
        className={cn(
          'font-inter-medium text-xs',
          textVariantStyles[variant]
        )}
      >
        {children}
      </Text>
    </View>
  );
}
