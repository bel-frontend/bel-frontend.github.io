'use client';
import React from 'react';
import Editor from '@/containers/Editor';

const Article = ({
    params,
}: {
    params: {
        id: string;
    };
}) => {
    return <Editor params={params} />;
};

export default Article;
