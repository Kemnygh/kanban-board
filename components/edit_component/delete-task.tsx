import { Button } from "@mui/material";
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import { DeleteTaskhandler } from "@/queries/requests";

export default function DeleteTask(props: any) {
    const { id, refresh_tasks } = props

    function submitData() {
        DeleteTaskhandler(id);
        refresh_tasks();
    }

    return (
        <Button color='warning' onClick={submitData}><HighlightOffTwoToneIcon sx={{ color: '#ff7043' }} /></Button>
    );
}