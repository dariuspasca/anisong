module.exports = {
  experimental: {
    newNextLinkBehavior: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
    ]
  },
}
