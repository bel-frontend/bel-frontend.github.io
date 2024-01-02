import { MetadataRoute } from 'next';
import { getDataWrapper } from '@/modules/apiRoutes';
import {
    getArticlesIdsRequest,
    getArticlesIdsSelector,
} from '@/modules/artickles';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const { articles = [] } = await getDataWrapper(
        {
            requestAction: getArticlesIdsRequest,
            resultSelector: getArticlesIdsSelector,
            onSuccess: () => {},
        },
        {},
    );

    const url = 'https://bel-geek.com';

    return [
        {
            url: `${url}/`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${url}/contacts`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        ...articles.map(({ artickle_id }: { artickle_id: number }) => ({
            url: `${url}/article/${artickle_id}`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        })),
    ];
}
