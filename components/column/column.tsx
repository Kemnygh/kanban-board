import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import CreateModal from "../ui/create-modal";
import LongMenu from "../edit_component/menu";
import TaskCard from "../task/task";
import RenameItem from "../edit_component/edit-column-name";
import ActionAlerts from "../ui/alert-modal";
import { useMutation } from "@apollo/client";
import { CREATE_TASK } from "@/graphql/mutations";
import { GET_STREAMS } from "@/graphql/queries";

export default function ColumnItem(props: any) {
  const { name, tasks, stream_id, streams } = props;
  const [task, setTask] = useState("");
  const [editName, setEditName] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [addTask] = useMutation(CREATE_TASK, {
    variables: { name, stream_id },
    refetchQueries: [{ query: GET_STREAMS }],
  });

  async function submitData() {
    if (task === "") {
      setMsgType("err");
      setErrorMsg("Please enter Task");
    }
    addTask({ variables: { name: task, stream_id: stream_id } });
    setMsgType("success");
    setSuccessMsg("Task Created Successfully");
  }

  function editHandler() {
    setEditName(true);
  }

  function cancelEditHandler() {
    setEditName(false);
  }

  return (
    <div>
      {errorMsg !== "" && msgType === "err" ? (
        <ActionAlerts severity="warning" response={errorMsg} />
      ) : null}
      {successMsg !== "" && msgType === "success" ? (
        <ActionAlerts severity="success" response={successMsg} />
      ) : null}
      <Box
        sx={{
          minWidth: 300,
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid gray",
            borderRadius: "5px",
          }}
        >
          {editName ? (
            <RenameItem
              col_name={name}
              stream_id={stream_id}
              cancel={cancelEditHandler}
            />
          ) : (
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Typography
                id="transition-modal-title"
                variant="h5"
                component="h2"
                mt={1}
                mb={1}
                sx={{
                  color: "#37474f",
                  marginLeft: "10px",
                  borderBottom: "1px solid gray",
                }}
              >
                {name}
              </Typography>
              <LongMenu rename={editHandler} stream_id={stream_id} />
            </Stack>
          )}
          {tasks?.map((task: { id: any; name: any; stream_id: any }) => {
            return (
              <TaskCard
                key={task.id}
                task_name={task.name}
                task_id={task.id}
                column_data={streams}
                current_col_id={stream_id}
              />
            );
          })}
          <CreateModal
            btnText="Add Task"
            rows={2}
            setTags={setTask}
            color="success"
            width="300px"
            onClick={submitData}
          />
        </div>
      </Box>
    </div>
  );
}
