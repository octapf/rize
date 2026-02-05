import React from 'react';
import { render } from '@testing-library/react-native';
import { Badge } from '../Badge';

describe('Badge', () => {
  describe('Rendering', () => {
    it('should render children correctly', () => {
      const { getByText } = render(
        <Badge>Test Badge</Badge>
      );

      expect(getByText('Test Badge')).toBeTruthy();
    });

    it('should render with testID', () => {
      const { getByTestId } = render(
        <Badge testID="badge">Badge</Badge>
      );

      expect(getByTestId('badge')).toBeTruthy();
    });
  });

  describe('Variants', () => {
    it('should render success variant', () => {
      const { getByTestId } = render(
        <Badge testID="badge" variant="success">Success</Badge>
      );

      const badge = getByTestId('badge');
      expect(badge.props.className).toContain('bg-primary/10');
      expect(badge.props.className).toContain('border-primary/20');
    });

    it('should render warning variant', () => {
      const { getByTestId } = render(
        <Badge testID="badge" variant="warning">Warning</Badge>
      );

      const badge = getByTestId('badge');
      expect(badge.props.className).toContain('bg-yellow-100');
      expect(badge.props.className).toContain('border-yellow-200');
    });

    it('should render error variant', () => {
      const { getByTestId } = render(
        <Badge testID="badge" variant="error">Error</Badge>
      );

      const badge = getByTestId('badge');
      expect(badge.props.className).toContain('bg-red-100');
      expect(badge.props.className).toContain('border-red-200');
    });

    it('should render info variant', () => {
      const { getByTestId } = render(
        <Badge testID="badge" variant="info">Info</Badge>
      );

      const badge = getByTestId('badge');
      expect(badge.props.className).toContain('bg-primary/10');
      expect(badge.props.className).toContain('border-primary/20');
    });

    it('should render neutral variant by default', () => {
      const { getByTestId } = render(
        <Badge testID="badge">Neutral</Badge>
      );

      const badge = getByTestId('badge');
      expect(badge.props.className).toContain('bg-gray-100');
      expect(badge.props.className).toContain('border-gray-200');
    });

    it('should render neutral variant explicitly', () => {
      const { getByTestId } = render(
        <Badge testID="badge" variant="neutral">Neutral</Badge>
      );

      const badge = getByTestId('badge');
      expect(badge.props.className).toContain('bg-gray-100');
      expect(badge.props.className).toContain('border-gray-200');
    });
  });

  describe('Text Styling', () => {
    it('should apply success text color', () => {
      const { getByText } = render(
        <Badge variant="success">Success</Badge>
      );

      const text = getByText('Success');
      expect(text.props.className).toContain('text-primary');
    });

    it('should apply warning text color', () => {
      const { getByText } = render(
        <Badge variant="warning">Warning</Badge>
      );

      const text = getByText('Warning');
      expect(text.props.className).toContain('text-yellow-700');
    });

    it('should apply error text color', () => {
      const { getByText } = render(
        <Badge variant="error">Error</Badge>
      );

      const text = getByText('Error');
      expect(text.props.className).toContain('text-red-700');
    });

    it('should apply info text color', () => {
      const { getByText } = render(
        <Badge variant="info">Info</Badge>
      );

      const text = getByText('Info');
      expect(text.props.className).toContain('text-primary');
    });

    it('should apply neutral text color', () => {
      const { getByText } = render(
        <Badge variant="neutral">Neutral</Badge>
      );

      const text = getByText('Neutral');
      expect(text.props.className).toContain('text-gray-700');
    });

    it('should apply font and size styles', () => {
      const { getByText } = render(
        <Badge>Test</Badge>
      );

      const text = getByText('Test');
      expect(text.props.className).toContain('font-label');
      expect(text.props.className).toContain('text-xs');
    });
  });

  describe('Styling', () => {
    it('should apply default rounded-full style', () => {
      const { getByTestId } = render(
        <Badge testID="badge">Badge</Badge>
      );

      const badge = getByTestId('badge');
      expect(badge.props.className).toContain('rounded-full');
    });

    it('should apply default padding', () => {
      const { getByTestId } = render(
        <Badge testID="badge">Badge</Badge>
      );

      const badge = getByTestId('badge');
      expect(badge.props.className).toContain('px-2.5');
      expect(badge.props.className).toContain('py-0.5');
    });

    it('should apply border style', () => {
      const { getByTestId } = render(
        <Badge testID="badge">Badge</Badge>
      );

      const badge = getByTestId('badge');
      expect(badge.props.className).toContain('border');
    });

    it('should accept custom className', () => {
      const { getByTestId } = render(
        <Badge testID="badge" className="mx-4 my-2">Badge</Badge>
      );

      const badge = getByTestId('badge');
      expect(badge.props.className).toContain('mx-4');
      expect(badge.props.className).toContain('my-2');
    });
  });

  describe('Accessibility', () => {
    it('should pass through accessibility props', () => {
      const { getByTestId } = render(
        <Badge
          testID="badge"
          accessibilityLabel="Status badge"
          accessibilityHint="Indicates current status"
        >
          Active
        </Badge>
      );

      const badge = getByTestId('badge');
      expect(badge.props.accessibilityLabel).toBe('Status badge');
      expect(badge.props.accessibilityHint).toBe('Indicates current status');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty children', () => {
      const { getByTestId } = render(
        <Badge testID="badge"></Badge>
      );

      expect(getByTestId('badge')).toBeTruthy();
    });

    it('should handle long text content', () => {
      const longText = 'This is a very long badge text that might wrap';
      const { getByText } = render(
        <Badge>{longText}</Badge>
      );

      expect(getByText(longText)).toBeTruthy();
    });

    it('should handle numeric children', () => {
      const { getByText } = render(
        <Badge>42</Badge>
      );

      expect(getByText('42')).toBeTruthy();
    });
  });
});
