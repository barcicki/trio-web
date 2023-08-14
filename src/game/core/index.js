import { permutation, combination } from '../utils/index.js';

export function createCore({
  totalFeatures = 4,
  values = ['0', '1', '2'],
} = {}) {
  const totalValues = values.length;

  if (totalFeatures < 2) {
    throw new Error('Too few features - at least 2 are needed to make sense');
  }

  if (totalValues < 3) {
    throw new Error('Too few feature values - at least 3 make sense');
  }

  const deck = generateDeck();
  const matches = generateMatches();

  return {
    getDeck,
    isMatch,
    canMatch,
    hasMatch,
    getMatches,
    getMatchingTile,
    getMatchError,
    getFeatureTiles,
    getSharedFeatures,
    countMatches,
    toStyleArray
  };

  function generateDeck() {
    let result = [''];

    for (let i = 0; i < totalFeatures; i++) {
      const nextResult = [];

      for (let j = 0; j < result.length; j++) {
        const tile = result[j];

        for (let k = 0; k < totalValues; k++) {
          nextResult.push(tile + String(values[k]));
        }
      }

      result = nextResult;
    }

    return result;
  }

  function generateMatches() {
    const set = new Set();

    for (let i = 0; i < totalValues; i++) {
      set.add(''.padStart(totalValues, values[i]));
    }

    for (const variant of permutation(values)) {
      set.add(variant.join(''));
    }

    return set;
  }
  function getDeck() {
    return deck.slice();
  }

  function canMatch(tiles) {
    return tiles?.length === totalValues;
  }

  function isMatch(tiles) {
    if (!canMatch(tiles)) {
      return false;
    }

    for (let i = 0; i < totalFeatures; i++) {
      let feat = '';

      for (let j = 0; j < totalValues; j++) {
        feat += tiles[j][i];
      }

      if (!matches.has(feat)) {
        return false;
      }
    }

    return true;
  }

  function hasMatch(tiles) {
    const count = tiles?.length;

    if (count < totalValues) {
      return false;
    }

    if (count === totalValues) {
      return isMatch(tiles);
    }

    for (const set of combination(tiles, totalValues)) {
      if (isMatch(set)) {
        return true;
      }
    }

    return false;
  }

  function countMatches(tiles) {
    return getMatches(tiles).length;
  }

  function getMatches(tiles) {
    const count = tiles?.length ?? 0;

    if (count < totalValues) {
      return [];
    }

    if (count === totalValues) {
      return isMatch(tiles) ? [tiles.slice()] : [];
    }

    const matches = [];

    for (const set of combination(tiles, totalValues)) {
      if (isMatch(set)) {
        matches.push(set);
      }
    }

    return matches;
  }

  function getMatchingTile(tiles) {
    const count = tiles?.length;

    if (count !== totalValues - 1) {
      return null;
    }

    let result = '';

    mainLoop:
    for (let i = 0; i < totalFeatures; i++) {
      let feat = '';

      for (let j = 0; j < count; j++) {
        feat += tiles[j][i];
      }

      for (let j = 0; j < totalValues; j++) {
        const val = values[j];
        const next = feat + val;

        if (matches.has(next)) {
          result += val;
          continue mainLoop;
        }
      }

      return null;
    }

    return result;
  }

  function getMatchError(tiles) {
    const count = tiles?.length;

    if (count !== totalValues) {
      return null;
    }

    const result = [];

    for (let i = 0; i < totalFeatures; i++) {
      const hist = values.reduce((map, val) => {
        map[val] = 0;
        return map;
      }, {});

      for (let j = 0; j < count; j++) {
        hist[tiles[j][i]]++;
      }

      const error = [];

      for (let j = 0; j < totalValues; j++) {
        const val = values[j];
        const occ = hist[val];

        if (occ > 1 && occ < totalValues) {
          error.push(val);
        }
      }

      result.push(error.length ? error : null);
    }

    return result;
  }

  function toStyleArray(tile) {
    return tile.split('').map((char) => values.indexOf(char));
  }

  function getFeatureTiles(index, tile) {
    return values.map((value) => {
      let result = '';

      for (let i = 0; i < totalFeatures; i++) {
        result += (i === index) ? value : (tile?.[i] || '-');
      }

      return result;
    });
  }

  function getSharedFeatures(tiles) {
    if (!isMatch(tiles)) {
      return -1;
    }

    let result = 0;

    for (let i = 0; i < totalFeatures; i++) {
      if (tiles[0][i] === tiles[1][i]) {
        result += 1;
      }
    }

    return result;
  }
}
