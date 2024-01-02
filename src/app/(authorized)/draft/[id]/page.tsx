import React from 'react';
import DraftView from '@/containers/Article/Draft';

export { generateMetadata } from '@/containers/Article';

const Draft = ({
    params,
    searchParams,
    ...props
}: {
    params: { id: string };
    searchParams: any;
}) => {
    return (
        <DraftView
            match={{
                params: {
                    id: params.id,
                },
            }}
        />
    );
};

export default Draft;
