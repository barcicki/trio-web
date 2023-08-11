export const MATCH_CASES = [
  {
    totalFeatures: 2,
    values: ['a', 'b', 'c'],
    tests: [
      {
        input: [],
        match: false,
        canMatch: false
      },
      {
        input: ['ab'],
        match: false,
        canMatch: false
      },
      {
        input: ['aa', 'ab'],
        match: false,
        canMatch: false
      },
      {
        input: ['aa', 'bb', 'cc'],
        match: true,
        canMatch: true
      },
      {
        input: ['aa', 'bb', 'cc', 'dd'],
        match: false,
        canMatch: false
      },
      {
        input: ['aa', 'bb', 'cc', 'ab'],
        match: false,
        canMatch: false
      },
      {
        input: ['aa', 'ab', 'ac'],
        match: true,
        canMatch: true
      },
      {
        input: ['aa', 'ab', 'cc'],
        match: false,
        canMatch: true
      },
      {
        input: ['ca', 'bb', 'ac'],
        match: true,
        canMatch: true
      },
      {
        input: ['ca', 'bb', 'cc'],
        match: false,
        canMatch: true
      }
    ]
  },
  {
    totalFeatures: 4,
    values: ['a', 'b', 'c', 'd'],
    tests: [
      {
        input: [],
        match: false,
        canMatch: false
      },
      {
        input: ['aaaa'],
        match: false,
        canMatch: false
      },
      {
        input: ['aaaa', 'bbbb'],
        match: false,
        canMatch: false
      },
      {
        input: ['aaaa', 'bbbb', 'cccc'],
        match: false,
        canMatch: false
      },
      {
        input: ['aaaa', 'bbbb', 'cccc', 'dddd'],
        match: true,
        canMatch: true
      },
      {
        input: ['aaaa', 'bbbb', 'cccc', 'dddd', 'abcd'],
        match: false,
        canMatch: false
      },
      {
        input: ['aaaa', 'bbba', 'ccca', 'ddda'],
        match: true,
        canMatch: true
      },
      {
        input: ['acaa', 'bcba', 'ccca', 'dcda'],
        match: true,
        canMatch: true
      },
      {
        input: ['aaaa', 'bbba', 'ccca', 'dcda'],
        match: false,
        canMatch: true
      },
      {
        input: ['dbca', 'dbcb', 'dbcc', 'dbcd'],
        match: true,
        canMatch: true
      }
    ]
  }
];

export const TABLE_CASES = [
  {
    totalFeatures: 2,
    values: ['a', 'b', 'c'],
    tests: [
      {
        input: [],
        matches: []
      },
      {
        input: ['ab'],
        matches: []
      },
      {
        input: ['aa', 'ab'],
        matches: []
      },
      {
        input: ['aa', 'bb', 'cc'],
        matches: [
          ['aa', 'bb', 'cc']
        ]
      },
      {
        input: ['aa', 'bb', 'cc', 'dd'],
        matches: [
          ['aa', 'bb', 'cc']
        ]
      },
      {
        input: ['aa', 'bb', 'cc', 'ab'],
        matches: [
          ['aa', 'bb', 'cc'],
        ]
      },
      {
        input: ['aa', 'bb', 'cc', 'ab', 'ac'],
        matches: [
          ['aa', 'bb', 'cc'],
          ['aa', 'ab', 'ac']
        ]
      },
      {
        input: ['aa', 'ab', 'bc', 'ba', 'cb'],
        matches: [
          ['aa', 'bc', 'cb']
        ]
      }
    ]
  },
  {
    totalFeatures: 4,
    values: ['a', 'b', 'c', 'd'],
    tests: [
      {
        input: [],
        matches: []
      },
      {
        input: ['aaaa'],
        matches: []
      },
      {
        input: ['aaaa', 'bbbb'],
        matches: []
      },
      {
        input: ['aaaa', 'bbbb', 'cccc'],
        matches: []
      },
      {
        input: ['aaaa', 'bbbb', 'cccc', 'dddd'],
        matches: [
          ['aaaa', 'bbbb', 'cccc', 'dddd']
        ]
      },
      {
        input: ['aaaa', 'bbbb', 'cccc', 'dddd', 'abcd'],
        matches: [
          ['aaaa', 'bbbb', 'cccc', 'dddd']
        ]
      },
      {
        input: ['aaaa', 'bbbb', 'cccc', 'dddd', 'abcd', 'acbd'],
        matches: [
          ['aaaa', 'bbbb', 'cccc', 'dddd']
        ]
      },
      {
        input: ['aaaa', 'bbbb', 'cccc', 'dddd', 'abcd', 'acbd', 'bbaa'],
        matches: [
          ['aaaa', 'bbbb', 'cccc', 'dddd']
        ]
      },
      {
        input: ['aaaa', 'bbbb', 'cccc', 'dddd', 'abcd', 'acbd', 'bbaa', 'ccbb'],
        matches: [
          ['aaaa', 'bbbb', 'cccc', 'dddd']
        ]
      },
      {
        input: ['aaaa', 'bbbb', 'cccc', 'dddd', 'abcd', 'acbd', 'bbaa', 'ccbb', 'aacc'],
        matches: [
          ['aaaa', 'bbbb', 'cccc', 'dddd'],
          ['dddd', 'bbaa', 'ccbb', 'aacc']
        ]
      },
      {
        input: ['aaaa', 'bbbb', 'cccc', 'ddcd', 'abcd', 'acbd', 'bbaa', 'ccbb', 'aacc'],
        matches: []
      },
      {
        input: ['aaaa', 'bbbb', 'cccc', 'dddd', 'aaab', 'aaac', 'aaad', 'cccb', 'dddb', 'ccca', 'cccd'],
        matches: [
          ['aaaa', 'bbbb', 'cccc', 'dddd'],
          ['aaaa', 'aaab', 'aaac', 'aaad'],
          ['bbbb', 'dddd', 'aaac', 'ccca'],
          ['bbbb', 'aaab', 'cccb', 'dddb'],
          ['cccc', 'cccb', 'ccca', 'cccd']
        ]
      }
    ]
  }
];
