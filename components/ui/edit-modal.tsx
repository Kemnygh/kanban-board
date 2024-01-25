import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import { Stack } from '@mui/material';

export default function EditDialog(props: any) {
    const { name, message, icon, onClick } = props;
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function multiHandler() {
        handleClose();
        onClick();
    }

    return (
        <React.Fragment>
            <Button onClick={handleClickOpen} sx={{ color: '#000000', textTransform: 'Capitalize', width: 100, textAlign: 'left' }} startIcon={icon} >
                {name}
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <Stack direction='row' alignItems="center" ml={2}  >
                    <ErrorTwoToneIcon fontSize='large' sx={{ color: '#8d6e63' }} />
                    <DialogContent >
                        <DialogContentText sx={{ color: '#8d6e63' }}>
                            {message}
                        </DialogContentText>
                    </DialogContent>
                </Stack>
                <DialogActions >
                    <Button autoFocus onClick={multiHandler} sx={{ color: '#00838f', }}>
                        Proceed
                    </Button>
                    <Button onClick={handleClose} autoFocus sx={{ color: 'gray', }}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}