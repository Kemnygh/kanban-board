import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DriveFileMoveTwoToneIcon from "@mui/icons-material/DriveFileMoveTwoTone";
import { Stack } from "@mui/material";
import { useMutation } from "@apollo/client";
import { MOVE_TASK } from "@/graphql/mutations";
import { GET_STREAMS } from "@/graphql/queries";

export default function MoveTask(props: any) {
  const { id, columns, current_col_id } = props;
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const [moveTask] = useMutation(MOVE_TASK, {
    refetchQueries: [{ query: GET_STREAMS }],
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const p_id = open ? "simple-popover" : undefined;

  function getColId(e: any) {
    const colId = e.currentTarget.id;
    moveTask({ variables: { newId: colId, taskID: id } });
  }

  return (
    <div>
      <Button color="info" aria-describedby={p_id} onClick={handleClick}>
        <DriveFileMoveTwoToneIcon sx={{ color: "#4db6ac" }} />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>Move to:</Typography>
        <Stack>
          {columns?.map((col: { id: any; name: any }) => {
            if (col.id !== current_col_id) {
              return (
                <Button key={col.id} id={col.id} onClick={getColId}>
                  {col.name}
                </Button>
              );
            }
          })}
        </Stack>
      </Popover>
    </div>
  );
}
