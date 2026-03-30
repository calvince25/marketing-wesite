/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://growthlablimited.com',
  generateRobotsTxt: true,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}
