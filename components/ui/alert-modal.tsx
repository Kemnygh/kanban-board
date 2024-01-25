import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function ActionAlerts(props: any) {
    const { response, severity } = props;
    const [display, setDisplay] = React.useState('');

    const handleClick = () => {
        setDisplay('');
    };

    const handleClose = () => {
        const value = 'none'
        setDisplay(value);
    };



    return (
        <Stack sx={{ width: '30%', position: 'absolute', right: '40%', top: '10%' }} spacing={2} display={display}>
            <Alert severity={severity} onClose={handleClose}>
                {response}
            </Alert>

        </Stack>
    );
}