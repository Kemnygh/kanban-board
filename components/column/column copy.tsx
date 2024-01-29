import { Button, Card, Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import CreateModal from "../ui/create-modal";
import LongMenu from "../edit_component/menu";

import { dbDataPath, dbDataRead } from "@/pages/api/stream";
import { submitTaskHandler } from "@/queries/requests";
import TaskCard from "../task/task";
import RenameItem from "../edit_component/edit-column-name";
import ActionAlerts from "../ui/alert-modal";
import { useQuery } from "@apollo/client";
import { GET_STREAMS } from "@/graphql/queries";

export default function ColumnItem(props: any) {
  const { data, loading, error } = useQuery(GET_STREAMS);
  console.log(data);

  const { name, tasks, refresh, stream_id, refreshColumn, streams } = props;
  const [task, setTask] = useState("");
  const [editName, setEditname] = useState(false);
  const [erroMsg, setErrorMsg] = useState<any | null>(null);
  const [msgType, setMsgType] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  async function submitData() {
    const res_msg = await submitTaskHandler(task, stream_id);
    const key = Object.keys(res_msg)[0];
    setErrorMsg(res_msg.errmsg);
    setSuccessMsg(res_msg.success);
    setMsgType(key);
    // console.log(msg)
  }

  function editHandler() {
    setEditname(true);
  }

  function cancelEditHandler() {
    setEditname(false);
  }

  return (
    <div>
      {erroMsg !== "" && msgType === "err" ? (
        <ActionAlerts severity="warning" response={erroMsg} />
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
              refreshName={refreshColumn}
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
              <LongMenu
                rename={editHandler}
                refresh_tasks={refresh}
                stream_id={stream_id}
                refresh_cols={refreshColumn}
              />
            </Stack>
          )}
          {tasks?.map((task: { id: any; name: any; stream_id: any }) => {
            if (task.stream_id === stream_id) {
              return (
                <TaskCard
                  key={task.id}
                  task_name={task.name}
                  refresh_tasks={refresh}
                  task_id={task.id}
                  column_data={streams}
                  current_col_id={stream_id}
                />
              );
            }
          })}
          <CreateModal
            btnText="Add Task"
            rows={2}
            setTags={setTask}
            color="success"
            width="300px"
            onClick={submitData}
            newData={refresh}
          />
        </div>
      </Box>
    </div>
  );
}

export async function getStaticProps(ctx: any) {
  const filePath = dbDataPath();
  const data = dbDataRead(filePath);
  return {
    props: {},
  };
}
