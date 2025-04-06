import { useEffect, useRef } from 'react';

const useOutsideClick = <E extends HTMLElement = HTMLDivElement>(
  callback?: VoidFunction,
) => {
  const containerRef = useRef<E>(null);

  useEffect(() => {
    if (!callback || !containerRef.current) return;

    const mouseEventHandler = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', mouseEventHandler);

    return () => {
      document.removeEventListener('mousedown', mouseEventHandler);
    };
  }, [callback]);

  return containerRef;
};

export default useOutsideClick;
