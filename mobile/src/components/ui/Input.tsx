import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { TextInput, View, TextInputProps, TouchableOpacity } from 'react-native';;
import { cn } from '@/lib/utils';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
  containerClassName?: string;
}

export function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  helperText,
  containerClassName,
  className,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={cn('w-full', containerClassName)}>
      {label && (
        <Text className="font-label text-sm text-gray-700 mb-1.5">
          {label}
        </Text>
      )}
      <View
        className={cn(
          'flex-row items-center bg-white border rounded-lg px-3 h-12',
          isFocused && !error ? 'border-primary' : 'border-gray-300',
          error && 'border-red-500'
        )}
      >
        {leftIcon && <View className="mr-2">{leftIcon}</View>}
        <TextInput
          className={cn(
            'flex-1 font-body text-base text-gray-900',
            className
          )}
          placeholderTextColor="#9CA3AF"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {rightIcon && <View className="ml-2">{rightIcon}</View>}
      </View>
      {error && (
        <Text className="font-body text-xs text-red-600 mt-1">
          {error}
        </Text>
      )}
      {helperText && !error && (
        <Text className="font-body text-xs text-gray-500 mt-1">
          {helperText}
        </Text>
      )}
    </View>
  );
}
