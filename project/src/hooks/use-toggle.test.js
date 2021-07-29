import {renderHook, act} from '@testing-library/react-hooks';
import useToggle from './use-toggle.js';

describe('Hook: useToggle', () => {

  let activeFlag;

  it('should return array with 3 elements', () => {
    activeFlag = true;

    const {result} = renderHook(() =>
      useToggle(activeFlag),
    );

    const [value, toggleValue, setValue] = result.current;

    expect(result.current).toHaveLength(3);
    expect(typeof(value)).toBe('boolean');
    expect(toggleValue).toBeInstanceOf(Function);
    expect(setValue).toBeInstanceOf(Function);
  });

  it('should return toggle is false', () => {
    activeFlag = true;

    const {result} = renderHook(() =>
      useToggle(activeFlag),
    );

    const [, toggleValue] = result.current;
    act(() => toggleValue());

    const [value] = result.current;

    expect(value).toBe(false);
  });

  it('should return toggle is true', () => {
    activeFlag = false;

    const {result} = renderHook(() =>
      useToggle(activeFlag),
    );

    const [, toggleValue] = result.current;

    act(() => toggleValue());

    const [value] = result.current;

    expect(value).toBe(true);
  });
});
