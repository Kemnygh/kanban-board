import { useState } from "react";
import { ChevronRight } from "@mui/icons-material";
import { Container, Stack, Typography, Box, Button } from "@mui/material";
import ColumnItem from "../column/column";
import CreateModal from "../ui/create-modal";
import ActionAlerts from "../ui/alert-modal";
import { useMutation, useQuery } from "@apollo/client";
import { GET_STREAMS } from "@/graphql/queries";
import { CREATE_STREAM } from "@/graphql/mutations";

export default function BoardPage(props: any) {
  const { data, loading, error } = useQuery(GET_STREAMS);
  // console.log(data);
  const { streams } = props;
  const [tags, setTags] = useState("");
  const [noOfStreams, setNoOfStreams] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [createStream] = useMutation(CREATE_STREAM, {
    variables: { tags },
    refetchQueries: [{ query: GET_STREAMS }],
  });

  async function submitData() {
    if (tags === "") {
      setMsgType("err");
      return setErrorMsg("Enter Title");
    } else if (error) {
      setMsgType("err");
      return setErrorMsg("There's a problem creating a stream");
    } else if (loading) {
      setMsgType("success");
      setSuccessMsg("Loading Streams....");
    }
    createStream({ variables: { name: tags } });

    setMsgType("success");
    setSuccessMsg("Stream Created Successfully");
  }

  const total = data?.streams.length;

  function addDisabledHandler() {
    if (total === 4) {
      setNoOfStreams(true);
    }
    return noOfStreams;
  }
  function removeDsabledHandler() {
    setNoOfStreams(false);
    return noOfStreams;
  }

  return (
    <Container maxWidth="xl" sx={{ position: "relative" }}>
      {errorMsg !== "" && msgType === "err" ? (
        <ActionAlerts severity="warning" response={errorMsg} />
      ) : null}
      {successMsg !== "" && msgType === "success" ? (
        <ActionAlerts severity="success" response={successMsg} />
      ) : null}

      <Typography variant="h1" sx={{ marginLeft: "10px" }}>
        Kanban
      </Typography>
      <Stack spacing={3} direction={"row"} sx={{ marginLeft: "20px" }}>
        <Typography>Dashboard</Typography>
        <ChevronRight />
        <Typography>Kanban</Typography>
      </Stack>
      <Container maxWidth="xl">
        <Box
          sx={{
            border: "1px solid grey",
            height: "80vh",
            marginTop: 2,
            borderRadius: "10px",
          }}
        >
          <Stack spacing={3} direction={"row"} sx={{ margin: "10px" }}>
            {data?.streams.map((stream: { id: any; name: any; tasks: any }) => (
              <ColumnItem
                key={stream.id}
                name={stream.name}
                stream_id={stream.id}
                tasks={stream.tasks}
                streams={data?.streams}
                refresh={data}
              />
            ))}
            {noOfStreams ? (
              <Button
                variant="contained"
                color="error"
                onMouseLeave={removeDsabledHandler}
                sx={{ height: 60, background: "gray" }}
              >
                BOARD IS FULL
              </Button>
            ) : (
              <CreateModal
                btnText="Add Stream"
                variant="contained"
                setTags={setTags}
                onClick={submitData}
                color="success"
                inMouse={addDisabledHandler}
              />
            )}
          </Stack>
        </Box>
      </Container>
    </Container>
  );
}
