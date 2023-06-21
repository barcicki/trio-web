import { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react';
import { motion, useAnimate } from 'framer-motion';
import classNames from 'classnames';
import { useIsFirstRender } from '@/hooks/useIsFirstRender.js';
import { RENDERERS, THEMES } from './TileThemes/themes.js';

export {
  THEMES
};

export const Tile = forwardRef(function Tile({ tile, isSelected, onSelect, theme }, ref) {
  const isFirstRender = useIsFirstRender();
  const [content, setContent] = useState();
  const [scope, animate] = useAnimate();
  const Renderer = RENDERERS[theme] || THEMES[0].renderer;

  const onSelectTile = useCallback((event) => onSelect(tile, event), [onSelect, tile]);

  useImperativeHandle(ref, () => {
    return {
      async shake() {
        await animate([
          [scope.current, { rotateY: 60 }],
          [scope.current, { rotateY: -60 }],
          [scope.current, { rotateY: 60 }],
          [scope.current, { rotateY: -60 }],
          [scope.current, { rotateY: 0 }]
        ], { duration: 0.5});
      }
    };
  });

  useMemo(() => {
    if (isFirstRender) {
      setContent(<Renderer tile={tile}/>);
      return;
    }

    animate(scope.current, { rotateY: 90 }, { ease: 'easeIn' })
      .then(() => {
        setContent(<Renderer tile={tile}/>);
        animate(scope.current, { rotateY: 0 }, { ease: 'easeOut' });
      });

  }, [tile, theme]);

  const animations = {
    initial: { opacity: 0, rotateY: 0 },
    animate: { opacity: 1, rotateY: 0 },
    exit: { opacity: 0, rotateY: 0 }
  };

  return (
    <motion.svg {...animations} className={classNames({selected: isSelected, tile: true})} onPointerDown={onSelectTile} viewBox="0 0 200 200" ref={scope} color="#000">
      {content}
    </motion.svg>
  );
});
