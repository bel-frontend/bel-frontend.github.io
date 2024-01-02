'use client';
import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Popup } from '@/components';
import { popupSelector, hidePopupAction } from '@/modules/popups';
import makeStyles from '@mui/styles/makeStyles';

const useStyle = makeStyles((theme) => ({
    buttonContainer: {},
}));

const Popups = () => {
    const classes = useStyle();
    const confirms = useSelector(popupSelector);
    const dispatch = useDispatch();
    const onHidePopup = (id: any) => dispatch(hidePopupAction(id));

    return (
        <>
            {confirms.map(
                (item: {
                    id: any;
                    type: any;
                    message: any;
                    onClick: any;
                    onCancel: any;
                    onClear: any;
                    textConfirm: any;
                    textCancel: string;
                    confirmButtonProps: any;
                }) => (
                    <Popup
                        key={item.id}
                        show
                        showForce
                        {...item}
                        onSubmit={(ev: any) => {
                            if (
                                typeof item.onClick === 'function' &&
                                item.onClick(ev)
                            ) {
                                onHidePopup(item.id);
                            }
                        }}
                        onCancel={(ev: any) => {
                            if (
                                typeof item.onCancel === 'function' &&
                                item.onCancel(ev)
                            ) {
                                onHidePopup(item.id);
                            }
                        }}
                        onClear={(ev: any) => {
                            if (typeof item.onClear === 'function') {
                                item.onCancel(ev);
                            }
                            onHidePopup(item.id);
                        }}
                        textConfirm={item.textConfirm}
                        textCancel={item.textCancel || 'Cancel'}
                        classes={{ buttonContainer: classes.buttonContainer }}
                        confirmButtonProps={{ ...item.confirmButtonProps }}
                    />
                ),
            )}
        </>
    );
};

export default Popups;
