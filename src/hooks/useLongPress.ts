import { useRef, useEffect } from 'react';

const useLongPress = (onLongPress: (id?: number) => void, delay = 500) => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const targetRef = useRef<HTMLDivElement | null>(null);
    
    const start = (id?: number) => {
        
        timeoutRef.current = setTimeout(() => {
            onLongPress(id);
        }, delay);
    };

    const clear = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        const element = targetRef.current;
        if (!element) return;

        const handleMouseDown = (e: MouseEvent) => {
            console.log(111)
            const id = Number((e.currentTarget as HTMLElement).dataset.id);
            start(id || undefined);
        };

        const handleTouchStart = (e: TouchEvent) => {
            console.log(111)
            const id = Number((e.currentTarget as HTMLElement).dataset.id);
            start(id || undefined);
        };

        element.addEventListener('mousedown', handleMouseDown);
        element.addEventListener('mouseup', clear);
        element.addEventListener('mouseleave', clear);

        // For touch devices
        element.addEventListener('touchstart', handleTouchStart);
        element.addEventListener('touchend', clear);

        return () => {
            element.removeEventListener('mousedown', handleMouseDown);
            element.removeEventListener('mouseup', clear);
            element.removeEventListener('mouseleave', clear);
            element.removeEventListener('touchstart', handleTouchStart);
            element.removeEventListener('touchend', clear);
        };
    }, [onLongPress, delay]);

    return targetRef;
};

export default useLongPress;
