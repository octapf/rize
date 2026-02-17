import React from 'react';
import { Text as RNText, TextProps, Platform } from 'react-native';
import { cn } from '@/lib/utils';

/**
 * Themed Text with proper font for Spanish (á, é, í, ó, ú) and Android padding fix.
 * Use this instead of react-native Text for correct character rendering.
 */
export function Text({
  className,
  style,
  ...props
}: TextProps) {
  return (
    <RNText
      className={cn('font-body', className)}
      style={[
        Platform.OS === 'android' && { includeFontPadding: false },
        style,
      ]}
      {...props}
    />
  );
}
