import { ShapeTileContent } from './ShapeTileContent.jsx';
import { ShieldTileContent } from './ShieldTileContent.jsx';
import { IdleTileContent } from './IdleTileContent.jsx';

export const THEMES = [
  {
    id: 'shapes',
    label: 'Shapes',
    renderer: ShapeTileContent,
    features: [
      'color',
      'count',
      'pattern',
      'shape'
    ]
  },
  {
    id: 'shields',
    label: 'Shields',
    renderer: ShieldTileContent,
    features: [
      'shield type',
      'crest type',
      'shield color',
      'crest color'
    ]
  }
];

export const RENDERERS = THEMES.reduce((map, theme) => {
  map[theme.id] = theme.renderer;

  return map;
}, {
  idle: IdleTileContent // extra Idle renderer
});
