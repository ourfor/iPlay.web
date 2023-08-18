import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useAppDispatch, useAppSelector } from '@data/StoreHook';
import { DialogID, openDialog } from '@data/Event';
import { Setting } from './Setting';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SettingDialog() {
    const open = useAppSelector(state => state.event.dialog?.[DialogID.SETTING]) ?? false
    const dispatch = useAppDispatch()
    const setOpen = (open: boolean) => {
        dispatch(openDialog({
            id: DialogID.SETTING,
            open
        }))
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle sx={{fontWeight: 300}}>{"偏好设置"}</DialogTitle>
            <DialogContent>
                <Setting />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>取消</Button>
                <Button onClick={handleClose}>确认</Button>
            </DialogActions>
        </Dialog>
    );
}