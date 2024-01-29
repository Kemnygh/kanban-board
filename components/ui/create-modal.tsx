import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button, Card, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function CreateModal(props: any) {
  const {
    btnText,
    onClick,
    setTags,
    disabled,
    rows,
    variant,
    width,
    inMouse,
    outMouse,
    color,
  } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function getTagHandler(e: any) {
    const value = e.target.value;
    setTags(value);
  }

  function submitInfo(e: any) {
    e.preventDefault();
    onClick();
    handleClose();
  }

  return (
    <div>
      <Button
        onClick={handleOpen}
        color={color}
        variant={variant}
        sx={{ width: { width } }}
        disabled={disabled}
        onMouseEnter={inMouse}
        onMouseLeave={outMouse}
      >
        {btnText}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ color: "#37474f" }}
            >
              {btnText}
            </Typography>
            <form onSubmit={submitInfo}>
              <FormControl sx={{ justifyContent: "space-between" }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ marginTop: 2 }}
                >
                  <TextField
                    sx={{ marginRight: 2 }}
                    required
                    id="title"
                    label="Title"
                    color="success"
                    onInput={getTagHandler}
                    multiline
                    rows={rows}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    color="success"
                    sx={{ backgroundColor: "gray" }}
                    endIcon={<SendIcon />}
                  >
                    Submit
                  </Button>
                </Stack>
              </FormControl>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
