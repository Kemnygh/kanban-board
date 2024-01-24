
import { useState } from "react";
import { ChevronRight } from "@mui/icons-material";
import { Container, Stack, Typography, Box } from "@mui/material";
import ColumnItem from "../column/column";
import CreateModal from "../ui/create-modal";
import { submitHandler } from "@/queries/requests";

export default function BoardPage() {
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
            <ColumnItem />
            <CreateModal btnText='Add Stream' setTags={setTags} onClick={submitData} />
          </Stack>
        </Box>
      </Container>
    </Container>
  );
}