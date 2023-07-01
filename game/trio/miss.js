export function handleMatchMiss(state) {
  return {
    ...state,
    selected: [],
    missed: [
      ...state.missed,
      state.selected
    ]
  };
}
