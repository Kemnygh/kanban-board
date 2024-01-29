import EditDialog from "../ui/edit-modal";
import CleaningServicesTwoToneIcon from "@mui/icons-material/CleaningServicesTwoTone";
import { useMutation } from "@apollo/client";
import { CLEAR_STREAM } from "@/graphql/mutations";
import { GET_STREAMS } from "@/graphql/queries";

export default function ClearColumn(props: any) {
  const { stream_id, close_menu } = props;

  const [clearStream] = useMutation(CLEAR_STREAM, {
    variables: { stream_id },
    refetchQueries: [{ query: GET_STREAMS }],
  });

  function submitData() {
    clearStream({ variables: { streamId: stream_id } });
    close_menu();
  }

  return (
    <EditDialog
      name="Clear"
      icon={<CleaningServicesTwoToneIcon />}
      message="Please note this will delete all tasks retaled to this stream."
      onClick={submitData}
    />
  );
}
