export interface MetaDataInterface {
    title: string;
    dateArticle: string;
    tags: string[];
    user_id: string;
    isActive: boolean;
    author: string;
    description: string;
    artickle_id: string;
    created_at: string;
    isPinned: boolean;
    isBlocked: boolean;
}

export interface ArticleInterface {
    _id: string;
    title: string;
    dateArticle: string;
    tags: string[];
    user_id: string;
    isActive: boolean;
    author: string;
    description: string;
    artickle_id: string;
    created_at: string;
    updated_at?: string;
    likes: number;
    isPinned: boolean;
    isBlocked: boolean;
    content: string;
    id: string;
    meta: MetaDataInterface;
    loaded?: boolean;
}

export interface AutoSaveArticleInterface {
    title: string;
    description: string;
    dateArticle: string;
    author: string;
    tags: string;
    content: string;
    isActive: boolean;
    isPinned: boolean;
    isAdd: boolean;
    id: string;
    updated_at?: number;
}
