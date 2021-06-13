import React, { useEffect, useState, useImperativeHandle} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export function AlertDialog() {
    const [open, setOpen] = React.useState(false);
    const [title,setTitle] = useState("")
    const [message,setMessage] = useState("")

    
    const handleClickOpen = ({ title, message }) => {
        setTitle(title)
        setMessage(message)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Disagree
          </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Agree
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}