import React from 'react';
import { render } from '@testing-library/react-native';
import { Avatar } from '../Avatar';

describe('Avatar', () => {
  describe('Rendering', () => {
    it('should render with image source', () => {
      const { getByTestId } = render(
        <Avatar
          testID="avatar"
          src="https://example.com/avatar.jpg"
          alt="User avatar"
        />
      );

      expect(getByTestId('avatar')).toBeTruthy();
    });

    it('should render fallback text when no src provided', () => {
      const { getByText } = render(
        <Avatar fallbackText="John Doe" />
      );

      expect(getByText('JD')).toBeTruthy();
    });

    it('should render initials from fallback text', () => {
      const { getByText } = render(
        <Avatar fallbackText="Alice Smith" />
      );

      expect(getByText('AS')).toBeTruthy();
    });

    it('should handle single word fallback text', () => {
      const { getByText } = render(
        <Avatar fallbackText="John" />
      );

      expect(getByText('JO')).toBeTruthy();
    });

    it('should handle short fallback text', () => {
      const { getByText } = render(
        <Avatar fallbackText="X" />
      );

      expect(getByText('X')).toBeTruthy();
    });
  });

  describe('Sizes', () => {
    it('should render extra small size', () => {
      const { getByTestId } = render(
        <Avatar testID="avatar" size="xs" fallbackText="Test" />
      );

      const avatar = getByTestId('avatar');
      expect(avatar.props.className).toContain('w-6');
      expect(avatar.props.className).toContain('h-6');
    });

    it('should render small size', () => {
      const { getByTestId } = render(
        <Avatar testID="avatar" size="sm" fallbackText="Test" />
      );

      const avatar = getByTestId('avatar');
      expect(avatar.props.className).toContain('w-8');
      expect(avatar.props.className).toContain('h-8');
    });

    it('should render medium size by default', () => {
      const { getByTestId } = render(
        <Avatar testID="avatar" fallbackText="Test" />
      );

      const avatar = getByTestId('avatar');
      expect(avatar.props.className).toContain('w-10');
      expect(avatar.props.className).toContain('h-10');
    });

    it('should render large size', () => {
      const { getByTestId } = render(
        <Avatar testID="avatar" size="lg" fallbackText="Test" />
      );

      const avatar = getByTestId('avatar');
      expect(avatar.props.className).toContain('w-14');
      expect(avatar.props.className).toContain('h-14');
    });

    it('should render extra large size', () => {
      const { getByTestId } = render(
        <Avatar testID="avatar" size="xl" fallbackText="Test" />
      );

      const avatar = getByTestId('avatar');
      expect(avatar.props.className).toContain('w-20');
      expect(avatar.props.className).toContain('h-20');
    });
  });

  describe('Styling', () => {
    it('should apply default rounded-full style', () => {
      const { getByTestId } = render(
        <Avatar testID="avatar" fallbackText="Test" />
      );

      const avatar = getByTestId('avatar');
      expect(avatar.props.className).toContain('rounded-full');
    });

    it('should apply default background color', () => {
      const { getByTestId } = render(
        <Avatar testID="avatar" fallbackText="Test" />
      );

      const avatar = getByTestId('avatar');
      expect(avatar.props.className).toContain('bg-emerald-100');
    });

    it('should accept custom className', () => {
      const { getByTestId } = render(
        <Avatar testID="avatar" fallbackText="Test" className="bg-blue-500" />
      );

      const avatar = getByTestId('avatar');
      expect(avatar.props.className).toContain('bg-blue-500');
    });
  });

  describe('Image Handling', () => {
    it('should render image with correct props', () => {
      const { UNSAFE_getByType } = render(
        <Avatar
          src="https://example.com/avatar.jpg"
          alt="Test avatar"
        />
      );

      const image = UNSAFE_getByType(require('react-native').Image);
      expect(image.props.source).toEqual({ uri: 'https://example.com/avatar.jpg' });
      expect(image.props.alt).toBe('Test avatar');
      expect(image.props.resizeMode).toBe('cover');
    });

    it('should use default alt text if not provided', () => {
      const { UNSAFE_getByType } = render(
        <Avatar src="https://example.com/avatar.jpg" />
      );

      const image = UNSAFE_getByType(require('react-native').Image);
      expect(image.props.alt).toBe('Avatar');
    });
  });

  describe('Accessibility', () => {
    it('should pass through accessibility props', () => {
      const { getByTestId } = render(
        <Avatar
          testID="avatar"
          fallbackText="Test"
          accessibilityLabel="User profile picture"
          accessibilityHint="Tap to view profile"
        />
      );

      const avatar = getByTestId('avatar');
      expect(avatar.props.accessibilityLabel).toBe('User profile picture');
      expect(avatar.props.accessibilityHint).toBe('Tap to view profile');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty fallback text', () => {
      const { getByTestId } = render(
        <Avatar testID="avatar" fallbackText="" />
      );

      // Should render without crashing
      expect(getByTestId('avatar')).toBeTruthy();
    });

    it('should handle single character fallback text', () => {
      const { getByText } = render(
        <Avatar fallbackText="A" />
      );

      expect(getByText('A')).toBeTruthy();
    });

    it('should prioritize image over fallback text', () => {
      const { queryByText, UNSAFE_getByType } = render(
        <Avatar
          src="https://example.com/avatar.jpg"
          fallbackText="John Doe"
        />
      );

      // Should render image, not fallback text
      expect(UNSAFE_getByType(require('react-native').Image)).toBeTruthy();
      expect(queryByText('JD')).toBeNull();
    });
  });
});
