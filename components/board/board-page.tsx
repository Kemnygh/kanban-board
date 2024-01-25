
import { useState } from "react";
import { ChevronRight } from "@mui/icons-material";
import { Container, Stack, Typography, Box, Button } from "@mui/material";
import ColumnItem from "../column/column";
import CreateModal from "../ui/create-modal";
import { submitHandler } from "@/queries/requests";




export default function BoardPage(props: any) {
  const { streams, refreshData, tasks, refreshDataTask } = props
  const [tags, setTags] = useState('');
  const [noOfStreams, setnoOfStreams] = useState(false);

  function submitData() {
    submitHandler(tags)
  }

  const total = streams.length;


  function addDisabledHandler() {

    if (total === 4) {
      setnoOfStreams(true);
    }
    return noOfStreams
  }
  function removeDsabledHandler() {
    setnoOfStreams(false);
    return noOfStreams
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
            {streams?.map((stream: { id: any; name: any; }) => <ColumnItem key={stream.id} name={stream.name} stream_id={stream.id} tasks={tasks} refresh={refreshDataTask} refreshColumn={refreshData} streams={streams} />)}
            {noOfStreams ? <Button variant='contained' color='error' onMouseLeave={removeDsabledHandler} sx={{ height: 60, background: 'gray' }}>BOARD IS FULL</Button> : <CreateModal btnText='Add Stream' variant='contained' setTags={setTags} onClick={submitData} newData={refreshData} color='success' inMouse={addDisabledHandler} />}
          </Stack>
        </Box>
      </Container>
    </Container>
  );
}

