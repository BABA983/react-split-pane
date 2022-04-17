import { useMemo, useState, useEffect, useRef, useLayoutEffect } from 'react';

export type TRect = Omit<DOMRect, 'toJSON'>;
export const defaultDomRect: TRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

export default function <T extends Element>(): [React.RefObject<T>, TRect] {
  // export default function <E extends Element>(): [(el: E) => void, TRect] {
  const ref = useRef<T>(null);
  //   const [el, ref] = useState<E | null>(null);
  const [rect, setRect] = useState<TRect>(defaultDomRect);

  const observer = useMemo(
    () =>
      new ResizeObserver((entries) => {
        if (entries[0]) {
          const { x, y, width, height, top, left, bottom, right } =
            entries[0].contentRect;
          setRect({ x, y, width, height, top, left, bottom, right });
        }
      }),
    []
  );

  useEffect(() => {
    if (!ref.current) return;
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, []);
  //   useEffect(() => {
  //     if (!el) return;
  //     console.log(el);
  //     console.log('observe');
  //     observer.observe(el);
  //     return () => {
  //       observer.disconnect();
  //     };
  //   }, [el]);

  return [ref, rect];
}
