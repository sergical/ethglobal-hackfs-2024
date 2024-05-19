/** @type {import('@fleekxyz/cli').FleekConfig} */
module.exports = {
  sites: [
    {
      slug: "purring-battery-slow",
      distDir: "out",
      buildCommand: "yarn run build",
    },
  ],
};
