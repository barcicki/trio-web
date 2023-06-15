import classNames from 'classnames';

export function Tile({ tile, isSelected, onClick }) {
  return (
    <button className={classNames({
      selected: isSelected
    })} onClick={onClick}>
      {tile}
    </button>
  );
}
