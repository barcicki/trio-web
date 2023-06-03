const ALPHABET = 'abcdefghijklmnopqrstuvwyxz';

export function createDeck({
  noOfFeatures = 4,
  noOfFeatureValues = 3
} = {}) {
  if (noOfFeatureValues > ALPHABET.length) {
    throw new Error('Too many feature values');
  }

  let result = [''];

  for (let i = 0; i < noOfFeatures; i++) {
    const nextResult = [];

    for (let j = 0; j < result.length; j++) {
      const word = result[j];

      for (let k = 0; k < noOfFeatureValues; k++) {
        nextResult.push(word + ALPHABET[k]);
      }
    }

    result = nextResult;
  }

  return result;
}
