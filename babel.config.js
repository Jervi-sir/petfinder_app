module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            '@components': "./components",
            '@functions': "./functions",
            '@screens': "./screens",
            '@constants': "./constants",
            '@assets': "./assets",
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
