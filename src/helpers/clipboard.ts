import { showInfo } from '@/modules/notification';

export const saveToClipBoard = (dispatch: any) => (str: any) => {
    navigator.clipboard.writeText(str);
    dispatch(
        showInfo({
            message: 'Cкапіявана',
        }),
    );
};
