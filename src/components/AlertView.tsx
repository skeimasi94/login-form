import React, { useState } from 'react';
import { Slide, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { CheckCircle, Dangerous } from '@mui/icons-material';
import { Navigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface AlertProps {
    title?: string,
    message: string,
    success: boolean,
    dest: string,
    callback?: Function
}

const AlertView = (props: AlertProps) => {
    const { title = "", message, success, dest, callback } = props;
    const [open, setOpen] = useState(true);
    const [redirect, setRedirect] = useState(false);
    const handleClose = () => {
        setOpen(false);
        if (callback) {
            callback();
        }
        if (success)
            setRedirect(true);
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            fullWidth
        >
            {
                redirect &&
                <Navigate to={dest} />
            }

            <DialogContent style={{
                display: "flex", alignItems: "center",
                flexDirection: "column", gap: "20px",
            }}>
                {
                    success ? <CheckCircle fontSize='large' color="success" /> :
                        <Dangerous fontSize='large' color="error" />
                }
                <Typography variant='h5'>
                    {title}
                </Typography>
                <Typography variant='h6'>
                    {message}
                </Typography>
            </DialogContent>

            <DialogActions sx={{
                display: "flex", justifyContent: "center"
            }}>
                <Button
                    variant='contained'
                    onClick={handleClose}>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AlertView;