import * as React from "react";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import { Box } from "@mui/material";
import { useMutation } from "@apollo/client";
import { RENAMR_STREAM } from "@/graphql/mutations";
import { GET_STREAMS } from "@/graphql/queries";

export default function RenameItem(props: any) {
  const { cancel, col_name, stream_id } = props;

  const [title, setTitle] = React.useState("");

  const [renameStream] = useMutation(RENAMR_STREAM, {
    variables: { stream_id, title },
    refetchQueries: [{ query: GET_STREAMS }],
  });

  function getTagHandler(e: any) {
    const value = e.target.value;
    setTitle(value);
  }

  function submitData() {
    renameStream({ variables: { id: stream_id, newTitle: title } });
    cancel();
  }
  return (
    <Box
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 290 }}
    >
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          border: "1px solid grey",
          pl: 1,
          borderRadius: 1,
        }}
        placeholder={col_name}
        onInput={getTagHandler}
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={submitData}
      >
        <CheckCircleTwoToneIcon color="success" />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        color="primary"
        sx={{ p: "10px" }}
        aria-label="directions"
        onClick={cancel}
      >
        <CancelTwoToneIcon color="error" />
      </IconButton>
    </Box>
  );
}
