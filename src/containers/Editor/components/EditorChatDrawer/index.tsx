import React from 'react';
import { useDispatch } from 'react-redux';
import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    Divider,
    Drawer,
    IconButton,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from '@/modules/i18next';
import { sendChatMessageRequest } from '@/modules/chat';

type ChatRole = 'user' | 'assistant';

interface ChatMessage {
    role: ChatRole;
    content: string;
    sources?: ChatSource[];
}

interface ChatSource {
    text: string;
    score: number;
    fileName?: string;
    page?: number;
}

interface ChatResponse {
    answer: string;
    usedRag: boolean;
    sources?: ChatSource[];
}

interface EditorChatDrawerProps {
    open: boolean;
    onClose: () => void;
}

export const EditorChatDrawer = ({
    open,
    onClose,
}: EditorChatDrawerProps) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [messages, setMessages] = React.useState<ChatMessage[]>([]);
    const [question, setQuestion] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const bottomRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    const sendMessage = () => {
        const trimmedQuestion = question.trim();
        if (!trimmedQuestion || loading) {
            return;
        }

        const nextMessages: ChatMessage[] = [
            ...messages,
            { role: 'user', content: trimmedQuestion },
        ];

        setQuestion('');
        setError('');
        setLoading(true);
        setMessages(nextMessages);

        dispatch(
            sendChatMessageRequest(
                {
                    messages: nextMessages,
                },
                {
                    onSuccess: ({ data }: { data: ChatResponse }) => {
                        setMessages([
                            ...nextMessages,
                            {
                                role: 'assistant',
                                content: data.answer,
                                sources: data.sources || [],
                            },
                        ]);
                        setLoading(false);
                    },
                    onFailure: () => {
                        setError(t('editor.chat_error'));
                        setLoading(false);
                    },
                },
            ),
        );
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box
                sx={{
                    width: { xs: '100svw', sm: 420, md: 480 },
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box
                    sx={{
                        px: 2,
                        py: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box>
                        <Typography variant="h6">
                            {t('editor.chat_title')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {t('editor.chat_subtitle')}
                        </Typography>
                    </Box>
                    <IconButton onClick={onClose} aria-label={t('editor.chat_close')}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider />
                <Stack
                    spacing={1.5}
                    sx={{
                        flex: 1,
                        overflowY: 'auto',
                        p: 2,
                    }}
                >
                    {messages.length === 0 ? (
                        <Alert severity="info">
                            {t('editor.chat_empty_state')}
                        </Alert>
                    ) : null}
                    {messages.map((message, index) => (
                        <Box
                            key={`${message.role}-${index}`}
                            sx={{
                                alignSelf:
                                    message.role === 'user'
                                        ? 'flex-end'
                                        : 'flex-start',
                                maxWidth: '90%',
                                p: 1.5,
                                borderRadius: 2,
                                backgroundColor:
                                    message.role === 'user'
                                        ? 'primary.main'
                                        : 'background.paper',
                                color:
                                    message.role === 'user'
                                        ? 'primary.contrastText'
                                        : 'text.primary',
                                border:
                                    message.role === 'user'
                                        ? 'none'
                                        : '1px solid',
                                borderColor: 'divider',
                                whiteSpace: 'pre-wrap',
                            }}
                        >
                            <Typography variant="body2">
                                {message.content}
                            </Typography>
                            {message.role === 'assistant' &&
                            message.sources?.length ? (
                                <Box sx={{ mt: 1 }}>
                                    <Tooltip
                                        arrow
                                        placement="left"
                                        title={
                                            <SourcesTooltip
                                                sources={message.sources}
                                            />
                                        }
                                    >
                                        <Chip
                                            size="small"
                                            clickable
                                            label={`${t('editor.chat_sources')} (${message.sources.length})`}
                                        />
                                    </Tooltip>
                                </Box>
                            ) : null}
                        </Box>
                    ))}
                    {loading ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CircularProgress size={18} />
                            <Typography variant="body2" color="text.secondary">
                                {t('editor.chat_loading')}
                            </Typography>
                        </Box>
                    ) : null}
                    {error ? <Alert severity="error">{error}</Alert> : null}
                    <div ref={bottomRef} />
                </Stack>
                <Divider />
                <Box
                    component="form"
                    sx={{ p: 2 }}
                    onSubmit={(event) => {
                        event.preventDefault();
                        sendMessage();
                    }}
                >
                    <TextField
                        fullWidth
                        multiline
                        minRows={2}
                        maxRows={5}
                        value={question}
                        disabled={loading}
                        placeholder={t('editor.chat_placeholder')}
                        onChange={(event) => setQuestion(event.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        sx={{ mt: 1 }}
                        variant="contained"
                        disabled={!question.trim() || loading}
                    >
                        {t('editor.chat_send')}
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

const SourcesTooltip = ({ sources }: { sources: ChatSource[] }) => {
    const { t } = useTranslation();

    return (
        <Stack spacing={1} sx={{ maxWidth: 360 }}>
            {sources.slice(0, 5).map((source, index) => (
                <Box key={`${source.fileName}-${source.page}-${index}`}>
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>
                        {[source.fileName, source.page ? `${t('editor.chat_page')} ${source.page}` : '']
                            .filter(Boolean)
                            .join(' · ') || t('editor.chat_source')}
                    </Typography>
                    <Typography variant="caption" component="div">
                        {source.text.slice(0, 140)}
                        {source.text.length > 140 ? '...' : ''}
                    </Typography>
                </Box>
            ))}
        </Stack>
    );
};
