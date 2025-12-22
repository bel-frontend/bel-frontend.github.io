'use client';
import React, { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    Chip,
    IconButton,
    Collapse,
    Paper,
    Button,
    TextField,
    InputAdornment,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from '@/modules/i18next';
import { TagCloudItem } from '@/modules/artickles/types/article';

import style from './style.module.scss';

interface TagsCloudProps {
    tags?: TagCloudItem[];
}

export const TagsCloud = ({ tags = [] }: TagsCloudProps) => {
    const { t } = useTranslation();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Падтрымка некалькіх тэгаў праз стандартны HTTP фармат: ?tags=a&tags=b
    const activeTags = useMemo(() => {
        return searchParams.getAll('tags').filter(Boolean);
    }, [searchParams]);

    const isTagActive = (tag: string) => activeTags.includes(tag);

    // Фільтраваныя тэгі па пошуку
    const filteredAndSortedTags = useMemo(() => {
        const sorted = [...tags].sort((a, b) => b.count - a.count);
        if (!searchQuery.trim()) {
            return sorted;
        }
        const query = searchQuery.toLowerCase().trim();
        return sorted.filter((t) => t.tag.toLowerCase().includes(query));
    }, [tags, searchQuery]);

    if (!tags || tags.length === 0) {
        return null;
    }

    // Calculate font sizes based on count
    const maxCount = Math.max(...tags.map((t) => t.count));
    const minCount = Math.min(...tags.map((t) => t.count));
    const countRange = maxCount - minCount || 1;

    const getTagSize = (count: number): 'small' | 'medium' => {
        const normalized = (count - minCount) / countRange;
        return normalized > 0.5 ? 'medium' : 'small';
    };

    const handleTagClick = (tag: string) => {
        const params = new URLSearchParams(searchParams.toString());
        let newTags: string[];

        if (isTagActive(tag)) {
            // Выдаляем тэг з спісу
            newTags = activeTags.filter((t) => t !== tag);
        } else {
            // Дадаем тэг у спіс
            newTags = [...activeTags, tag];
        }

        // Выдаляем усе існуючыя tags
        params.delete('tags');
        // Дадаем кожны тэг асобна: ?tags=a&tags=b&tags=c
        newTags.forEach((t) => params.append('tags', t));
        params.delete('page'); // Скідаем на першую старонку

        const newUrl = params.toString() ? `/?${params.toString()}` : '/';
        router.push(newUrl);
    };

    const handleRemoveTag = (tag: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const params = new URLSearchParams(searchParams.toString());
        const newTags = activeTags.filter((t) => t !== tag);

        // Выдаляем усе існуючыя tags і дадаем нанова
        params.delete('tags');
        newTags.forEach((t) => params.append('tags', t));
        params.delete('page');

        const newUrl = params.toString() ? `/?${params.toString()}` : '/';
        router.push(newUrl);
    };

    const handleClearFilter = (e?: React.MouseEvent) => {
        if (e) {
            e.stopPropagation();
        }
        const params = new URLSearchParams(searchParams.toString());
        params.delete('tags');
        params.delete('page'); // Скідаем старонку

        const newUrl = params.toString() ? `/?${params.toString()}` : '/';
        router.push(newUrl);
    };

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Paper className={style.tagsCloud} elevation={0}>
            <Box
                className={style.header}
                onClick={toggleExpanded}
                role="button"
                tabIndex={0}
            >
                <Box className={style.titleWrapper}>
                    <LocalOfferIcon className={style.icon} />
                    <Typography variant="subtitle1" className={style.title}>
                        {t('home.tags_cloud_title')}
                    </Typography>
                    {activeTags.length > 0 && (
                        <Box className={style.activeTagsWrapper}>
                            {activeTags.map((tag) => (
                                <Chip
                                    key={tag}
                                    label={tag}
                                    size="small"
                                    color="primary"
                                    className={style.activeTagChip}
                                    onDelete={(e) =>
                                        handleRemoveTag(tag, e as any)
                                    }
                                    onClick={(e) => e.stopPropagation()}
                                />
                            ))}
                        </Box>
                    )}
                </Box>
                <IconButton size="small" className={style.expandButton}>
                    {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </Box>

            <Collapse in={isExpanded}>
                {tags.length > 10 && (
                    <Box className={style.searchWrapper}>
                        <TextField
                            size="small"
                            placeholder={t('home.tags_search_placeholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className={style.searchInput}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize="small" />
                                    </InputAdornment>
                                ),
                                endAdornment: searchQuery && (
                                    <InputAdornment position="end">
                                        <IconButton
                                            size="small"
                                            onClick={() => setSearchQuery('')}
                                        >
                                            <ClearIcon fontSize="small" />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            fullWidth
                        />
                    </Box>
                )}

                <Box className={style.tagsContainer}>
                    {filteredAndSortedTags.length > 0 ? (
                        filteredAndSortedTags.map(({ tag, count }) => (
                            <Chip
                                key={tag}
                                label={`${tag} (${count})`}
                                className={`${style.tag} ${
                                    isTagActive(tag) ? style.active : ''
                                }`}
                                size={getTagSize(count)}
                                onClick={() => handleTagClick(tag)}
                                variant={
                                    isTagActive(tag) ? 'filled' : 'outlined'
                                }
                                color={isTagActive(tag) ? 'primary' : 'default'}
                            />
                        ))
                    ) : (
                        <Typography variant="body2" className={style.noResults}>
                            {t('home.tags_no_results')}
                        </Typography>
                    )}
                </Box>

                {activeTags.length > 0 && (
                    <Box className={style.clearFilter}>
                        <Button
                            size="small"
                            startIcon={<FilterAltOffIcon />}
                            onClick={(e) => handleClearFilter(e)}
                            className={style.clearButton}
                        >
                            {t('home.clear_tag_filter')} ({activeTags.length})
                        </Button>
                    </Box>
                )}
            </Collapse>
        </Paper>
    );
};
