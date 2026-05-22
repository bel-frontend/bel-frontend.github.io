export const NEW_ARTICLE_ID = 'add';

export const BC_SAVED_EVENT = 'SAVED';
export const getBroadcastChannelName = (id: string) => `editor:article:${id}`;
export const TAB_ID =
    typeof crypto !== 'undefined'
        ? crypto.randomUUID()
        : `tab-${Math.random()}`;

export const AUTOSAVE_STORAGE_KEY = 'editor_autosave';
export const AUTOSAVE_INTERVAL_MS = 30_000;
export const SYNC_POLL_INTERVAL_MS = 15_000;
export const OWN_SAVE_GRACE_MS = 60_000;
