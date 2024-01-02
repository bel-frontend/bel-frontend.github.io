import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/editor', '/login', '/register'],
        },
        sitemap: 'https://bel-geek.com/sitemap.xml',
    };
}
