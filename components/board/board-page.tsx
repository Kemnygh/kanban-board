
import {  ChevronRight } from "@mui/icons-material";
import { Container, Stack, Typography, Box } from "@mui/material";


export default function BoardPage() {
  return (
      <Container maxWidth="xl">
        <Typography variant="h1" sx={{marginLeft:'10px'}}>Kanban</Typography>
        <Stack spacing={3} direction={"row"} sx={{marginLeft:'20px'}}>
            <Typography>Dashboard</Typography>
            <ChevronRight/>
            <Typography>Kanban</Typography>
        </Stack>
         <Container maxWidth="xl"><Box sx={{ border: '1px solid grey', height: '80vh', marginTop: 2, borderRadius: '10px' }} ></Box></Container>
      </Container>
  );
}