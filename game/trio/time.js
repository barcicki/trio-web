export function startGame(state) {
  if (state.started) {
    return state;
  }

  return {
    ...state,
    started: Date.now() - (state.duration ?? 0)
  };
}

export function startGameWithTimeLimit(state, limit) {
  if (!limit) {
    return startGame(state);
  }

  if ((state.duration ?? 0) > limit) {
    return {
      ...state,
      ended: true
    };
  }

  return {
    ...startGame(state),
    remaining: limit - (state.duration ?? 0)
  };
}

export function endGame(state) {
  return {
    ...stopGame(state),
    ended: true
  };
}

export function stopGame(state) {
  return {
    ...state,
    started: false,
    duration: getDuration(state)
  };
}

export function getDuration(state) {
  return state.started ? Date.now() - state.started : (state.duration ?? 0);
}
