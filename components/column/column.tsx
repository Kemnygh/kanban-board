import { Button, Card, Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import CreateModal from "../ui/create-modal";
import LongMenu from "../ui/menu";

import { dbDataPath, dbDataRead } from "@/pages/api/stream";
import { submitTaskHandler } from "@/queries/requests";
import TaskCard from "../task/task";
import EditMenu from "../edit_component/edit-column";
import RenameItem from "../edit_component/edit-column-name";

export default function ColumnItem(props: any) {
  const { name, tasks, refresh, stream_id, refreshColumn } = props
  const [task, setTask] = useState('');
  const [editName, setEditname] = useState(false);

  function submitData() {
    submitTaskHandler(task, stream_id);
  }

  function editHandler() {
    setEditname(true);
  }

  function cancelEditHandler() {
    setEditname(false);
  }

  // function getDataHandler() {
  //   fetch('/api/stream').then((res) => res.json()).then((data) => setColumns(data.data))
  // }

  return (
    <Box sx={{ minWidth: 300, border: '1px solid gray', borderRadius: '5px', backgroundColor: 'white' }}>
      {editName ? <RenameItem col_name={name} stream_id={stream_id} cancel={cancelEditHandler} refreshName={refreshColumn} /> :
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Typography id="transition-modal-title" variant="h5" component="h2" mt={1} mb={1} sx={{ color: "#37474f", marginLeft: "10px" }}>
            {name}

          </Typography>
          {/* <EditMenu refreshName={refreshColumn} stream_id={stream_id} /> */}
          <LongMenu rename={editHandler} />
        </Stack>}
      {/* <TaskCard /> */}
      {tasks?.map((task: { id: any; name: any; stream_id: any; }) => {
        if (task.stream_id === stream_id) { return (<TaskCard key={task.id} task_name={task.name} />) }
      })}
      <CreateModal btnText='Add Task' rows={3} setTags={setTask}
        onClick={submitData} newData={refresh} />
    </Box>
  );
}

export async function getStaticProps(ctx: any) {
  const filePath = dbDataPath();
  const data = dbDataRead(filePath);
  return {
    props: {

    }
  }
}