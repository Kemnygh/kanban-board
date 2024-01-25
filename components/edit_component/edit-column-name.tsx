import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import { Box } from '@mui/material';
import { renameHandler } from "@/queries/requests";

export default function RenameItem(props: any) {
    const { cancel, col_name, stream_id, refreshName } = props

    const [title, setTitle] = React.useState('');

    function getTagHandler(e: any) {
        const value = e.target.value
        setTitle(value);
    }

    function submitData() {
        renameHandler(title, stream_id);
        refreshName();
        cancel();
    }
    return (
        <Box
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 290 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1, border: '1px solid grey', pl: 1, borderRadius: 1 }}
                placeholder={col_name}
                onInput={getTagHandler}
            // inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={submitData} >
                <CheckCircleTwoToneIcon color="success" />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={cancel} >
                <CancelTwoToneIcon color="error" />
            </IconButton>
        </Box>
    );
}