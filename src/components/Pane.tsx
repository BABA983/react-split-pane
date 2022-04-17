import { TSplit } from '.';

interface IProps {
  forwardRef?: React.Ref<HTMLDivElement> | null;
  split: TSplit;
  size?: number;
  primary: boolean;
  percentage?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function Pane(props: IProps) {
  const {
    forwardRef = null,
    split,
    size = 0,
    percentage,
    primary,
    className = '',
    children,
  } = props;
  const unit = percentage ? '%' : 'px';
  const style: React.CSSProperties = {};
  split === 'vertical'
    ? (style.width = `${size}${unit}`)
    : (style.height = `${size}${unit}`);
  return (
    <div
      ref={forwardRef}
      className={`${className} split-pane__panel ${
        primary ? 'split-pane__panel--primary' : ''
      }`}
      style={style}
    >
      {children}
    </div>
  );
}
