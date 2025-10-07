import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
          '/api/',
          '/_next/',
          '/static/',
          '/dashboard/',
          '/login',
          '/setup/',
          '/test/',
          '/init-db',
          '/init-updates'
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
          '/api/',
          '/dashboard/',
          '/login',
          '/setup/',
          '/test/',
          '/init-db',
          '/init-updates'
        ],
        crawlDelay: 0,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
          '/api/',
          '/dashboard/',
          '/login',
          '/setup/',
          '/test/',
          '/init-db',
          '/init-updates'
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'OpenAI',
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
          '/api/',
          '/dashboard/',
          '/login',
          '/setup/',
          '/test/',
          '/init-db',
          '/init-updates'
        ],
        crawlDelay: 2,
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
          '/api/',
          '/dashboard/',
          '/login',
          '/setup/',
          '/test/',
          '/init-db',
          '/init-updates'
        ],
        crawlDelay: 2,
      }
    ],
    sitemap: 'https://www.eduexpressint.com/sitemap.xml',
    host: 'https://www.eduexpressint.com'
  }
}
