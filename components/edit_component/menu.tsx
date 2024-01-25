import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClearColumn from './clear-column';
import { Button } from '@mui/material';
import EditNoteTwoToneIcon from '@mui/icons-material/EditNoteTwoTone';
import DeleteColumn from './delete-column';

const options = [
    'Rename',
    'Clear',
    'Delete',
];

const ITEM_HEIGHT = 48;

export default function LongMenu(props: any) {
    const { rename, refresh_tasks, stream_id, refresh_cols } = props;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function multipleHandler() {
        handleClose();
        rename();
    }

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '13ch',
                    },
                }}
            >
                {/* {options.map((option) => (
                    <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                        {option}
                    </MenuItem>
                ))} */}
                <Button onClick={multipleHandler} sx={{ color: '#000000', textTransform: 'Capitalize', width: 100, textAlign: 'left' }} startIcon={<EditNoteTwoToneIcon />} >
                    Rename
                </Button>
                <ClearColumn refresh_tasks={refresh_tasks} stream_id={stream_id} close_menu={handleClose} />
                <DeleteColumn refresh_tasks={refresh_tasks} stream_id={stream_id} close_menu={handleClose} refresh_cols={refresh_cols} />
                {/* <div onClick={handleClose}>{rename}</div>
                {clear}
                {remove} */}
            </Menu>
        </div>
    );
}