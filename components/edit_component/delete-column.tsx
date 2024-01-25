import { DeleteColHandler, clearHandler } from "@/queries/requests";
import EditDialog from "../ui/edit-modal";
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

export default function DeleteColumn(props: any) {
    const { stream_id, refresh_tasks, close_menu, refresh_cols } = props

    function submitData() {
        DeleteColHandler(stream_id);
        clearHandler(stream_id);
        refresh_tasks();
        close_menu();
        refresh_cols();
    }

    return (
        <EditDialog name='Delete' icon={<DeleteTwoToneIcon />} message='Please note this will  the stream as well as all tasks retaled to this stream.' onClick={submitData} />
    );
}