import React from 'react';
import { View, Image, Text, ViewProps } from 'react-native';
import { cn } from '@/lib/utils';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends ViewProps {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  fallbackText?: string;
}

const sizeStyles: Record<AvatarSize, { container: string; text: string }> = {
  xs: { container: 'w-6 h-6', text: 'text-xs' },
  sm: { container: 'w-8 h-8', text: 'text-sm' },
  md: { container: 'w-10 h-10', text: 'text-base' },
  lg: { container: 'w-14 h-14', text: 'text-xl' },
  xl: { container: 'w-20 h-20', text: 'text-3xl' },
};

export function Avatar({
  src,
  alt,
  size = 'md',
  fallbackText,
  className,
  ...props
}: AvatarProps) {
  const getInitials = (text: string) => {
    const words = text.trim().split(' ');
    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    return text.substring(0, 2).toUpperCase();
  };

  return (
    <View
      className={cn(
        'rounded-full overflow-hidden bg-primary/10 items-center justify-center',
        sizeStyles[size].container,
        className
      )}
      {...props}
    >
      {src ? (
        <Image
          source={{ uri: src }}
          alt={alt || 'Avatar'}
          className="w-full h-full"
          resizeMode="cover"
        />
      ) : (
        <Text
          className={cn(
            'font-label-bold text-primary',
            sizeStyles[size].text
          )}
        >
          {fallbackText ? getInitials(fallbackText) : '?'}
        </Text>
      )}
    </View>
  );
}
