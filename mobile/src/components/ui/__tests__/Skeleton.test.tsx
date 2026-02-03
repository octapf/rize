import React from 'react';
import { render } from '@testing-library/react-native';
import { Skeleton, SkeletonWorkoutCard, SkeletonExerciseList } from '../Skeleton';
import { Animated } from 'react-native';

describe('Skeleton', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('Rendering', () => {
    it('should render skeleton component', () => {
      const { UNSAFE_getByType } = render(<Skeleton />);
      
      const animatedView = UNSAFE_getByType(Animated.View);
      expect(animatedView).toBeTruthy();
    });

    it('should render with default width', () => {
      const { UNSAFE_getByType } = render(<Skeleton />);
      
      const animatedView = UNSAFE_getByType(Animated.View);
      const styles = animatedView.props.style;
      const flattenedStyle = Array.isArray(styles) 
        ? Object.assign({}, ...styles.filter(s => s)) 
        : styles;
      expect(flattenedStyle.width).toBe('100%');
    });

    it('should render with default height', () => {
      const { UNSAFE_getByType } = render(<Skeleton />);
      
      const animatedView = UNSAFE_getByType(Animated.View);
      const styles = animatedView.props.style;
      const flattenedStyle = Array.isArray(styles) 
        ? Object.assign({}, ...styles.filter(s => s)) 
        : styles;
      expect(flattenedStyle.height).toBe(16);
    });

    it('should render with default border radius', () => {
      const { UNSAFE_getByType } = render(<Skeleton />);
      
      const animatedView = UNSAFE_getByType(Animated.View);
      const styles = animatedView.props.style;
      const flattenedStyle = Array.isArray(styles) 
        ? Object.assign({}, ...styles.filter(s => s)) 
        : styles;
      expect(flattenedStyle.borderRadius).toBe(4);
    });
  });

  describe('Custom Dimensions', () => {
    it('should accept custom width as number', () => {
      const { UNSAFE_getByType } = render(<Skeleton width={200} />);
      
      const animatedView = UNSAFE_getByType(Animated.View);
      expect(animatedView.props.style).toContainEqual(
        expect.objectContaining({ width: 200 })
      );
    });

    it('should accept custom width as percentage', () => {
      const { UNSAFE_getByType } = render(<Skeleton width="50%" />);
      
      const animatedView = UNSAFE_getByType(Animated.View);
      expect(animatedView.props.style).toContainEqual(
        expect.objectContaining({ width: '50%' })
      );
    });

    it('should accept custom height', () => {
      const { UNSAFE_getByType } = render(<Skeleton height={100} />);
      
      const animatedView = UNSAFE_getByType(Animated.View);
      expect(animatedView.props.style).toContainEqual(
        expect.objectContaining({ height: 100 })
      );
    });

    it('should accept custom border radius', () => {
      const { UNSAFE_getByType } = render(<Skeleton borderRadius={12} />);
      
      const animatedView = UNSAFE_getByType(Animated.View);
      expect(animatedView.props.style).toContainEqual(
        expect.objectContaining({ borderRadius: 12 })
      );
    });

    it('should handle all custom props together', () => {
      const { UNSAFE_getByType } = render(
        <Skeleton width={150} height={80} borderRadius={8} />
      );
      
      const animatedView = UNSAFE_getByType(Animated.View);
      expect(animatedView.props.style).toContainEqual(
        expect.objectContaining({
          width: 150,
          height: 80,
          borderRadius: 8,
        })
      );
    });
  });

  describe('Custom Styling', () => {
    it('should accept custom style prop', () => {
      const customStyle = { marginTop: 10, marginBottom: 20 };
      const { UNSAFE_getByType } = render(<Skeleton style={customStyle} />);
      
      const animatedView = UNSAFE_getByType(Animated.View);
      expect(animatedView.props.style).toContainEqual(customStyle);
    });
  });

  describe('Animation', () => {
    it('should have opacity animation', () => {
      const { UNSAFE_getByType } = render(<Skeleton />);
      
      const animatedView = UNSAFE_getByType(Animated.View);
      expect(animatedView.props.style).toContainEqual(
        expect.objectContaining({ opacity: expect.any(Object) })
      );
    });
  });
});

describe('SkeletonWorkoutCard', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('Rendering', () => {
    it('should render workout card skeleton', () => {
      const { UNSAFE_getAllByType } = render(<SkeletonWorkoutCard />);
      
      const skeletons = UNSAFE_getAllByType(Animated.View);
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it('should render multiple skeleton elements', () => {
      const { UNSAFE_getAllByType } = render(<SkeletonWorkoutCard />);
      
      const skeletons = UNSAFE_getAllByType(Animated.View);
      // Should have multiple skeleton elements for header, content, etc.
      expect(skeletons.length).toBeGreaterThanOrEqual(2);
    });
  });
});

describe('SkeletonExerciseList', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('Rendering', () => {
    it('should render exercise list skeleton', () => {
      const { UNSAFE_getAllByType } = render(<SkeletonExerciseList />);
      
      const skeletons = UNSAFE_getAllByType(Animated.View);
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it('should render multiple exercise items', () => {
      const { UNSAFE_getAllByType } = render(<SkeletonExerciseList />);
      
      const skeletons = UNSAFE_getAllByType(Animated.View);
      // Should render multiple items (default 3)
      expect(skeletons.length).toBeGreaterThanOrEqual(3);
    });

    it('should accept custom count', () => {
      const { UNSAFE_getAllByType } = render(<SkeletonExerciseList count={5} />);
      
      const skeletons = UNSAFE_getAllByType(Animated.View);
      // Should render more items when count is specified
      expect(skeletons.length).toBeGreaterThanOrEqual(5);
    });
  });
});

describe('Skeleton Edge Cases', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should handle zero width', () => {
    const { UNSAFE_getByType } = render(<Skeleton width={0} />);
    
    const animatedView = UNSAFE_getByType(Animated.View);
    expect(animatedView.props.style).toContainEqual(
      expect.objectContaining({ width: 0 })
    );
  });

  it('should handle zero height', () => {
    const { UNSAFE_getByType } = render(<Skeleton height={0} />);
    
    const animatedView = UNSAFE_getByType(Animated.View);
    expect(animatedView.props.style).toContainEqual(
      expect.objectContaining({ height: 0 })
    );
  });

  it('should handle zero border radius', () => {
    const { UNSAFE_getByType } = render(<Skeleton borderRadius={0} />);
    
    const animatedView = UNSAFE_getByType(Animated.View);
    expect(animatedView.props.style).toContainEqual(
      expect.objectContaining({ borderRadius: 0 })
    );
  });

  it('should handle very large dimensions', () => {
    const { UNSAFE_getByType } = render(
      <Skeleton width={10000} height={5000} />
    );
    
    const animatedView = UNSAFE_getByType(Animated.View);
    expect(animatedView.props.style).toContainEqual(
      expect.objectContaining({ width: 10000, height: 5000 })
    );
  });
});
