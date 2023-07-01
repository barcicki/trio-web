import { toStyleArray } from '@game/trio';

const COLORS = [
  '#729E07',
  '#BB0A21',
  '#3AAED8'
];

const SHAPES = [
  Triangle,
  Circle,
  Square
];

export function ShapeTileContent({ tile }) {
  const [color, count, pattern, shape] = toStyleArray(tile);
  const props = {};

  let patternId = `pattern-${tile}`;

  switch (pattern) {
    case 0:
      props.fill = COLORS[color];
      props.stroke = COLORS[color];
      props.strokeWidth = 5;
      break;
    case 1:
      patternId = `pattern-${tile}`;
      props.fill = `url(#${patternId})`;
      props.stroke = COLORS[color];
      props.strokeWidth = 3;
      break;
    case 2:
      props.fill = "none";
      props.stroke = COLORS[color];
      props.strokeWidth = 5;
      break;
  }

  const Renderer = SHAPES[shape];
  const content = [];

  switch (count) {
    case 0:
      content.push({
        x: 100,
        y: 100,
        size: 100
      });
      break;
    case 1:
      content.push({
        x: 60,
        y: 60,
        size: 65
      }, {
        x: 140,
        y: 140,
        size: 65
      });
      break;
    case 2:
      content.push({
        x: 55,
        y: 60,
        size: 60
      }, {
        x: 145,
        y: 60,
        size: 60
      }, {
        x: 100,
        y: 140,
        size: 60
      });
      break;
  }

  return (
    <>
      {patternId && (<pattern id={patternId} patternContentUnits="objectBoundingBox" width=".2" height=".2" patternTransform="rotate(30)">
        <line x1="0" y="0" x2="0" y2="1" stroke={props.stroke} strokeWidth=".2" />
      </pattern>)}

      <rect className="tile-bg" fill="#fff" stroke="currentColor" strokeWidth="5" rx="20" ry="20" x="5" y="5" width="190" height="190"></rect>
      {content.map((size, index) => (<Renderer key={index} {...size} {...props} />))}
    </>
  );
}

function Triangle({ x, y, size, ...props }) {
  const half = size / 2;
  const height = (Math.sin(Math.PI / 3) * size) / 2;
  const vertices = [
    [x, y - height],
    [x - half, y + height],
    [x + half, y + height],
  ];

  const d = `M ${vertices.map((p) => p.join(',')).join(' ')} Z`;

  return <path d={d} {...props} />;
}

function Circle({ x, y, size, ...props }) {
  return <circle cx={x} cy={y} r={size / 2} {...props} />;
}

function Square({ x, y, size, ...props }) {
  const half = size / 2;
  const radius = size / 10;

  return <rect x={x - half} y={y - half} rx={radius} ry={radius} width={size} height={size} {...props} />;
}
