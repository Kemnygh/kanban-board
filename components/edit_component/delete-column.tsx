import EditDialog from "../ui/edit-modal";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { useMutation } from "@apollo/client";
import { DELETE_STREAM } from "@/graphql/mutations";
import { GET_STREAMS } from "@/graphql/queries";

export default function DeleteColumn(props: any) {
  const { stream_id, close_menu } = props;

  const [deleteStream] = useMutation(DELETE_STREAM, {
    variables: { stream_id },
    refetchQueries: [{ query: GET_STREAMS }],
  });

  function submitData() {
    deleteStream({ variables: { id: stream_id, stream_id: stream_id } });
    close_menu();
  }

  return (
    <EditDialog
      name="Delete"
      icon={<DeleteTwoToneIcon />}
      message="Please note this will  the stream as well as all tasks retaled to this stream."
      onClick={submitData}
    />
  );
}
