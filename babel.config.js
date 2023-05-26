module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
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
    ],
  };
};
