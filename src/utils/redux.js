import { createSlice } from '@reduxjs/toolkit';
import { loadData, saveData } from '@/utils/storage.js';

export function createSliceWithStorage(options) {
  const sliceOptions = {
    ...options,

    // wrap initialState with a function that *has* data from local storage as first argument
    initialState: () => {
      if (typeof options.initialState === 'function') {
        return options.initialState(loadData(options.name));
      } else if (typeof options.initialState === 'undefined') {
        return loadData(options.name);
      }

      return options.initialState;
    }
  };

  const result = createSlice(sliceOptions);
  const converter = typeof options.convert === 'function' ? options.convert : (item) => item;

  result.synchronizer = (nextState, prevState) => {
    if (nextState[options.name] !== prevState?.[options.name]) {
      saveData(options.name, converter(nextState[options.name]));
    }
  };

  return result;
}

export function createSynchronizerMiddleware(synchronizers) {
  return (store) => {
    // initial save in storage
    synchronize(store.getState());

    return (next) => (action) => {
      const prevState = store.getState();
      const result = next(action);
      const nextState = store.getState();

      synchronize(nextState, prevState);

      return result;
    };
  };

  function synchronize(nextState, prevState) {
    synchronizers.forEach((synchronizer) => synchronizer(nextState, prevState));
  }
}
