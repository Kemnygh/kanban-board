import { renameHandler } from "@/queries/requests";
import CreateModal from "../ui/create-modal";
import LongMenu from "../ui/menu";
import { useState } from "react";


export default function EditMenu(props: any) {
    const { refreshName, stream_id } = props
    const [title, setTitle] = useState('');


    function submitData() {
        renameHandler(title, stream_id);
    }

    return (
        <LongMenu
            rename={<CreateModal btnText="Rename" width="170px" setTags={setTitle} onClick={submitData} newData={refreshName} />}
            clear={<CreateModal btnText="Clear" width="170px" />}
            remove={<CreateModal btnText="Delete" width="170px" />}
        />
    );
}