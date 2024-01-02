import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        short_name: 'БГ',
        name: 'Bel-Geek.com - Тэхналогіі і Навука',
        description: 'Bel-Geek.com - Тэхналогіі і Навука',
        start_url: '/',
        display: 'standalone',
        background_color: '#fff',
        theme_color: '#000',
        icons: [
            {
                src: 'icons/icon_192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: 'icons/icon_512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
