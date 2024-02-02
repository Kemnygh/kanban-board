import { Button } from "@mui/material";
import HighlightOffTwoToneIcon from "@mui/icons-material/HighlightOffTwoTone";
import { useMutation } from "@apollo/client";
import { DELETE_TASK } from "@/graphql/mutations";
import { GET_STREAMS } from "@/graphql/queries";

export default function DeleteTask(props: any) {
  const { id } = props;
  const [deleteTask] = useMutation(DELETE_TASK, {
    variables: { id },
    refetchQueries: [{ query: GET_STREAMS }],
  });

  function submitData() {
    deleteTask({ variables: { id: id } });
  }

  return (
    <Button color="warning" onClick={submitData}>
      <HighlightOffTwoToneIcon sx={{ color: "#ff7043" }} />
    </Button>
  );
}
