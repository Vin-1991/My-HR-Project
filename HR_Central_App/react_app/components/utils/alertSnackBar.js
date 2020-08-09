import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CustomizedSnackbars({ alertOpen }) {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Snackbar open={alertOpen} autoHideDuration={1000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
                Saved Successfully!
        </Alert>
        </Snackbar>
    );
}