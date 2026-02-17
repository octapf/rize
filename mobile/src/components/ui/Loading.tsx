import React from 'react';
import { Text } from '@/components/ui/Text';
import { View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';;

interface LoadingProps {
  text?: string;
  size?: 'small' | 'large';
  color?: string;
  fullScreen?: boolean;
  style?: ViewStyle;
}

export function Loading({
  text,
  size = 'large',
  color = '#9D12DE',
  fullScreen = false,
  style,
}: LoadingProps) {
  const Container = fullScreen ? View : React.Fragment;
  const containerProps = fullScreen ? { style: styles.fullScreen } : {};

  return (
    <Container {...containerProps}>
      <View style={[styles.container, style]}>
        <ActivityIndicator size={size} color={color} />
        {text && <Text style={[styles.text, { color }]}>{text}</Text>}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '500',
  },
});
