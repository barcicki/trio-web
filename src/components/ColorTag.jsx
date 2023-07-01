import { invertColor } from '@/utils/color.js';

import './ColorTag.css';
import classNames from 'classnames';

export function ColorTag({ className, color, children, onClick }) {
  return (
    <div className={classNames({
      button: true,
      'color-tag': true,
      [className]: !!className,
      clickable: !!onClick
    })} style={{ backgroundColor: color, color: color && invertColor(color) }} onClick={onClick}>
      {children}
    </div>
  );
}
