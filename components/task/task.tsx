import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Stack } from '@mui/material';
import DeleteTask from '../edit_component/delete-task';
import MoveTask from '../edit_component/move-task';

export default function TaskCard(props: any) {
    const [showIcon, setShowIcon] = React.useState(false)
    const { task_name, refresh_tasks, task_id, column_data, current_col_id } = props

    function showIconHandler() {
        setShowIcon(true);
    }


    function hideIconHandler() {
        setShowIcon(false);
    }
    return (
        <div onMouseEnter={showIconHandler} onMouseLeave={hideIconHandler}>
            <Box sx={{ maxWidth: 275, margin: '5px', border: '1px gray solid', borderRadius: '5px', backgroundColor: '#efebe9', '&:hover': { background: '#f5f5f5' } }} p={1} >
                <Stack direction='row' alignItems="center" ml={2} justifyContent='space-between' >
                    <Typography sx={{ fontSize: 14, textAlign: 'center' }} color="text.secondary">
                        {task_name}
                    </Typography>
                    {showIcon ? <Stack ><DeleteTask refresh_tasks={refresh_tasks} id={task_id} /><MoveTask id={task_id} columns={column_data} refresh_tasks={refresh_tasks} current_col_id={current_col_id} /></Stack> : null}
                </Stack>
            </Box>
        </div>
    );
}