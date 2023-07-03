import { ShapeTileContent } from './ShapeTileContent.jsx';
import { ShieldTileContent } from './ShieldTileContent.jsx';
import { UnknownTileContent } from './UnknownTileContent.jsx';
import { FaceTileContent } from "./FaceTileContent.jsx";

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
  },
  {
    id: 'faces',
    label: 'Faces',
    renderer: FaceTileContent,
    features: [
      'skin color',
      'hair style',
      'hair color',
      'eyes color'
    ]
  }
];

export const RENDERERS = THEMES.reduce((map, theme) => {
  map[theme.id] = theme.renderer;

  return map;
}, {
  unknown: UnknownTileContent // extra Idle renderer
});
