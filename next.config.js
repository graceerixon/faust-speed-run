module.exports = {
  reactStrictMode: true,
}

const { withFaust } = require("@faustjs/next");

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  reactStrictMode: true,
  images: {
    domains: ["headless.local"],
  },
});