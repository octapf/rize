import React from 'react';
import { Text } from '@/components/ui/Text';
import { render } from '@testing-library/react-native';
import { Card, CardHeader, CardContent, CardActions } from '../Card';
;

describe('Card', () => {
  describe('Card Component', () => {
    it('should render children correctly', () => {
      const { getByText } = render(
        <Card>
          <Text>Card Content</Text>
        </Card>
      );

      expect(getByText('Card Content')).toBeTruthy();
    });

    it('should apply default styles', () => {
      const { getByTestId } = render(
        <Card testID="card">
          <Text>Content</Text>
        </Card>
      );

      const card = getByTestId('card');
      expect(card.props.className).toContain('bg-white');
      expect(card.props.className).toContain('rounded-xl');
      expect(card.props.className).toContain('p-4');
      expect(card.props.className).toContain('shadow-sm');
    });

    it('should accept custom className', () => {
      const { getByTestId } = render(
        <Card testID="card" className="bg-primary">
          <Text>Content</Text>
        </Card>
      );

      const card = getByTestId('card');
      expect(card.props.className).toContain('bg-primary');
    });

    it('should pass through additional props', () => {
      const { getByTestId } = render(
        <Card testID="custom-card" accessibilityLabel="Test card">
          <Text>Content</Text>
        </Card>
      );

      const card = getByTestId('custom-card');
      expect(card.props.accessibilityLabel).toBe('Test card');
    });
  });

  describe('CardHeader Component', () => {
    it('should render children correctly', () => {
      const { getByText } = render(
        <CardHeader>
          <Text>Header Title</Text>
        </CardHeader>
      );

      expect(getByText('Header Title')).toBeTruthy();
    });

    it('should apply default margin bottom', () => {
      const { getByTestId } = render(
        <CardHeader testID="header">
          <Text>Header</Text>
        </CardHeader>
      );

      const header = getByTestId('header');
      expect(header.props.className).toContain('mb-3');
    });

    it('should accept custom className', () => {
      const { getByTestId } = render(
        <CardHeader testID="header" className="mb-6 border-b">
          <Text>Header</Text>
        </CardHeader>
      );

      const header = getByTestId('header');
      expect(header.props.className).toContain('mb-6');
      expect(header.props.className).toContain('border-b');
    });
  });

  describe('CardContent Component', () => {
    it('should render children correctly', () => {
      const { getByText } = render(
        <CardContent>
          <Text>Content Body</Text>
        </CardContent>
      );

      expect(getByText('Content Body')).toBeTruthy();
    });

    it('should accept custom className', () => {
      const { getByTestId } = render(
        <CardContent testID="content" className="p-4 bg-gray-50">
          <Text>Content</Text>
        </CardContent>
      );

      const content = getByTestId('content');
      expect(content.props.className).toContain('p-4');
      expect(content.props.className).toContain('bg-gray-50');
    });

    it('should pass through additional props', () => {
      const { getByTestId } = render(
        <CardContent testID="content" accessibilityRole="summary">
          <Text>Content</Text>
        </CardContent>
      );

      const content = getByTestId('content');
      expect(content.props.accessibilityRole).toBe('summary');
    });
  });

  describe('CardActions Component', () => {
    it('should render children correctly', () => {
      const { getByText } = render(
        <CardActions>
          <Text>Action Button</Text>
        </CardActions>
      );

      expect(getByText('Action Button')).toBeTruthy();
    });

    it('should apply default flex-row and gap styles', () => {
      const { getByTestId } = render(
        <CardActions testID="actions">
          <Text>Button</Text>
        </CardActions>
      );

      const actions = getByTestId('actions');
      expect(actions.props.className).toContain('flex-row');
      expect(actions.props.className).toContain('gap-2');
      expect(actions.props.className).toContain('mt-3');
    });

    it('should accept custom className', () => {
      const { getByTestId } = render(
        <CardActions testID="actions" className="justify-end gap-4">
          <Text>Button</Text>
        </CardActions>
      );

      const actions = getByTestId('actions');
      expect(actions.props.className).toContain('justify-end');
      expect(actions.props.className).toContain('gap-4');
    });
  });

  describe('Complete Card Composition', () => {
    it('should render a complete card with all components', () => {
      const { getByText, getByTestId } = render(
        <Card testID="full-card">
          <CardHeader>
            <Text>Card Title</Text>
          </CardHeader>
          <CardContent>
            <Text>Card body content goes here</Text>
          </CardContent>
          <CardActions>
            <Text>Action 1</Text>
            <Text>Action 2</Text>
          </CardActions>
        </Card>
      );

      expect(getByTestId('full-card')).toBeTruthy();
      expect(getByText('Card Title')).toBeTruthy();
      expect(getByText('Card body content goes here')).toBeTruthy();
      expect(getByText('Action 1')).toBeTruthy();
      expect(getByText('Action 2')).toBeTruthy();
    });

    it('should work with partial composition', () => {
      const { getByText, queryByText } = render(
        <Card>
          <CardHeader>
            <Text>Only Header</Text>
          </CardHeader>
        </Card>
      );

      expect(getByText('Only Header')).toBeTruthy();
      expect(queryByText('Content')).toBeNull();
    });
  });
});

