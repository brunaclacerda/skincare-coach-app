const envFile = process.env.ENV_FILE || ".env";

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
  };
};
