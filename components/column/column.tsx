import { Button, Card, Stack, Typography } from "@mui/material";
import { useState } from "react";
import CreateModal from "../ui/create-modal";
import LongMenu from "../ui/menu";

export default function ColumnItem() {
  const [columns, setColumns] = useState([]);



  function getDataHandler() {
    fetch('/api/stream').then((res) => res.json()).then((data) => setColumns(data.data))
  }

  return (
    <Card sx={{ minWidth: '300px' }}>
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <Typography id="transition-modal-title" variant="h5" component="h2" mt={1} mb={1} sx={{ color: "#37474f", textAlign: "center", marginLeft: "10px" }}>
          Name
        </Typography>
        <LongMenu />
      </Stack>

      {/* <Button onClick={getDataHandler}>get data</Button>
      <ul>
        {columns.map(column => <li key={column.id}>{column.name}</li>)}
      </ul> */}
    </Card>
  );
}