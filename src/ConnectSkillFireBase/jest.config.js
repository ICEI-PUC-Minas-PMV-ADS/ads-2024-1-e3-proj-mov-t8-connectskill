module.exports = {
    preset: 'react-native',
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
      'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@testing-library|firebase)',
    ],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  };
  