// module.exports = {
//     preset: 'ts-jest',
//     transform: {
//       '^.+\\.(ts|tsx)?$': 'ts-jest',
//       "^.+\\.(js|jsx)$": "babel-jest",
//     },
    
//   };

// module.exports = {
//   preset: 'ts-jest',
//   transform: {
//     '^.+\\.(ts|tsx)?$': 'ts-jest',
//     "^.+\\.(js|jsx)$": "babel-jest",
//   },
//   globals: {
//     "ts-jest": {
//       isolatedModules: true,
//     },
//   },
// };

module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  moduleDirectories: ["node_modules", "src"],

};