import { useEffect } from 'react';

interface IProps {
  forwardRef?: React.Ref<HTMLDivElement> | null;
  split?: 'vertical' | 'horizontal';
  onMouseDown: React.MouseEventHandler;
}
export default function Resizer(props: IProps) {
  const { forwardRef = null, split = 'vertical', onMouseDown } = props;
  useEffect(() => {
    // window.addEventListener('mouseup', onMouseUp);
    // window.addEventListener('mousedown', onMouseDown);

    return () => {
      //   window.removeEventListener('mouseup', onMouseUp);
      //   window.removeEventListener('mousedown', onMouseDown);
    };
  }, []);
  return (
    <div
      className={`split-pane__resizer split-pane__resizer--${split}`}
      ref={forwardRef}
      onMouseDown={onMouseDown}
    ></div>
  );
}
