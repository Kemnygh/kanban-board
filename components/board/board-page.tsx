
import { useState } from "react";
import { ChevronRight } from "@mui/icons-material";
import { Container, Stack, Typography, Box, Button } from "@mui/material";
import ColumnItem from "../column/column";
import CreateModal from "../ui/create-modal";
import { submitHandler } from "@/queries/requests";




export default function BoardPage(props: any) {
  const { streams, refreshData, tasks, refreshDataTask } = props
  const [tags, setTags] = useState('');

  function submitData() {
    submitHandler(tags)
  }
  return (
    <Container maxWidth="xl">
      <Typography variant="h1" sx={{ marginLeft: '10px' }}>Kanban</Typography>
      <Stack spacing={3} direction={"row"} sx={{ marginLeft: '20px' }}>
        <Typography>Dashboard</Typography>
        <ChevronRight />
        <Typography>Kanban</Typography>
      </Stack>
      <Container maxWidth="xl">
        <Box sx={{ border: '1px solid grey', height: '80vh', marginTop: 2, borderRadius: '10px' }} >
          <Stack spacing={3} direction={"row"} sx={{ margin: '10px' }}>
            {streams?.map((stream: { id: any; name: any; }) => <ColumnItem key={stream.id} name={stream.name} stream_id={stream.id} tasks={tasks} refresh={refreshDataTask} refreshColumn={refreshData} />)}
            <CreateModal btnText='Add Stream' variant='outlined' setTags={setTags} onClick={submitData} newData={refreshData} />
          </Stack>
        </Box>
      </Container>
    </Container>
  );
}

