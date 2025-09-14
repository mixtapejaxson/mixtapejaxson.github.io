export interface SitemapEntry {
  url: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const sitemapEntries: SitemapEntry[] = [
  {
    url: '/',
    changeFrequency: 'monthly',
    priority: 1.0,
  },
  {
    url: '/about',
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    url: '/projects',
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: '/socials',
    changeFrequency: 'monthly',
    priority: 0.7,
  },
];

export function generateSitemap(baseUrl: string = 'https://mixtapejaxson.com'): string {
  const now = new Date().toISOString().split('T')[0];

  const urlElements = sitemapEntries.map(entry => {
    return `  <url>
    <loc>${baseUrl}${entry.url}</loc>
    <lastmod>${entry.lastModified || now}</lastmod>
    <changefreq>${entry.changeFrequency || 'monthly'}</changefreq>
    <priority>${entry.priority || 0.5}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}

export function generateRobotsTxt(baseUrl: string = 'https://mixtapejaxson.com'): string {
  return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for polite crawling
Crawl-delay: 1

# Disallow template directory (if exposed)
Disallow: /template/
`;
}
