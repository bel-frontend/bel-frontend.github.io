import { CommentDTO } from '@/modules/comments';

export type SortMode = 'best' | 'new' | 'old';

export interface CommentNode extends CommentDTO {
    children: CommentNode[];
}

// depth after which "continue thread" link is shown instead of replies
export const MAX_DEPTH = 5;

export const buildTree = (items: CommentDTO[] = []): CommentNode[] => {
    const nodes = new Map<string, CommentNode>();
    items.forEach((item) =>
        nodes.set(item.comment_id, { ...item, children: [] }),
    );

    const roots: CommentNode[] = [];
    nodes.forEach((node) => {
        const parent = node.parent_comment_id
            ? nodes.get(node.parent_comment_id)
            : undefined;
        if (parent) parent.children.push(node);
        else roots.push(node);
    });
    return roots;
};

const getTime = (item: CommentDTO) =>
    item.created_at ? new Date(item.created_at).getTime() : 0;

const comparators: Record<SortMode, (a: CommentDTO, b: CommentDTO) => number> =
    {
        best: (a, b) =>
            (b.score || 0) - (a.score || 0) || getTime(b) - getTime(a),
        new: (a, b) => getTime(b) - getTime(a),
        old: (a, b) => getTime(a) - getTime(b),
    };

export const sortTree = (tree: CommentNode[], mode: SortMode): CommentNode[] =>
    [...tree]
        .sort(comparators[mode])
        .map((node) => ({ ...node, children: sortTree(node.children, mode) }));

export const countDescendants = (node: CommentNode): number =>
    node.children.reduce((sum, child) => sum + 1 + countDescendants(child), 0);

export const findNode = (
    tree: CommentNode[],
    id: string,
): CommentNode | undefined => {
    for (const node of tree) {
        if (node.comment_id === id) return node;
        const found = findNode(node.children, id);
        if (found) return found;
    }
    return undefined;
};

// Intl has no Belarusian data in some browsers (falls back to Russian),
// so plural forms and relative time are resolved manually via i18n keys
const getPluralCategory = (count: number, lang: string) => {
    const n = Math.abs(count);
    if (lang !== 'be') return n === 1 ? 'one' : 'other';
    if (!Number.isInteger(n)) return 'other';
    const n10 = n % 10;
    const n100 = n % 100;
    if (n10 === 1 && n100 !== 11) return 'one';
    if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return 'few';
    return 'many';
};

// i18next runs in compatibilityJSON v3 mode, so plural suffix is added here:
// `key_one`, `key_few`, `key_many`, `key_other`
export const pluralKey = (key: string, count: number, lang: string) =>
    `${key}_${getPluralCategory(count, lang)}`;

const TIME_UNITS: [string, number][] = [
    ['years', 60 * 60 * 24 * 365],
    ['months', 60 * 60 * 24 * 30],
    ['days', 60 * 60 * 24],
    ['hours', 60 * 60],
    ['minutes', 60],
];

export const timeAgo = (
    date: string | undefined,
    t: (key: string, options?: any) => string,
    lang: string,
) => {
    if (!date) return '';
    const seconds = Math.max(0, (Date.now() - new Date(date).getTime()) / 1000);
    for (const [unit, size] of TIME_UNITS) {
        if (seconds >= size) {
            const count = Math.floor(seconds / size);
            if (unit === 'days' && count === 1) {
                return t('article.comments.time.yesterday');
            }
            return t(pluralKey(`article.comments.time.${unit}`, count, lang), {
                count,
            });
        }
    }
    return t('article.comments.time.just_now');
};

const pad = (n: number) => String(n).padStart(2, '0');

export const formatFullDate = (date: string | undefined) => {
    if (!date) return '';
    const d = new Date(date);
    return `${pad(d.getDate())}.${pad(
        d.getMonth() + 1,
    )}.${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const AVATAR_COLORS = [
    '#2563eb',
    '#0f766e',
    '#dc3d62',
    '#7c3aed',
    '#ea580c',
    '#0891b2',
    '#65a30d',
    '#c026d3',
];

export const getAvatarColor = (seed: string = '') => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = (hash * 31 + seed.charCodeAt(i)) | 0;
    }
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};
