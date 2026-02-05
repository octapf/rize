import React from 'react';
import { View, Text, ViewProps } from 'react-native';
import { cn } from '@/lib/utils';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

export interface BadgeProps extends ViewProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-primary/10 border-primary/20',
  warning: 'bg-yellow-100 border-yellow-200',
  error: 'bg-red-100 border-red-200',
  info: 'bg-primary/10 border-primary/20',
  neutral: 'bg-gray-100 border-gray-200',
};

const textVariantStyles: Record<BadgeVariant, string> = {
  success: 'text-primary',
  warning: 'text-yellow-700',
  error: 'text-red-700',
  info: 'text-primary',
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
          'font-label text-xs',
          textVariantStyles[variant]
        )}
      >
        {children}
      </Text>
    </View>
  );
}
