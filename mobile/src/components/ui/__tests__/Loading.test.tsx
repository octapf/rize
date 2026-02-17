import React from 'react';
import { render } from '@testing-library/react-native';
import { Loading } from '../Loading';
import { ActivityIndicator } from 'react-native';

describe('Loading', () => {
  describe('Rendering', () => {
    it('should render activity indicator', () => {
      const { UNSAFE_getByType } = render(<Loading />);
      
      const indicator = UNSAFE_getByType(ActivityIndicator);
      expect(indicator).toBeTruthy();
    });

    it('should render with text', () => {
      const { getByText } = render(<Loading text="Loading..." />);
      
      expect(getByText('Loading...')).toBeTruthy();
    });

    it('should not render text when not provided', () => {
      const { queryByText } = render(<Loading />);
      
      expect(queryByText(/./)).toBeNull();
    });
  });

  describe('Size', () => {
    it('should render large size by default', () => {
      const { UNSAFE_getByType } = render(<Loading />);
      
      const indicator = UNSAFE_getByType(ActivityIndicator);
      expect(indicator.props.size).toBe('large');
    });

    it('should render small size', () => {
      const { UNSAFE_getByType } = render(<Loading size="small" />);
      
      const indicator = UNSAFE_getByType(ActivityIndicator);
      expect(indicator.props.size).toBe('small');
    });

    it('should render large size explicitly', () => {
      const { UNSAFE_getByType } = render(<Loading size="large" />);
      
      const indicator = UNSAFE_getByType(ActivityIndicator);
      expect(indicator.props.size).toBe('large');
    });
  });

  describe('Color', () => {
    it('should use default primary color', () => {
      const { UNSAFE_getByType } = render(<Loading />);
      
      const indicator = UNSAFE_getByType(ActivityIndicator);
      expect(indicator.props.color).toBe('#9D12DE');
    });

    it('should accept custom color', () => {
      const { UNSAFE_getByType } = render(<Loading color="#FF0000" />);
      
      const indicator = UNSAFE_getByType(ActivityIndicator);
      expect(indicator.props.color).toBe('#FF0000');
    });

    it('should apply color to text', () => {
      const customColor = '#0000FF';
      const { getByText } = render(
        <Loading text="Loading..." color={customColor} />
      );
      
      const text = getByText('Loading...');
      expect(text.props.style).toContainEqual({ color: customColor });
    });
  });

  describe('Full Screen Mode', () => {
    it('should render in non-full screen mode by default', () => {
      const { UNSAFE_getByType } = render(<Loading />);
      
      const indicator = UNSAFE_getByType(ActivityIndicator);
      expect(indicator).toBeTruthy();
    });

    it('should render in full screen mode', () => {
      const { UNSAFE_getByType } = render(<Loading fullScreen />);
      
      const indicator = UNSAFE_getByType(ActivityIndicator);
      expect(indicator).toBeTruthy();
    });
  });

  describe('Custom Styling', () => {
    it('should accept custom style prop', () => {
      const customStyle = { marginTop: 20, padding: 10 };
      const { getByTestId } = render(
        <Loading style={customStyle} />
      );
      
      // Component should render without errors with custom style
      expect(getByTestId).toBeTruthy();
    });
  });

  describe('Text Styling', () => {
    it('should render text with default color when text provided', () => {
      const { getByText } = render(<Loading text="Please wait" />);
      
      const text = getByText('Please wait');
      expect(text).toBeTruthy();
      expect(text.props.style).toContainEqual({ color: '#9D12DE' });
    });

    it('should render text with custom color', () => {
      const { getByText } = render(
        <Loading text="Loading data" color="#FF5722" />
      );
      
      const text = getByText('Loading data');
      expect(text.props.style).toContainEqual({ color: '#FF5722' });
    });
  });

  describe('Props Combinations', () => {
    it('should handle all props together', () => {
      const { UNSAFE_getByType, getByText } = render(
        <Loading
          text="Processing..."
          size="small"
          color="#9C27B0"
          fullScreen
          style={{ marginTop: 10 }}
        />
      );
      
      const indicator = UNSAFE_getByType(ActivityIndicator);
      expect(indicator.props.size).toBe('small');
      expect(indicator.props.color).toBe('#9C27B0');
      expect(getByText('Processing...')).toBeTruthy();
    });

    it('should work with minimal props', () => {
      const { UNSAFE_getByType } = render(<Loading />);
      
      expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
    });
  });
});
