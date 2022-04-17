import React, { useCallback, useEffect, useRef, useState } from 'react';
import Pane from './Pane';
import Resizer from './Resizer';
import './index.css';
import useMemoFn from '../hooks/useMemoFn';
import useRect, { defaultDomRect, TRect } from '../hooks/useRect';
import { useMeasure } from 'react-use';

export type TSplit = 'vertical' | 'horizontal';
type TUnit = '%' | 'px';
type TOrder = 0 | 1;

interface IProps {
  split?: TSplit;
  percentage?: boolean;
  unit?: TUnit;
  /**参数对应的面板 */
  order?: TOrder;
  /**反转面板顺序 */
  reverse?: boolean;
  initSize: number;
  minSize?: [number, number];
  maxSize?: number;
  ref?: React.Ref<HTMLDivElement> | null;
  /**设置是否可以收起 */
  collapse?: boolean;
  /** 收起触发的临界点 */
  collapseThreshold?: 0.3 | 0.5 | 0.7;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export default function SplitPane(props: IProps) {
  const {
    ref = null,
    split = 'vertical',
    order = 0,
    percentage = false,
    reverse = false,
    initSize,
    minSize = [100, 100],
    collapse = true,
    collapseThreshold = 0.5,
    className = '',
    children,
  } = props;

  const [paneSize, setPaneSize] = useState(initSize);
  const primaryPercent = useRef(0);
  const isMounted = useRef(false);
  const isFixed = useRef(false);

  const minSize0 = minSize[0];
  const minSize1 = minSize[1];

  const [splitPaneRef, splitPaneRect] = useRect<HTMLDivElement>();
  const [firstPaneRef, firstPaneRect] = useRect<HTMLDivElement>();
  const resizerRef = useRef<HTMLDivElement>(null);
  const [lastPaneRef, lastPaneRect] = useRect<HTMLDivElement>();

  const [first, last] = React.Children.toArray(children);

  const getPaneSize = useMemoFn(({ mousePos }: { mousePos?: MouseEvent }) => {
    const splitPaneRect: TRect =
      splitPaneRef.current?.getBoundingClientRect() || defaultDomRect;
    const resizerRect: TRect =
      resizerRef.current?.getBoundingClientRect() || defaultDomRect;

    let splitPaneSize =
      split === 'vertical' ? splitPaneRect.width : splitPaneRect.height;
    let resizerSize =
      split === 'vertical' ? resizerRect.width : resizerRect.height;

    if (!isMounted.current) {
      primaryPercent.current = initSize / splitPaneRect.width;
      return initSize;
    }
    console.log('mounted!');

    let restSize = splitPaneSize - resizerSize - paneSize;

    let primarySize = order === 0 ? paneSize : restSize;

    let secondarySize = order === 0 ? restSize : paneSize;

    let offset = 0;

    if (mousePos) {
      offset =
        split === 'vertical'
          ? mousePos.clientX - resizerRect.left
          : mousePos.clientY - resizerRect.top;
      //   console.log(offset);
      reverse ? (primarySize -= offset) : (primarySize += offset);
      secondarySize = splitPaneSize - resizerSize - primarySize;
    }

    // deal with minSize situation
    if (primarySize < minSize0) {
      primarySize = Math.max(minSize0, primarySize);
    } else if (secondarySize < minSize1) {
      primarySize = Math.min(
        primarySize,
        splitPaneSize - minSize1 - resizerSize
      );
    }

    // deal with collapse situation
    // if (collapse && (primarySize === minSize0 || secondarySize === minSize1)) {
    //   const threshold0 = collapseThreshold * minSize0;

    //   const threshold1 = collapseThreshold * minSize1;

    //   const absOffset = Math.abs(offset);

    //   // collapse left or top
    //   if (offset < 0) {
    //     if (absOffset >= threshold0 && !isFixed.current) {
    //       primarySize = threshold0;
    //       //   isFixed.current = true;
    //     }
    //   } else {
    //     if (absOffset >= threshold1 && !isFixed.current) {
    //       primarySize = splitPaneSize - threshold1 - resizerSize;
    //       //   isFixed.current = true;
    //     }
    //   }
    // }

    // deal with expand situation
    if (isFixed.current) {
    }

    // set current primary pane percentage
    primaryPercent.current = primarySize / splitPaneSize;

    return primarySize;
  });

  const handleResize = (e: UIEvent) => {
    e.preventDefault();
    // 百分比换算
    if (percentage) {
      const splitPaneRect: TRect =
        splitPaneRef.current?.getBoundingClientRect() || defaultDomRect;

      let splitPaneSize =
        split === 'vertical' ? splitPaneRect.width : splitPaneRect.height;
      setPaneSize(primaryPercent.current * splitPaneSize);
    }
  };
  const handleMouseMove = useMemoFn((e: MouseEvent) => {
    e.preventDefault();
    const tempSize = getPaneSize({ mousePos: e });
    console.log(
      '%c [ tempSize ]-160',
      'font-size:13px; background:pink; color:#bf2c9f;',
      tempSize
    );
    setPaneSize(tempSize);
  });

  const handleMouseDown = useMemoFn((e: React.MouseEvent) => {
    console.log('down', e);
    window.addEventListener('mousemove', handleMouseMove);
  });

  const handleMouseUp = useMemoFn((e: MouseEvent) => {
    console.log('up');
    window.removeEventListener('mousemove', handleMouseMove);
  });

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {};
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {};
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {};

  useEffect(() => {
    isMounted.current = true;

    window.addEventListener('resize', handleResize);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // deal with when split change size too small situation
  useEffect(() => {
    setPaneSize(getPaneSize({}));
  }, [split]);

  return (
    <section
      ref={splitPaneRef}
      className={`${className} split-pane split-pane--${split} ${
        reverse ? `split-pane--reverse` : ''
      }`}
    >
      <Pane
        forwardRef={firstPaneRef}
        primary={!!order}
        split={split}
        size={paneSize}
      >
        {first}
      </Pane>
      <Resizer
        forwardRef={resizerRef}
        split={split}
        onMouseDown={handleMouseDown}
      />
      <Pane
        forwardRef={lastPaneRef}
        primary={!!!order}
        split={split}
        size={paneSize}
      >
        {last}
      </Pane>
    </section>
  );
}
