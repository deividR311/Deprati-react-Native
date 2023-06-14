module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__decode']
      }
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: 'react-native-dotenv',
        safe: true,
        verbose: false,
        blocklist: ['GOOGLE_MAPS_KEY']
      }
    ]
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel']
    },
    test: {
      plugins: [
        ['module:react-native-dotenv', { path: './__mocks__/.dotenv.test' }]
      ]
    }
  }
};
