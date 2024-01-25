import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DriveFileMoveTwoToneIcon from '@mui/icons-material/DriveFileMoveTwoTone';
import { MoveTaskhandler } from "@/queries/requests";
import { Stack } from '@mui/material';

export default function MoveTask(props: any) {
    const { id, refresh_tasks, columns, current_col_id } = props
    // const [newColId, setnewColId] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const p_id = open ? 'simple-popover' : undefined;


    function getTaskId(e: any) {
        const newColId = e.currentTarget.id
        // setnewColId(btn_id);
        MoveTaskhandler(id, newColId);
        refresh_tasks();
        // handleClose();
        // console.log(current_col_id, btn_id)
    }

    return (
        <div>
            <Button color='info' aria-describedby={p_id} onClick={handleClick}><DriveFileMoveTwoToneIcon sx={{ color: '#4db6ac' }} /></Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 2 }}>Move to:</Typography>
                <Stack>
                    {columns?.map((col: { id: any, name: any }) => { if (col.id !== current_col_id) { return (<Button key={col.id} id={col.id} onClick={getTaskId}>{col.name}</Button>) } })}
                </Stack>
            </Popover>
        </div>
    );
}