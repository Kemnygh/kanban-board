import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function TaskCard(props: any) {
    const { task_name } = props
    return (
        <Box sx={{ minWidth: 275, margin: '5px', border: '1px gray solid', borderRadius: '5px', backgroundColor: '#efebe9' }}>
            <Typography sx={{ fontSize: 14, textAlign: 'center' }} color="text.secondary" gutterBottom>
                {task_name}
            </Typography>
        </Box>
    );
}