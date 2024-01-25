import { clearHandler } from "@/queries/requests";
import EditDialog from "../ui/edit-modal";
import CleaningServicesTwoToneIcon from '@mui/icons-material/CleaningServicesTwoTone';
import ActionAlerts from "../ui/alert-modal";

export default function ClearColumn(props: any) {
    const { stream_id, refresh_tasks, close_menu } = props

    function submitData() {
        clearHandler(stream_id);
        refresh_tasks();
        close_menu();
    }

    return (
        <EditDialog name='Clear' icon={<CleaningServicesTwoToneIcon />} message='Please note this will delete all tasks retaled to this stream.' onClick={submitData} />
    );
}