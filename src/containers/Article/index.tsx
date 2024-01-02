import type { Metadata, ResolvingMetadata } from 'next';
import React from 'react';
import { redirect } from 'next/navigation';

import {
    getArtickleByIdRequest,
    getArtickleSelector,
} from '@/modules/artickles';
import { getDataWrapper } from '@/modules/apiRoutes';
import ArticleView from './components/Article';
import { ArticleInterface } from '@/constants/types/article';

type Props = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata,
): Promise<Metadata | null> {
    // read route params
    const id = params.id;

    // fetch data
    try {
        const product = await getDataWrapper(
            {
                requestAction: getArtickleByIdRequest,
                resultSelector: getArtickleSelector,
                // onFailure: () => redirect('/404'),
            },
            { id },
        );

        return {
            metadataBase: new URL('https://bel-geek.com'),
            title: product.title,
            description: product.description,
            openGraph: {
                title: product.title,
                description: product.description,
            },
            twitter: {
                title: product.title,
                description: (product.description || '').slice(0, 197) + '...',
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
