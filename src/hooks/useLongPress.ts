import { useRef, useEffect } from 'react';

const useLongPress = (
  onLongPress: (dataset?: DOMStringMap) => void,
  delay = 500
) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = (dataset?: DOMStringMap) => {
    timeoutRef.current = setTimeout(() => {
      onLongPress(dataset);
    }, delay);
  };

  const clear = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const setRef = (el: HTMLDivElement | HTMLDivElement[] | null) => {
    if (Array.isArray(el)) {
      // 多个元素情况
      el.forEach(element => {
        if (element) bindLongPress(element);
      });
    } else if (el) {
      // 单一元素情况
      bindLongPress(el);
    }
  };

  const bindLongPress = (element: HTMLDivElement) => {
    const handleMouseDown = (e: MouseEvent) => start((e.currentTarget as HTMLElement).dataset);
    const handleTouchStart = (e: TouchEvent) => start((e.currentTarget as HTMLElement).dataset);

    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mouseup', clear);
    element.addEventListener('mouseleave', clear);
    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchend', clear);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mouseup', clear);
      element.removeEventListener('mouseleave', clear);
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', clear);
    };
  };

  return setRef;
};

export default useLongPress;
