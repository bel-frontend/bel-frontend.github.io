import type { Metadata, ResolvingMetadata } from 'next';
import React from 'react';
import { redirect } from 'next/navigation';

import {
    getArtickleByIdRequest,
    getArtickleSelector,
} from '@/modules/artickles';
import { getDataWrapper } from '@/modules/apiRoutes';
import ArticleView from './components/Article';
import { ArticleInterface } from '@/modules/artickles/types/article';

type Props = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bel-geek.com';

const normalizeUrl = (url?: string | null) => {
    if (!url) {
        return undefined;
    }

    const trimmed = url.trim();

    if (!trimmed || trimmed.startsWith('data:')) {
        return undefined;
    }

    try {
        const parsed = new URL(trimmed, SITE_URL);

        if (!['http:', 'https:'].includes(parsed.protocol)) {
            return undefined;
        }

        return parsed.toString();
    } catch (error) {
        return undefined;
    }
};

const extractFirstImageFromContent = (content?: string) => {
    if (!content) {
        return undefined;
    }

    const markdownMatch = content.match(/!\[[^\]]*]\(([^)]+)\)/);

    if (markdownMatch?.[1]) {
        const candidate = markdownMatch[1]
            .split(/"|'/)[0]
            .split(/\s+/)[0]
            .trim();

        const normalizedCandidate = normalizeUrl(candidate);

        if (normalizedCandidate) {
            return normalizedCandidate;
        }
    }

    const htmlMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);

    if (htmlMatch?.[1]) {
        return normalizeUrl(htmlMatch[1]);
    }

    return undefined;
};

const resolveArticleImage = (article: ArticleInterface) => {
    const candidates = [
        normalizeUrl(article?.meta?.image),
        normalizeUrl(article?.meta?.previewImage),
        normalizeUrl(article?.meta?.cover),
        normalizeUrl(article?.files?.find((file) => file?.url)?.url),
        extractFirstImageFromContent(article?.content),
    ];

    return candidates.find(Boolean);
};

const buildTwitterDescription = (description: string) => {
    if (!description) {
        return '';
    }

    return description.length > 197
        ? `${description.slice(0, 197)}...`
        : description;
};

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata,
): Promise<Metadata | null> {
    // read route params
    const id = params.id;

    // fetch data
    try {
        const product = (await getDataWrapper(
            {
                requestAction: getArtickleByIdRequest,
                resultSelector: getArtickleSelector,
                // onFailure: () => redirect('/404'),
            },
            { id },
        )) as ArticleInterface | null;

        if (!product) {
            return null;
        }

        const title = product.title || product.meta?.title || '';
        const description =
            product.description || product.meta?.description || '';
        const imageUrl = resolveArticleImage(product);
        const twitterDescription = buildTwitterDescription(description);
        const articleUrl = `${SITE_URL.replace(/\/$/, '')}/article/${id}`;

        return {
            metadataBase: new URL(SITE_URL),
            title,
            description,
            openGraph: {
                title,
                description,
                type: 'article',
                url: articleUrl,
                ...(imageUrl
                    ? {
                          images: [
                              {
                                  url: imageUrl,
                                  alt: title,
                              },
                          ],
                      }
                    : {}),
            },
            twitter: {
                title,
                description: twitterDescription,
                card: imageUrl ? 'summary_large_image' : 'summary',
                ...(imageUrl ? { images: [imageUrl] } : {}),
            },
        };
    } catch (error) {
        return null;
    }
}

const Article = async ({
    match: {
        params: { id },
    },
}: {
    match: { params: { id: string } };
}) => {
    const article: ArticleInterface = await getDataWrapper(
        {
            requestAction: getArtickleByIdRequest,
            resultSelector: getArtickleSelector,
            onFailure: () => redirect('/404'),
        },
        { id },
    );

    return article ? <ArticleView article={article} /> : null;
};

export default Article;
