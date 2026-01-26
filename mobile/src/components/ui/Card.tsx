import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '@/lib/utils';

export interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <View
      className={cn(
        'bg-white rounded-xl p-4 shadow-sm border border-gray-100',
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
}

export interface CardHeaderProps extends ViewProps {
  children: React.ReactNode;
}

export function CardHeader({ children, className, ...props }: CardHeaderProps) {
  return (
    <View className={cn('mb-3', className)} {...props}>
      {children}
    </View>
  );
}

export interface CardContentProps extends ViewProps {
  children: React.ReactNode;
}

export function CardContent({ children, className, ...props }: CardContentProps) {
  return (
    <View className={cn('', className)} {...props}>
      {children}
    </View>
  );
}

export interface CardActionsProps extends ViewProps {
  children: React.ReactNode;
}

export function CardActions({ children, className, ...props }: CardActionsProps) {
  return (
    <View className={cn('flex-row gap-2 mt-3', className)} {...props}>
      {children}
    </View>
  );
}
