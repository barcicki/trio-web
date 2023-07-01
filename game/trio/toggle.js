export function toggleTile(state, target) {
  const { table, selected } = state;

  if (!table.includes(target)) {
    return state;
  }

  // tile is selected, should be deselected
  if (selected.includes(target)) {
    return {
      ...state,
      selected: selected.filter((tile) => tile !== target)
    };
  }

  const newSelected = selected.concat(target);

  return {
    ...state,
    selected: newSelected
  };
}
